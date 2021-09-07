import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../Exercise';
import { PlayerService } from '../../services/player.service';
import {
  toSteadyPart,
  timeoutAsPromise
} from '../utility';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;
import Answer = Exercise.Answer;

export interface ExerciseSettings {
  /**
   * If received number it will play the cadence every n exercises
   * */
  playCadence: true | false | 'ONLY_ON_REPEAT' /*| 'EVERY_NEW_KEY' | number*/; // TODO(OE-12, OE-13)
}

const DEFAULT_EXERCISE_SETTINGS: ExerciseSettings = {
  playCadence: true,
}

interface CurrentAnswer {
  answer: Answer | null;
  wasWrong: boolean;
}

@Injectable()
export class ExerciseStateService {
  private readonly _exercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id')!);
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  private _totalCorrectAnswers: number = 0;
  private _totalQuestions: number = 0;
  private _currentAnswers: CurrentAnswer[] = [];
  readonly name: string = this._exercise.name;
  readonly answerList: AnswerList = this._exercise.getAnswerList();
  settings: ExerciseSettings = DEFAULT_EXERCISE_SETTINGS;

  private get _answeredCurrentWrong(): boolean {
    const answeredWrong = this._currentAnswers.filter(answer => answer.wasWrong);
    return !_.isEmpty(answeredWrong);
  }

  get totalCorrectAnswers(): number {
    return this._totalCorrectAnswers;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get currentAnswers(): CurrentAnswer[] {
    return this._currentAnswers;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) {
  }

  answer(answer: string): boolean {
    const isRight = this._currentQuestion.segments[0].rightAnswer === answer;
    if (!isRight) {
      this._currentAnswers[0].wasWrong = true;
    } else {
      this._totalQuestions++;
      if (!this._answeredCurrentWrong) {
        this._totalCorrectAnswers++;
      }
      this._currentAnswers[0].answer = answer;
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    if (this._currentQuestion.cadence && this.settings.playCadence) {
      await this._player.playPart(toSteadyPart(this._currentQuestion.cadence))
      await timeoutAsPromise(100);
    }
    await this.playCurrentQuestion();
  }

  async playCurrentQuestion(): Promise<void> {
    for (let segment of this._currentQuestion.segments) {
      await this._player.playPart(toSteadyPart(segment.partToPlay));
    }
  }

  nextQuestion(): void {
    this._currentQuestion = this._exercise.getQuestion();
    this._currentAnswers = this._currentQuestion.segments.map(() => ({
      wasWrong: false,
      answer: null,
    }));
  }
}
