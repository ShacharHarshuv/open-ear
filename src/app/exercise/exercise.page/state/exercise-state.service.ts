import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import Exercise from '../../exercise-logic';
import {
  NoteEvent,
  PartToPlay,
  PlayerService,
} from '../../../services/player.service';
import {
  ExerciseSettingsData,
  GlobalExerciseSettings,
  isValueTruthy,
  OneOrMany,
  timeoutAsPromise,
  toGetter,
  toSteadyPart,
} from '../../utility';
import { ExerciseSettingsDataService } from '../../../services/exercise-settings-data.service';
import { AdaptiveExercise } from './adaptive-exercise';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { YouTubePlayerService } from '../../../services/you-tube-player.service';
import * as _ from 'lodash';
import { defaults } from 'lodash';
import { AdaptiveExerciseService } from './adaptive-exercise.service';
import { DronePlayerService } from '../../../services/drone-player.service';
import { listenToChanges } from '../../../shared/ts-utility/rxjs/listen-to-changes';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { onChange } from '../../../shared/ts-utility/signals/on-change';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import getAnswerListIterator = Exercise.getAnswerListIterator;

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
  revealAnswerAfterFirstMistake: false,
  bpm: 120,
  moveToNextQuestionAutomatically: false,
  answerQuestionAutomatically: false,
  instrument: 'piano',
};

export interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
  playAfter?: number;
}

