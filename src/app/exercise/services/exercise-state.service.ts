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
  readonly name: string = this._exercise.name;
  readonly answerList: AnswerList = this._exercise.getAnswerList();
  settings: ExerciseSettings = DEFAULT_EXERCISE_SETTINGS;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) {
  }

  answer(answer: string): boolean {
    return this._currentQuestion.rightAnswer === answer;
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
    this._currentQuestion = this._exercise.getQuestion();
  }
}
