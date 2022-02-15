import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise } from '../exercise/Exercise';
import IExercise = Exercise.IExercise;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly exerciseList: IExercise[] = this._exerciseService.getExerciseList();

  constructor(
    private _player: PlayerService,
    private _exerciseService: ExerciseService,
  ) {
  }
}
