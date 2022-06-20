import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import {
  Exercise,
} from '../../Exercise';
import {
  PlayerService,
  PartToPlay,
  NoteEvent,
} from '../../../services/player.service';
import {
  toSteadyPart,
  GlobalExerciseSettings,
  ExerciseSettingsData,
  toGetter,
  OneOrMany,
  timeoutAsPromise,
} from '../../utility';
import { ExerciseSettingsDataService } from '../../../services/exercise-settings-data.service';
import { AdaptiveExercise } from './adaptive-exercise';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { YouTubePlayerService } from '../../../services/you-tube-player.service';
import * as _ from 'lodash';
import { AdaptiveExerciseService } from './adaptive-exercise.service';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import { BehaviorSubject } from 'rxjs';
import getAnswerListIterator = Exercise.getAnswerListIterator;

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
  revealAnswerAfterFirstMistake: false,
  bpm: 120,
  moveToNextQuestionAutomatically: false,
  answerQuestionAutomatically: false,
};

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService implements OnDestroy {
  private readonly _originalExercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.params['id']!);
  private _globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;
  private _adaptiveExercise: AdaptiveExercise = this._adaptiveExerciseService.createAdaptiveExercise(this._originalExercise);
  private _currentQuestion: Exercise.Question = this.exercise.getQuestion();
  private _currentSegmentToAnswer: number = 0;
  private _destroyed: boolean = false;
  private _message$ = new BehaviorSubject<string | null>(null);
  private _error$ = new BehaviorSubject<string | null>(null);
  private _cadenceWasPlayed: boolean = false;
  readonly message$ = this._message$.asObservable();
  readonly error$ = this._error$.asObservable();
  readonly name: string = this.exercise.name;
  answerList: AnswerList = this.exercise.getAnswerList();
  private _answerToLabelStringMap: Record<string, string> = this._getAnswerToLabelStringMap();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _exerciseService: ExerciseService,
    private readonly _notesPlayer: PlayerService,
    private readonly _youtubePlayer: YouTubePlayerService,
    private readonly _exerciseSettingsData: ExerciseSettingsDataService,
    private readonly _adaptiveExerciseService: AdaptiveExerciseService,
    private readonly router: Router,
  ) {
  }

  get playerReady(): boolean {
    return this._notesPlayer.isReady;
  }

  get lastPlayed(): PartToPlay[] | null {
    return this._notesPlayer.lastPlayed;
  }

  get globalSettings(): GlobalExerciseSettings {
    return this._globalSettings;
  }

  private _isAnsweringEnabled: boolean = true;

  get isAnswerEnabled(): boolean {
    return this._isAnsweringEnabled;
  }

  private _totalCorrectAnswers: number = 0;

  get totalCorrectAnswers(): number {
    return this._totalCorrectAnswers;
  }

  private _totalQuestions: number = 0;

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  private _currentAnswers: CurrentAnswer[] = [];

  get currentAnswers(): CurrentAnswer[] {
    return this._currentAnswers;
  }

  private _currentlyPlayingSegment: number | null = null;

  get currentlyPlayingSegment(): number | null {
    return this._currentlyPlayingSegment;
  }

  private _highlightedAnswer: string | null = null;

  get highlightedAnswer(): string | null {
    return this._highlightedAnswer;
  }

  get hasCadence(): boolean {
    return !!this._currentQuestion.cadence
  }

  get exerciseSettingsDescriptor(): Exercise.SettingsControlDescriptor[] {
    const settingsDescriptor: Exercise.SettingsControlDescriptor[] | undefined = this.exercise.getSettingsDescriptor?.();
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
    return this.isQuestionCompleted ? this._currentQuestion.info.afterCorrectAnswer : this._currentQuestion.info.beforeCorrectAnswer;
  }

  get isQuestionCompleted(): boolean {
    return !!this._currentAnswers[this._currentAnswers.length - 1]?.answer;
  }

  private get _areAllSegmentsAnswered(): boolean {
    return !this._currentAnswers.filter(answer => answer.answer === null).length
  }

  get exercise(): Exercise.IExercise {
    return this._globalSettings.adaptive ? this._adaptiveExercise : this._originalExercise;
  }

  get answerToLabelStringMap(): Record<string, string> {
    return this._answerToLabelStringMap;
  }

  answer(answer: string): boolean {
    const rightAnswer = this._currentQuestion.segments[this._currentSegmentToAnswer].rightAnswer;
    const isRight = rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers[this._currentSegmentToAnswer].wasWrong = true;
    }
    if (isRight || this._globalSettings.revealAnswerAfterFirstMistake) {
      this._totalQuestions++;
      if (!this._currentAnswers[this._currentSegmentToAnswer].wasWrong) {
        this._totalCorrectAnswers++;
      }
      this._currentAnswers[this._currentSegmentToAnswer].answer = rightAnswer;
      this._currentSegmentToAnswer++;

      // Last segment was answered
      if (this._currentSegmentToAnswer === this._currentQuestion.segments.length) {
        // if not all answers are correct
        if (this._globalSettings.adaptive) {
          const areAllSegmentsCorrect: boolean = !this._currentAnswers.filter(answerSegment => answerSegment.wasWrong).length;
          this._adaptiveExercise.reportAnswerCorrectness(areAllSegmentsCorrect);
        }
        this._afterCorrectAnswer()
          .then(async () => {
            if (this._globalSettings.moveToNextQuestionAutomatically) {
              await this.onQuestionPlayingFinished();
              // Make sure we are still in the same question and nothing is playing (i.e. "Next" wasn't clicked by user)
              const numberOfAnsweredSegments = this._currentAnswers.filter(answer => !!answer.answer).length;
              if (numberOfAnsweredSegments === this._currentQuestion.segments.length) {
                this.nextQuestion();
              }
            }
          })
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
          this._isAnsweringEnabled = false;
          this._showMessage('Playing cadence to establish key...');
        },
        afterPlaying: () => {
          this._isAnsweringEnabled = true;
          this._hideMessage();
        },
      },
      {
        partOrTime: 100,
      },
    ]
    if (this._currentQuestion.type === 'youtube') {
      // loading YouTube video in the background when the cadence plays to save time
      this._loadYoutubeQuestion(this._currentQuestion);
      if (cadence) {
        await this._notesPlayer.playMultipleParts(cadence);
      }
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
      if (cadence && this._globalSettings.playCadence) {
        partsToPlay.unshift(...cadence);
      }
      if (this._areAllSegmentsAnswered && this._currentQuestion.afterCorrectAnswer) {
        partsToPlay.push(...this._getAfterCorrectAnswerParts());
      }
      await this._notesPlayer.playMultipleParts(partsToPlay);
    }
    this._currentlyPlayingSegment = null;
  }

  async playCurrentQuestion(): Promise<void> {
    await this.stop();
    if (this._currentQuestion.type === 'youtube') {
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      await this._notesPlayer.playMultipleParts(this._getCurrentQuestionPartsToPlay());
    }
    this._currentlyPlayingSegment = null;
    if (
      this._globalSettings.answerQuestionAutomatically &&
      !this.isQuestionCompleted &&
      !this._destroyed
    ) {
      await timeoutAsPromise(800);
      while (!this.isQuestionCompleted) {
        this.answer(this._currentQuestion.segments[this._currentSegmentToAnswer].rightAnswer);
      }
    }
  }

  nextQuestion(): Promise<void> {
    // if still unanswered questions
    if (this._globalSettings.adaptive && !!this._currentQuestion && !this._areAllSegmentsAnswered) {
      try {
        this._adaptiveExercise.reportAnswerCorrectness(true); // reporting true to ignore it in the future
      } catch (e) {
      }
    }
    try {
      this._currentQuestion = this.exercise.getQuestion();
    } catch (e) {
      this._error$.next(e);
      console.error(e);
    }
    this._currentAnswers = this._currentQuestion.segments.map(() => ({
      wasWrong: false,
      answer: null,
    }));
    this._currentSegmentToAnswer = 0;

    if (this.globalSettings.playCadence === 'ONLY_ON_REPEAT' && !!this._cadenceWasPlayed) {
      return this.playCurrentQuestion();
    } else {
      return this.playCurrentCadenceAndQuestion();
    }
  }

  updateSettings(settings: ExerciseSettingsData): void {
    this._exerciseSettingsData.saveExerciseSettings(this.exercise.id, settings);
    this._globalSettings = settings.globalSettings;
    this._notesPlayer.setBpm(this._globalSettings.bpm);
    // settings may be invalid so we need to catch errors
    try {
      this._updateExerciseSettings(settings.exerciseSettings);
      this._message$.next(null);
      this.nextQuestion();
    } catch (e) {
      this._error$.next(e);
    }
  }

  async init(): Promise<void> {
    const settings: Partial<ExerciseSettingsData> | undefined = await this._exerciseSettingsData.getExerciseSettings(this.exercise.id);
    if (settings?.globalSettings) {
      this._globalSettings = settings.globalSettings;
    }
    if (settings?.exerciseSettings) {
      this._updateExerciseSettings(settings.exerciseSettings);
    }
    await this.nextQuestion();
  }

  playAnswer(answerConfig: Exercise.AnswerConfig<string>): void {
    const partToPlay: NoteEvent[] | OneOrMany<Note> | null | undefined = toGetter(answerConfig.playOnClick)(this._currentQuestion);
    if (!partToPlay) {
      return;
    }
    this._notesPlayer.playPart(toSteadyPart(partToPlay));
  }

  async onQuestionPlayingFinished(): Promise<void> {
    await Promise.all([
      this._notesPlayer.onAllPartsFinished(),
      this._youtubePlayer.onStop(),
    ]);
  }

  resetStatistics(): void {
    this._totalCorrectAnswers = 0;
    this._totalQuestions = 0;
    this._adaptiveExercise.reset();
    this.nextQuestion();
  }

  ngOnDestroy(): void {
    this.stop();
    this._destroyed = true; // used to prevent playing of pending actions
  }

  private _showMessage(message: string) {
    this._message$.next(message);
  }

  private _hideMessage() {
    this._message$.next(null);
  }

  stop(): void {
    this._youtubePlayer.stop();
    this._notesPlayer.stopAndClearQueue();
  }

  private async _loadYoutubeQuestion(question: Exercise.YouTubeQuestion): Promise<void> {
    await this._youtubePlayer.loadVideoById(question.videoId);
  }

  private async _playYouTubeQuestion(question: Exercise.YouTubeQuestion): Promise<void> {
    if (this._destroyed) {
      return;
    }
    if (this._youtubePlayer.isVideoLoading) {
      this._showMessage('Video is loading...');
      this._youtubePlayer.onCurrentVideoLoaded.then(() => {
        this._hideMessage();
      });
    }
    await this._youtubePlayer.play(question.videoId, question.segments[0].seconds, [
      ...question.segments.map((segment, i) => ({
        seconds: segment.seconds,
        callback: () => {
          this._currentlyPlayingSegment = i;
        },
      })),
      {
        seconds: question.endSeconds,
        callback: () => {
          this._youtubePlayer.stop();
        },
      },
    ]);
    await this._youtubePlayer.onStop();
  }

  private _getCurrentQuestionPartsToPlay(): PartToPlay[] {
    const partsToPlay: PartToPlay[] = this._currentQuestion.segments.map((segment, i): PartToPlay => ({
      partOrTime: toSteadyPart(segment.partToPlay),
      beforePlaying: () => {
        this._currentlyPlayingSegment = i;
        if (i === 0) {
          this._isAnsweringEnabled = true;
        }
      },
    }));
    return partsToPlay;
  }

  private _updateExerciseSettings(exerciseSettings: { [key: string]: Exercise.SettingValueType }): void {
    if (!this.exercise.updateSettings) {
      return;
    }
    this.exercise.updateSettings(exerciseSettings);
    this.answerList = this.exercise.getAnswerList();
    this._answerToLabelStringMap = this._getAnswerToLabelStringMap();
    this._adaptiveExercise.reset();
  }

  private _getAfterCorrectAnswerParts(): PartToPlay[] {
    if (!this._currentQuestion.afterCorrectAnswer) {
      return [];
    }

    return this._currentQuestion.afterCorrectAnswer.map(({
      partToPlay,
      answerToHighlight,
    }): PartToPlay => ({
      beforePlaying: () => {
        this._highlightedAnswer = answerToHighlight || null;
      },
      partOrTime: partToPlay,
    }));
  }

  private async _afterCorrectAnswer(): Promise<void> {
    const afterCorrectAnswerParts: PartToPlay[] = this._getAfterCorrectAnswerParts();
    if (_.isEmpty(afterCorrectAnswerParts)) {
      return;
    }

    await this._notesPlayer.playMultipleParts(afterCorrectAnswerParts);
    this._highlightedAnswer = null;
  }

  private _getAnswerToLabelStringMap(): Record<string, string> {
    const map: Record<string, string> = {};
    for (let answerConfig of getAnswerListIterator(this.answerList)) {
      const normalizedAnswerConfig = Exercise.normalizeAnswerConfig(answerConfig);
      if (normalizedAnswerConfig.answer) {
        map[normalizedAnswerConfig.answer] = normalizedAnswerConfig.displayLabel;
      }
    }
    return map;
  }
}
