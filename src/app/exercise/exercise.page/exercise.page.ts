import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IExercise } from '../IExercise';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage {
  readonly exercise: IExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id'));

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _exerciseService: ExerciseService,
  ) {
  }
}
