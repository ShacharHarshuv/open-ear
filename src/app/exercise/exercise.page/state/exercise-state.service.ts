import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../Exercise';
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
import { BehaviorSubject } from 'rxjs';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import { BehaviorSubject } from 'rxjs';
import { AudioPlayerService } from '../../../services/audio-player.service';
import getAnswerListIterator = Exercise.getAnswerListIterator;

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
  revealAnswerAfterFirstMistake: false,
  bpm: 120,
  moveToNextQuestionAutomatically: false,
  answerQuestionAutomatically: false,
};

export interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
  playAfter?: number;
}

@Injectable()
export class ExerciseStateService implements OnDestroy {
  private readonly _originalExercise: Exercise.Exercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.params['id']!);
  private _globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;
  private _adaptiveExercise: AdaptiveExercise = this._adaptiveExerciseService.createAdaptiveExercise(this._originalExercise);
  private _currentQuestion: Exercise.Question = {
    segments: [],
  };
  private _wasKeyChanged: boolean = true;
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
    private readonly _audioPlayer: AudioPlayerService,
    private readonly _exerciseSettingsData: ExerciseSettingsDataService,
    private readonly _adaptiveExerciseService: AdaptiveExerciseService,
    private readonly router: Router,
  ) {
  }

  get playerReady(): boolean {
    return this._notesPlayer.isReady;
  }

  get lastPlayed() {
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

  get currentAnswers() {
    return this._currentAnswers;
  }

  get currentQuestion() {
    return this._currentQuestion;
  }

  private _currentlyPlayingSegments = new Set<number>();

  get currentlyPlayingSegments(): Set<number> {
    return this._currentlyPlayingSegments;
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
    return _.every(this._currentAnswers, answer => answer.answer);
  }

  private get _areAllSegmentsAnswered(): boolean {
    return !this._currentAnswers.filter(answer => answer.answer === null).length
  }

  get exercise(): Exercise.Exercise {
    return this._globalSettings.adaptive ? this._adaptiveExercise : this._originalExercise;
  }

  get answerToLabelStringMap(): Record<string, string> {
    return this._answerToLabelStringMap;
  }

  answer(answer: string, answerIndex?: number): boolean {
    answerIndex = answerIndex ?? this._currentSegmentToAnswer;
    this._currentAnswers = _.cloneDeep(this._currentAnswers); // creating new reference to trigger change detection
    if (this._currentAnswers[answerIndex].answer) {
      return this._currentAnswers[answerIndex].answer === answer;
    }
    const rightAnswer = this._currentQuestion.segments[answerIndex].rightAnswer;
    const isRight = rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers[answerIndex].wasWrong = true;
    }
    if (isRight || this._globalSettings.revealAnswerAfterFirstMistake) {
      this._totalQuestions++;
      if (!this._currentAnswers[answerIndex].wasWrong) {
        this._totalCorrectAnswers++;
      }
      this._currentAnswers[answerIndex].answer = rightAnswer;
      while (!!this._currentAnswers[this._currentSegmentToAnswer]?.answer) {
        this._currentSegmentToAnswer++;
      }

      // Last segment was answered
      if (_.every(this._currentAnswers, currentAnswer => !!currentAnswer.answer)) {
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
    } else if (this._currentQuestion.type === 'notes') {
      const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
      if (cadence && (this._globalSettings.playCadence || this._wasKeyChanged)) {
        partsToPlay.forEach(part => {
          if (!_.isNil(part.playAfter)) {
            part.playAfter += cadence.length;
          }
        });
        partsToPlay.unshift(...cadence);
      }
      if (this._areAllSegmentsAnswered && this._currentQuestion.afterCorrectAnswer) {
        partsToPlay.push(...this._getAfterCorrectAnswerParts());
      }
      await this._notesPlayer.playMultipleParts(partsToPlay);
    } else if (this._currentQuestion.type === 'audio') {
      await this._playAudioQuestion(this._currentQuestion);
    } else {
      throw new Error(`${this._currentQuestion.type} is not a recognizable question type`);
    }
    await this._afterPlaying();
  }

  async playCurrentQuestion(): Promise<void> {
    await this.stop();
    if (this._currentQuestion.type === 'youtube') {
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      await this._notesPlayer.playMultipleParts(this._getCurrentQuestionPartsToPlay());
    }
    await this._afterPlaying();
  }

  private async _afterPlaying(): Promise<void> {
    this._currentlyPlayingSegments.clear();
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
      const newQuestion = this.exercise.getQuestion();
      this._wasKeyChanged = newQuestion.key !== this._currentQuestion.key;
      this._currentQuestion = newQuestion;
    } catch (e) {
      this._error$.next(e);
      console.error(e);
    }
    this._currentAnswers = this._currentQuestion.segments.map((segment): CurrentAnswer => ({
      wasWrong: false,
      answer: null,
      playAfter: segment.playAfter,
    }));
    this._currentSegmentToAnswer = 0;

    if (!this._wasKeyChanged && this.globalSettings.playCadence === 'ONLY_ON_REPEAT' && !!this._cadenceWasPlayed) {
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
    ]);
    await this._youtubePlayer.onStop();
  }

  private async _playAudioQuestion(question: Exercise.AudioQuestion): Promise<void> {
    if (this._destroyed) {
      return;
    }
    for (let segment of question.segments) {
      await this._audioPlayer.play(segment.pathToAudio);
    }
  }

  private _getCurrentQuestionPartsToPlay(): PartToPlay[] {
    const partsToPlay: PartToPlay[] = this._currentQuestion.segments.map((segment, i: number): PartToPlay => ({
      partOrTime: toSteadyPart(segment.partToPlay),
      beforePlaying: () => {
        this._currentlyPlayingSegments.add(i);
        if (i === 0) {
          this._isAnsweringEnabled = true;
        }
      },
      afterPlaying: () => {
        this._currentlyPlayingSegments.delete(i);
      },
      playAfter: segment.playAfter,
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
