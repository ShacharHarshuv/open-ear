import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../Exercise';
import { PlayerService } from '../../services/player.service';
import AnswerList = Exercise.AnswerList;
import {
  toSteadyPart,
  timeoutAsPromise
} from '../utility';

export interface ExerciseSettings {
  /**
   * If received number it will play the cadence every n exercises
   * */
  playCadence: true | false | 'ONLY_ON_REPEAT' /*| 'EVERY_NEW_KEY' | number*/; // TODO(OE-12, OE-13)
}

const DEFAULT_EXERCISE_SETTINGS: ExerciseSettings = {
  playCadence: true,
}

@Injectable()
export class ExerciseStateService {
  private readonly _exercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id')!);
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  private _correctAnswers: number = 0;
  private _totalQuestions: number = 0;
  private _answeredCurrentWrong: boolean = false;
  readonly name: string = this._exercise.name;
  readonly answerList: AnswerList = this._exercise.getAnswerList();
  settings: ExerciseSettings = DEFAULT_EXERCISE_SETTINGS;

  get correctAnswers(): number {
    return this._correctAnswers;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) {
  }

  answer(answer: string): boolean {
    const isRight = this._currentQuestion.rightAnswer === answer;
    if (!isRight) {
      this._answeredCurrentWrong = true;
    } else {
      this._totalQuestions++;
      if (!this._answeredCurrentWrong) {
        this._correctAnswers++;
      }
    }
    return isRight;
  }

  async playCurrentCadenceAndQuestion(): Promise<void> {
    if (this._currentQuestion.cadence && this.settings.playCadence) {
      await this._player.playPart(toSteadyPart(this._currentQuestion.cadence))
      await timeoutAsPromise(100);
    }
    return this._player.playPart(toSteadyPart(this._currentQuestion.partToPlay));
  }

  async playCurrentQuestion(): Promise<void> {
    return this._player.playPart(toSteadyPart(this._currentQuestion.partToPlay));
  }

  nextQuestion(): void {
    this._answeredCurrentWrong = false;
    this._currentQuestion = this._exercise.getQuestion();
  }
}