@Injectable()
export class ExerciseStateService implements OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _exerciseService = inject(ExerciseService);
  private readonly _notesPlayer = inject(PlayerService);
  private readonly _youtubePlayer = inject(YouTubePlayerService);
  private readonly _dronePlayer = inject(DronePlayerService);
  private readonly _exerciseSettingsData = inject(ExerciseSettingsDataService);
  private readonly _adaptiveExerciseService = inject(AdaptiveExerciseService);

  private readonly _originalExercise: Exercise.Exercise =
    this._exerciseService.getExercise(
      this._activatedRoute.snapshot.params['id']!
    );
  private readonly _globalSettings = signal<GlobalExerciseSettings>(
    DEFAULT_EXERCISE_SETTINGS
  );
  private _adaptiveExercise: AdaptiveExercise =
    this._adaptiveExerciseService.createAdaptiveExercise(
      this._originalExercise
    );
  private _currentQuestion: Exercise.Question = {
    segments: [],
  };
  private _wasKeyChanged: boolean = true;
  private _currentSegmentToAnswer: number = 0;
  private _destroyed: boolean = false;
  private _message = signal<string | null>(null);
  private _error = signal<unknown>(null);
  private _cadenceWasPlayed: boolean = false;
  readonly message = this._message.asReadonly();
  readonly error = this._error.asReadonly();
  readonly name: string = this.exercise.name;
  private readonly _answerList = signal<AnswerList>(
    this.exercise.getAnswerList()
  );
  readonly answerList = onChange(this._answerList.asReadonly(), (value) => {
    console.log('answerList', value);
  });
  private _answerToLabelStringMap: Record<string, string> =
    this._getAnswerToLabelStringMap();

  constructor() {
    listenToChanges(this, '_currentQuestion')
      .pipe(
        filter(isValueTruthy),
        map((question: this['currentQuestion']) => question?.drone ?? null),
        takeUntilDestroyed()
      )
      .subscribe((drone) => {
        if (drone) {
          this._dronePlayer.startDrone(drone);
        } else {
          this._dronePlayer.stopDrone();
        }
      });
  }

  get playerReady(): boolean {
    return this._notesPlayer.isReady;
  }

  get lastPlayed() {
    return this._notesPlayer.lastPlayed;
  }

  readonly globalSettings = this._globalSettings.asReadonly();

  private readonly _isAnsweringEnabled = signal(true);

  readonly isAnswerEnabled = this._isAnsweringEnabled.asReadonly();

  private readonly _totalCorrectAnswers = signal(0);

  readonly totalCorrectAnswers = this._totalCorrectAnswers.asReadonly();

  private readonly _totalQuestions = signal(0);

  readonly totalQuestions = this._totalQuestions.asReadonly();

  private _currentAnswers = signal<CurrentAnswer[]>([]);

  readonly currentAnswers = this._currentAnswers.asReadonly();

  get currentQuestion() {
    return this._currentQuestion;
  }

  private _currentlyPlayingSegments = new Set<number>();

  get currentlyPlayingSegments(): Set<number> {
    return this._currentlyPlayingSegments;
  }

  private _highlightedAnswer = signal<string | null>(null);

  readonly highlightedAnswer = this._highlightedAnswer.asReadonly();

  get hasCadence(): boolean {
    return !!this._currentQuestion.cadence;
  }

  get exerciseSettingsDescriptor(): Exercise.SettingsControlDescriptor[] {
    const settingsDescriptor: Exercise.SettingsControlDescriptor[] | undefined =
      this.exercise.getSettingsDescriptor?.();
    return settingsDescriptor || [];
  }

  get exerciseSettings(): { [key: string]: Exercise.SettingValueType } {
    return this.exercise.getCurrentSettings?.() || {};
  }

  get info(): string | null {
    if (!this._currentQuestion.info) {
      return null;
    }
    if (typeof this._currentQuestion.info === 'string') {
      return this._currentQuestion.info;
    }
    return this.isQuestionCompleted
      ? this._currentQuestion.info.afterCorrectAnswer
      : this._currentQuestion.info.beforeCorrectAnswer;
  }

  get isQuestionCompleted(): boolean {
    return _.every(this._currentAnswers(), (answer) => answer.answer);
  }

  private get _areAllSegmentsAnswered(): boolean {
    return !this._currentAnswers().filter((answer) => answer.answer === null)
      .length;
  }

  get exercise(): Exercise.Exercise {
    return this._globalSettings().adaptive
      ? this._adaptiveExercise
      : this._originalExercise;
  }

  get answerToLabelStringMap(): Record<string, string> {
    return this._answerToLabelStringMap;
  }

  answer(
    answer: string,
    answerIndex: number = this._currentSegmentToAnswer
  ): boolean {
    this._currentAnswers.update((currentAnswers) =>
      _.cloneDeep(currentAnswers)
    ); // creating new reference to trigger change detection
    if (this._currentAnswers()[answerIndex].answer) {
      return this._currentAnswers()[answerIndex].answer === answer;
    }
    const rightAnswer = this._currentQuestion.segments[answerIndex].rightAnswer;
    const isRight = rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers.mutate(
        (currentAnswers) => (currentAnswers[answerIndex].wasWrong = true)
      );
    }
    if (isRight || this._globalSettings().revealAnswerAfterFirstMistake) {
      this._totalQuestions.update((v) => ++v);
      if (!this._currentAnswers()[answerIndex].wasWrong) {
        this._totalCorrectAnswers.update((v) => ++v);
      }
      this._currentAnswers.mutate(
        (currentAnswers) => (currentAnswers[answerIndex].answer = rightAnswer)
      );
      while (!!this._currentAnswers()[this._currentSegmentToAnswer]?.answer) {
        this._currentSegmentToAnswer++;
      }

      // Last segment was answered
      if (
        _.every(
          this._currentAnswers(),
          (currentAnswer) => !!currentAnswer.answer
        )
      ) {
        // if not all answers are correct
        if (this._globalSettings().adaptive) {
          const areAllSegmentsCorrect: boolean = !this._currentAnswers().filter(
            (answerSegment) => answerSegment.wasWrong
          ).length;
          this._adaptiveExercise.reportAnswerCorrectness(areAllSegmentsCorrect);
        }
        this._afterCorrectAnswer().then(async () => {
          if (this._globalSettings().moveToNextQuestionAutomatically) {
            await this.onQuestionPlayingFinished();
            // Make sure we are still in the same question and nothing is playing (i.e. "Next" wasn't clicked by user)
            const numberOfAnsweredSegments = this._currentAnswers().filter(
              (answer) => !!answer.answer
            ).length;
            if (
              numberOfAnsweredSegments === this._currentQuestion.segments.length
            ) {
              this.nextQuestion();
            }
          }
        });
      }
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    await this.stop();
    this._cadenceWasPlayed = true;
    const cadence: PartToPlay[] | undefined = this._currentQuestion.cadence && [
      {
        partOrTime: toSteadyPart(this._currentQuestion.cadence),
        bpm: 120,
        beforePlaying: () => {
          this._isAnsweringEnabled.set(false);
          this._showMessage('Playing cadence to establish key...');
        },
        afterPlaying: () => {
          this._isAnsweringEnabled.set(true);
          this._hideMessage();
        },
      },
      {
        partOrTime: 100,
      },
    ];
    if (this._currentQuestion.type === 'youtube') {
      // loading YouTube video in the background when the cadence plays to save time
      this._loadYoutubeQuestion(this._currentQuestion);
      if (cadence) {
        await this._notesPlayer.playMultipleParts(cadence);
      }
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
      if (
        cadence &&
        (this._globalSettings().playCadence || this._wasKeyChanged)
      ) {
        partsToPlay.forEach((part) => {
          if (!_.isNil(part.playAfter)) {
            part.playAfter += cadence.length;
          }
        });
        partsToPlay.unshift(...cadence);
      }
      if (
        this._areAllSegmentsAnswered &&
        this._currentQuestion.afterCorrectAnswer
      ) {
        partsToPlay.push(...this._getAfterCorrectAnswerParts());
      }
      await this._notesPlayer.playMultipleParts(partsToPlay);
    }
    await this._afterPlaying();
  }

  async playCurrentQuestion(): Promise<void> {
    await this.stop();
    if (this._currentQuestion.type === 'youtube') {
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      await this._notesPlayer.playMultipleParts(
        this._getCurrentQuestionPartsToPlay()
      );
    }
    await this._afterPlaying();
  }

  private async _afterPlaying(): Promise<void> {
    this._currentlyPlayingSegments.clear();
    if (
      this._globalSettings().answerQuestionAutomatically &&
      !this.isQuestionCompleted &&
      !this._destroyed
    ) {
      await timeoutAsPromise(800);
      while (!this.isQuestionCompleted) {
        this.answer(
          this._currentQuestion.segments[this._currentSegmentToAnswer]
            .rightAnswer
        );
      }
    }
  }

  nextQuestion(): Promise<void> {
    // if still unanswered questions
    if (
      this._globalSettings().adaptive &&
      !!this._currentQuestion &&
      !this._areAllSegmentsAnswered
    ) {
      try {
        this._adaptiveExercise.reportAnswerCorrectness(true); // reporting true to ignore it in the future
      } catch (e) {}
    }
    try {
      const newQuestion = this.exercise.getQuestion();
      this._wasKeyChanged = newQuestion.key !== this._currentQuestion.key;
      this._currentQuestion = newQuestion;
    } catch (e) {
      this._error.set(e);
      console.error(e);
    }
    this._currentAnswers.set(
      this._currentQuestion.segments.map(
        (segment): CurrentAnswer => ({
          wasWrong: false,
          answer: null,
          playAfter: segment.playAfter,
        })
      )
    );
    this._currentSegmentToAnswer = 0;

    if (
      !this._wasKeyChanged &&
      this.globalSettings().playCadence === 'ONLY_ON_REPEAT' &&
      !!this._cadenceWasPlayed
    ) {
      return this.playCurrentQuestion();
    } else {
      return this.playCurrentCadenceAndQuestion();
    }
  }

  updateSettings(settings: ExerciseSettingsData): void {
    this._exerciseSettingsData.saveExerciseSettings(this.exercise.id, settings);
    this._globalSettings.set(settings.globalSettings);
    this._notesPlayer.setBpm(this._globalSettings().bpm);
    // settings may be invalid so we need to catch errors
    try {
      this._updateExerciseSettings(settings.exerciseSettings);
      this._message.set(null);
      this.nextQuestion();
    } catch (e) {
      this._error.set(e);
    }
  }

  async init(): Promise<void> {
    const settings: Partial<ExerciseSettingsData> | undefined =
      await this._exerciseSettingsData.getExerciseSettings(this.exercise.id);
    this._globalSettings.set(
      defaults(settings?.globalSettings, DEFAULT_EXERCISE_SETTINGS)
    );
    if (settings?.exerciseSettings) {
      this._updateExerciseSettings(settings.exerciseSettings);
    }
    await this.nextQuestion();
  }

  playAnswer(answerConfig: Exercise.AnswerConfig<string>): void {
    const partToPlay: NoteEvent[] | OneOrMany<Note> | null | undefined =
      toGetter(answerConfig.playOnClick)(this._currentQuestion);
    if (!partToPlay) {
      return;
    }
    this._notesPlayer.playPart(
      toSteadyPart(partToPlay),
      this._globalSettings().instrument
    );
  }

  async onQuestionPlayingFinished(): Promise<void> {
    await Promise.all([
      this._notesPlayer.onAllPartsFinished(),
      this._youtubePlayer.onStop(),
    ]);
  }

  resetStatistics(): void {
    this._totalCorrectAnswers.set(0);
    this._totalQuestions.set(0);
    this._adaptiveExercise.reset();
    this.nextQuestion();
  }

  ngOnDestroy(): void {
    this.stop();
    this._destroyed = true; // used to prevent playing of pending actions
  }

  private _showMessage(message: string) {
    this._message.set(message);
  }

  private _hideMessage() {
    this._message.set(null);
  }

  stop(): void {
    this._youtubePlayer.stop();
    this._notesPlayer.stopAndClearQueue();
  }

  private async _loadYoutubeQuestion(
    question: Exercise.YouTubeQuestion
  ): Promise<void> {
    await this._youtubePlayer.loadVideoById(question.videoId);
  }

  private async _playYouTubeQuestion(
    question: Exercise.YouTubeQuestion
  ): Promise<void> {
    if (this._destroyed) {
      return;
    }
    if (this._youtubePlayer.isVideoLoading) {
      this._showMessage('Video is loading...');
      this._youtubePlayer.onCurrentVideoLoaded.then(() => {
        this._hideMessage();
      });
    }
    await this._youtubePlayer.play(
      question.videoId,
      question.segments[0].seconds,
      [
        ...question.segments.map((segment, i) => ({
          seconds: segment.seconds,
          callback: () => {
            this._currentlyPlayingSegments.clear();
            this._currentlyPlayingSegments.add(i);
          },
        })),
        {
          seconds: question.endSeconds,
          callback: () => {
            this._youtubePlayer.stop();
          },
        },
      ]
    );
    await this._youtubePlayer.onStop();
  }

  private _getCurrentQuestionPartsToPlay(): PartToPlay[] {
    return this._currentQuestion.segments.map(
      (segment, i: number): PartToPlay => ({
        instrumentName: this._globalSettings().instrument,
        partOrTime: toSteadyPart(segment.partToPlay),
        beforePlaying: () => {
          this._currentlyPlayingSegments.add(i);
          if (i === 0) {
            this._isAnsweringEnabled.set(true);
          }
        },
        afterPlaying: () => {
          this._currentlyPlayingSegments.delete(i);
        },
        playAfter: segment.playAfter,
      })
    );
  }

  private _updateExerciseSettings(exerciseSettings: {
    [key: string]: Exercise.SettingValueType;
  }): void {
    if (!this.exercise.updateSettings) {
      return;
    }
    this.exercise.updateSettings(exerciseSettings);
    this._answerList.set(this.exercise.getAnswerList());
    this._answerToLabelStringMap = this._getAnswerToLabelStringMap();
    this._adaptiveExercise.reset();
  }

  private _getAfterCorrectAnswerParts(): PartToPlay[] {
    if (!this._currentQuestion.afterCorrectAnswer) {
      return [];
    }

    return this._currentQuestion.afterCorrectAnswer.map(
      ({ partToPlay, answerToHighlight }): PartToPlay => ({
        beforePlaying: () => {
          this._highlightedAnswer.set(answerToHighlight || null);
        },
        partOrTime: partToPlay,
        instrumentName: this._globalSettings().instrument,
      })
    );
  }

  private async _afterCorrectAnswer(): Promise<void> {
    const afterCorrectAnswerParts: PartToPlay[] =
      this._getAfterCorrectAnswerParts();
    if (_.isEmpty(afterCorrectAnswerParts)) {
      return;
    }

    await this._notesPlayer.playMultipleParts(afterCorrectAnswerParts);
    this._highlightedAnswer.set(null);
  }

  private _getAnswerToLabelStringMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (let answerConfig of getAnswerListIterator(this.answerList())) {
      const normalizedAnswerConfig =
        Exercise.normalizeAnswerConfig(answerConfig);
      if (normalizedAnswerConfig.answer) {
        map[normalizedAnswerConfig.answer] =
          normalizedAnswerConfig.displayLabel;
      }
    }
    return map;
  }
}
