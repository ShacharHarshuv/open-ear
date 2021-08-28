import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../Exercise';
import { PlayerService } from '../../services/player.service';

@Injectable()
export class ExerciseStateService {
  private readonly _exercise: Exercise.IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id'));
  private _currentQuestion: Exercise.Question = this._exercise.getQuestion();
  readonly name: string = this._exercise.name;
  readonly answerList: string[] = this._exercise.getAnswerList();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
    private _player: PlayerService,
  ) { }

  startAudio(): Promise<void> {
    return this._player.init();
  }

  answer(answer: string): boolean {
    return this._currentQuestion.rightAnswer === answer;
  }

  playCurrentQuestion(): Promise<void> {
    return this._player.playPart(this._currentQuestion.partToPlay);
  }

  nextQuestion(): void {
    this._currentQuestion = this._exercise.getQuestion();
  }
}
