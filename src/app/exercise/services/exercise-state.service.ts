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

@Injectable()
export class ExerciseStateService {
  private readonly _exercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id')!);
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  readonly name: string = this._exercise.name;
  readonly answerList: AnswerList = this._exercise.getAnswerList();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) {
  }

  answer(answer: string): boolean {
    return this._currentQuestion.rightAnswer === answer;
  }

  async playCurrentQuestion(): Promise<void> {
    if (this._currentQuestion.cadence) {
      await this._player.playPart(toSteadyPart(this._currentQuestion.cadence))
      await timeoutAsPromise(100);
    }
    return this._player.playPart(toSteadyPart(this._currentQuestion.partToPlay));
  }

  nextQuestion(): void {
    this._currentQuestion = this._exercise.getQuestion();
  }
}
