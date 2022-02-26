import { Injectable } from '@angular/core';
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

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
  adaptive: false,
  bpm: 120,
  moveToNextQuestionAutomatically: false,
};

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService {
  private readonly _originalExercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.params['id']!);
  private _globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;
  readonly name: string = this.exercise.name;
  answerList: AnswerList = this.exercise.getAnswerList();
  private _adaptiveExercise: AdaptiveExercise = new AdaptiveExercise(this._originalExercise);
  private _currentQuestion: Exercise.Question = this.exercise.getQuestion();
  private _currentSegmentToAnswer: number = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
    private _exerciseSettingsData: ExerciseSettingsDataService,
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

      // Last segment was answered
      if (this._currentSegmentToAnswer === this._currentQuestion.segments.length) {
        // if not all answers are correct
        if (this._globalSettings.adaptive) {
          const areAllSegmentsCorrect: boolean = !this._currentAnswers.filter(answerSegment => answerSegment.wasWrong).length;
          this._adaptiveExercise.reportAnswerCorrectness(areAllSegmentsCorrect);
        }
        this._afterCorrectAnswer()
        .then(() => {
          if (this._globalSettings.moveToNextQuestionAutomatically) {
            // Make sure we are still in the same question (i.e. "Next" wasn't clicked by user)
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
    const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
    if (this._currentQuestion.cadence && this._globalSettings.playCadence) {
      partsToPlay.unshift(
        {
          partOrTime: toSteadyPart(this._currentQuestion.cadence),
          bpm: 120,
        },
        {
          partOrTime: 100,
        },
      );
    }
    if (this._areAllSegmentsAnswered && this._currentQuestion.afterCorrectAnswer) {
      partsToPlay.push(...this._getAfterCorrectAnswerParts());
    }
    await this._player.playMultipleParts(partsToPlay);
    this._currentlyPlayingSegment = null;
  }

  async playCurrentQuestion(): Promise<void> {
    await this._player.playMultipleParts(this._getCurrentQuestionPartsToPlay());
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
    this._player.setBpm(this._globalSettings.bpm);
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

    await this._player.playMultipleParts(this._getAfterCorrectAnswerParts());
    this._highlightedAnswer = null;
  }

  playAnswer(answerConfig: Exercise.AnswerConfig<string>): void {
    const partToPlay: NoteEvent[] | OneOrMany<Note> | null | undefined = toGetter(answerConfig.playOnClick)(this._currentQuestion);
    if (!partToPlay) {
      return;
    }
    this._player.playPart(toSteadyPart(partToPlay));
  }
}
