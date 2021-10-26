import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise } from '../../Exercise';
import {
  PlayerService,
  PartToPlay,
} from '../../../services/player.service';
import {
  toSteadyPart,
  GlobalExerciseSettings,
  ExerciseSettingsData,
} from '../../utility';
import { StorageService } from '../../../services/storage.service';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import { AdaptiveExercise } from './adaptive-exercise';

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
};

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService {
  private readonly _originalExercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id')!);
  private _globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;
  readonly name: string = this._exercise.name;
  answerList: AnswerList = this._exercise.getAnswerList();
  private _adaptiveExercise: AdaptiveExercise = new AdaptiveExercise(this._originalExercise);
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  private _currentSegmentToAnswer: number = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
    private _storage: StorageService,
  ) {
    this._init();
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
    const settingsDescriptor: Exercise.SettingsControlDescriptor[] | undefined = this._exercise.settingsDescriptor;
    return settingsDescriptor || [];
  }

  get exerciseSettings(): { [key: string]: Exercise.SettingValueType } {
    return this._exercise.getCurrentSettings?.() || {};
  }

  private get _exercise(): Exercise.IExercise {
    return this._globalSettings.adaptive ? this._adaptiveExercise : this._originalExercise;
  }

  answer(answer: string): boolean {
    const isRight = this._currentQuestion.segments[this._currentSegmentToAnswer].rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers[this._currentSegmentToAnswer].wasWrong = true;
    } else {
      this._totalQuestions++;
      if (!this._currentAnswers[this._currentSegmentToAnswer].wasWrong) {
        this._totalCorrectAnswers++;
      }
      this._currentAnswers[this._currentSegmentToAnswer].answer = answer;
      this._currentSegmentToAnswer++;

      if (this._currentSegmentToAnswer === this._currentQuestion.segments.length) {
        this._afterCorrectAnswer();

        // if not all answers are correct
        if (this._globalSettings.adaptive) {
          const areAllSegmentsCorrect: boolean = !this._currentAnswers.filter(answerSegment => answerSegment.wasWrong).length;
          this._adaptiveExercise.reportAnswerCorrectness(areAllSegmentsCorrect);
        }
      }
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
    if (this._currentQuestion.cadence && this._globalSettings.playCadence) {
      partsToPlay.unshift(
        {
          partOrTime: toSteadyPart(this._currentQuestion.cadence),
        },
        {
          partOrTime: 100,
        },
      );
    }
    await this._player.playMultipleParts(partsToPlay);
    this._currentlyPlayingSegment = null;
  }

  async playCurrentQuestion(): Promise<void> {
    await this._player.playMultipleParts(this._getCurrentQuestionPartsToPlay());
    this._currentlyPlayingSegment = null;
  }

  nextQuestion(): void {
    // if still unanswered questions
    if (this._globalSettings.adaptive && !!this._currentQuestion && this._currentAnswers.filter(answer => answer.answer === null).length) {
      try {
        this._adaptiveExercise.reportAnswerCorrectness(true); // reporting true to ignore it in the future
      } catch (e) {}
    }
    this._currentQuestion = this._exercise.getQuestion();
    this._currentAnswers = this._currentQuestion.segments.map(() => ({
      wasWrong: false,
      answer: null,
    }));
    this._currentSegmentToAnswer = 0;
  }

  updateSettings(settings: ExerciseSettingsData): void {
    this._storage.saveExerciseSettings(this._exercise.id, settings);
    this._globalSettings = settings.globalSettings;
    this._updateExerciseSettings(settings.exerciseSettings);
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
    if (!this._exercise.updateSettings) {
      return;
    }
    this._exercise.updateSettings(exerciseSettings);
    this.answerList = this._exercise.getAnswerList();
    this._adaptiveExercise.reset();
    this.nextQuestion();
  }

  private async _init(): Promise<void> {
    const settings: ExerciseSettingsData | undefined = await this._storage.getExerciseSettings(this._exercise.id);
    if (!settings) {
      return;
    }
    this._globalSettings = settings.globalSettings;
    this._updateExerciseSettings(settings.exerciseSettings);
  }

  private async _afterCorrectAnswer(): Promise<void> {
    if (!this._currentQuestion.afterCorrectAnswer) {
      return;
    }

    await this._player.playMultipleParts(this._currentQuestion.afterCorrectAnswer.map(({
      partToPlay,
      answerToHighlight,
    }): PartToPlay => ({
      beforePlaying: () => {
        this._highlightedAnswer = answerToHighlight || null;
      },
      partOrTime: partToPlay,
    })));
    this._highlightedAnswer = null;
  }
}
