import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../Exercise';
import {
  PlayerService,
  PartToPlay,
} from '../../services/player.service';
import { toSteadyPart } from '../utility';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;
import SettingValueType = Exercise.SettingValueType;

export interface GlobalExerciseSettings {
  /**
   * If received number it will play the cadence every n exercises
   * */
  playCadence: true | false | 'ONLY_ON_REPEAT' /*| 'EVERY_NEW_KEY' | number*/; // TODO(OE-12, OE-13)
}

const DEFAULT_EXERCISE_SETTINGS: GlobalExerciseSettings = {
  playCadence: true,
}

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService {
  readonly _exercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id')!);
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  private _totalCorrectAnswers: number = 0;
  private _totalQuestions: number = 0;
  private _currentAnswers: CurrentAnswer[] = [];
  private _currentSegmentToAnswer: number = 0;
  private _currentlyPlayingSegment: number | null = null;
  private _highlightedAnswer: string | null = null;
  readonly name: string = this._exercise.name;
  readonly hasCadence: boolean = !!this._currentQuestion.cadence;
  answerList: AnswerList = this._exercise.getAnswerList();
  globalSettings: GlobalExerciseSettings = DEFAULT_EXERCISE_SETTINGS;

  get totalCorrectAnswers(): number {
    return this._totalCorrectAnswers;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get currentAnswers(): CurrentAnswer[] {
    return this._currentAnswers;
  }

  get currentlyPlayingSegment(): number | null {
    return this._currentlyPlayingSegment;
  }

  get exerciseSettingsDescriptor(): Exercise.SettingsControlDescriptor[] {
    const settingsDescriptor: Exercise.SettingsControlDescriptor[] | undefined = this._exercise.settingsDescriptor;
    return settingsDescriptor || [];
  }

  get exerciseSettings(): { [key: string]: Exercise.SettingValueType } {
    return this._exercise.getCurrentSettings?.() || {};
  }

  get highlightedAnswer(): string | null {
    return this._highlightedAnswer;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) {
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
      }
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    const partsToPlay: PartToPlay[] = this._getCurrentQuestionPartsToPlay();
    if (this._currentQuestion.cadence && this.globalSettings.playCadence) {
      partsToPlay.unshift(

        {
          partOrTime: toSteadyPart(this._currentQuestion.cadence),
        },
        {
          partOrTime: 100,
        },
      )
    }
    await this._player.playMultipleParts(partsToPlay);
    this._currentlyPlayingSegment = null;
  }

  async playCurrentQuestion(): Promise<void> {
    await this._player.playMultipleParts(this._getCurrentQuestionPartsToPlay());
    this._currentlyPlayingSegment = null;
  }

  private _getCurrentQuestionPartsToPlay(): PartToPlay[] {
    return this._currentQuestion.segments.map((segment, i): PartToPlay => ({
      partOrTime: toSteadyPart(segment.partToPlay),
      beforePlaying: () => {
        this._currentlyPlayingSegment = i;
      },
    }))
  }

  nextQuestion(): void {
    this._currentQuestion = this._exercise.getQuestion();
    this._currentAnswers = this._currentQuestion.segments.map(() => ({
      wasWrong: false,
      answer: null,
    }));
    this._currentSegmentToAnswer = 0;
  }

  updateExerciseSettings(settings: { [key: string]: SettingValueType }): void {
    this._exercise.updateSettings?.(settings);
    this.answerList = this._exercise.getAnswerList();
    this.nextQuestion();
  }

  private async _afterCorrectAnswer(): Promise<void> {
    if (!this._currentQuestion.afterCorrectAnswer) {
      return;
    }

    await this._player.playMultipleParts(this._currentQuestion.afterCorrectAnswer.map(({partToPlay, answerToHighlight}): PartToPlay => ({
      beforePlaying: () => {
        this._highlightedAnswer = answerToHighlight || null;
      },
      partOrTime: partToPlay,
    })))
    this._highlightedAnswer = null;
  }
}
