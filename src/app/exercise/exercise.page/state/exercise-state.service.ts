import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../Exercise';
import {
  PlayerService,
  PartToPlay, NoteEvent,
} from '../../../services/player.service';
import {
  toSteadyPart,
  GlobalExerciseSettings,
  ExerciseSettingsData, toGetter, OneOrMany,
} from '../../utility';
import { ExerciseSettingsDataService } from '../../../services/exercise-settings-data.service';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import { AdaptiveExercise } from './adaptive-exercise';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { YouTubePlayerService } from '../../../services/you-tube-player.service';
import { ToastController } from '@ionic/angular';

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
  revealAnswerAfterFirstMistake: false,
  bpm: 120,
  moveToNextQuestionAutomatically: false,
};

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService implements OnDestroy {
  private readonly _originalExercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.params['id']!);
  private _globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;
  private _adaptiveExercise: AdaptiveExercise = new AdaptiveExercise(this._originalExercise);
  private _currentQuestion: Exercise.Question = this.exercise.getQuestion();
  private _currentSegmentToAnswer: number = 0;
  private _destroyed: boolean = false;
  readonly name: string = this.exercise.name;
  answerList: AnswerList = this.exercise.getAnswerList();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _exerciseService: ExerciseService,
    private readonly _notesPlayer: PlayerService,
    private readonly _youtubePlayer: YouTubePlayerService,
    private readonly _exerciseSettingsData: ExerciseSettingsDataService,
    private readonly _toastController: ToastController,
  ) {
  }

  get globalSettings(): GlobalExerciseSettings {
    return this._globalSettings;
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
    const settingsDescriptor: Exercise.SettingsControlDescriptor[] | undefined = this.exercise.settingsDescriptor;
    return settingsDescriptor || [];
  }

  get exerciseSettings(): { [key: string]: Exercise.SettingValueType } {
    return this.exercise.getCurrentSettings?.() || {};
  }

  private get _areAllSegmentsAnswered(): boolean {
    return !this._currentAnswers.filter(answer => answer.answer === null).length
  }

  get exercise(): Exercise.IExercise {
    return this._globalSettings.adaptive ? this._adaptiveExercise : this._originalExercise;
  }

  answer(answer: string): boolean {
    const rightAnswer = this._currentQuestion.segments[this._currentSegmentToAnswer].rightAnswer;
    const isRight = rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers[this._currentSegmentToAnswer].wasWrong = true;
    }
    if(isRight || this._globalSettings.revealAnswerAfterFirstMistake) {
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
            // Make sure we are still in the same question (i.e. "Next" wasn't clicked by user)
            const numberOfAnsweredSegments = this._currentAnswers.filter(answer => !!answer.answer).length;
            if (numberOfAnsweredSegments === this._currentQuestion.segments.length) {
              await this.onQuestionPlayingFinished();
              this.nextQuestion();
            }
          }
        })
      }
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    await this._stop();
    const cadence: PartToPlay[] | undefined = this._currentQuestion.cadence && [
      {
        partOrTime: toSteadyPart(this._currentQuestion.cadence),
        bpm: 120,
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
    await this._stop();
    if (this._currentQuestion.type === 'youtube') {
      await this._playYouTubeQuestion(this._currentQuestion);
    } else {
      await this._notesPlayer.playMultipleParts(this._getCurrentQuestionPartsToPlay());
    }
    this._currentlyPlayingSegment = null;
  }

  nextQuestion(): Promise<void> {
    // if still unanswered questions
    if (this._globalSettings.adaptive && !!this._currentQuestion && !this._areAllSegmentsAnswered) {
      try {
        this._adaptiveExercise.reportAnswerCorrectness(true); // reporting true to ignore it in the future
      } catch (e) {}
    }
    this._currentQuestion = this.exercise.getQuestion();
    this._currentAnswers = this._currentQuestion.segments.map(() => ({
      wasWrong: false,
      answer: null,
    }));
    this._currentSegmentToAnswer = 0;

    if (this.globalSettings.playCadence === 'ONLY_ON_REPEAT') {
      return this.playCurrentQuestion();
    } else {
      return this.playCurrentCadenceAndQuestion();
    }
  }

  updateSettings(settings: ExerciseSettingsData): void {
    this._exerciseSettingsData.saveExerciseSettings(this.exercise.id, settings);
    this._globalSettings = settings.globalSettings;
    this._notesPlayer.setBpm(this._globalSettings.bpm);
    this._updateExerciseSettings(settings.exerciseSettings);
    this.nextQuestion();
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

  ngOnDestroy(): void {
    this._stop();
    this._destroyed = true; // used to prevent playing of pending actions
  }

  private _stop(): void {
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
      const toast: HTMLIonToastElement = await this._toastController.create({
        message: 'Video loading...',
        position: 'top',
      });
      await toast.present();
      this._youtubePlayer.onCurrentVideoLoaded.then(() => {
        toast.dismiss();
      });
    }
    await this._youtubePlayer.play(question.videoId, question.segments[0].seconds, [
      ...question.segments.map((segment, i) => ({
        seconds: segment.seconds,
        callback: () => {
          this._currentlyPlayingSegment = i;
        }
      })),
      {
        seconds: question.endSeconds,
        callback: () => {
          this._youtubePlayer.stop();
        }
      }
    ]);
    await this._youtubePlayer.onStop();
  }

  private _getCurrentQuestionPartsToPlay(): PartToPlay[] {
    return this._currentQuestion.segments.map((segment, i): PartToPlay => ({
      partOrTime: toSteadyPart(segment.partToPlay),
      beforePlaying: () => {
        this._currentlyPlayingSegment = i;
      },
    }));
  }

  private _updateExerciseSettings(exerciseSettings: { [key: string]: Exercise.SettingValueType }): void {
    if (!this.exercise.updateSettings) {
      return;
    }
    this.exercise.updateSettings(exerciseSettings);
    this.answerList = this.exercise.getAnswerList();
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
    if (!this._currentQuestion.afterCorrectAnswer) {
      return;
    }

    await this._notesPlayer.playMultipleParts(this._getAfterCorrectAnswerParts());
    this._highlightedAnswer = null;
  }
}
