import { Component, Input, inject } from '@angular/core';
import Exercise from '../../../exercise/Exercise';
import { PlayerService } from '../../../services/player.service';
import IExercise = Exercise.Exercise;

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
})
export class ExerciseSummaryComponent {
  private _player = inject(PlayerService);

  @Input()
  exercise: IExercise;

  // This has to be called by a user click event to work
  initAudioPlayer(): void {
    this._player.init();
  }
}
