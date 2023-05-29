import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise } from '../exercise/exercise-logic';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly exerciseList: Exercise[] = this._exerciseService.getExerciseList();

  constructor(
    private readonly _player: PlayerService,
    private readonly _exerciseService: ExerciseService
  ) {}
}
