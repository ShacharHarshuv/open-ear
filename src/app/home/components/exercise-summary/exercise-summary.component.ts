import {
  Component,
  Input
} from '@angular/core';
import { Exercise } from '../../../exercise/Exercise';
import IExercise = Exercise.IExercise;
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
})
export class ExerciseSummaryComponent {
  @Input()
  exercise: IExercise;

  constructor(private _player: PlayerService,) {
  }

  // This has to be called by a user click event to work
  initAudioPlayer(): void {
    this._player.init();
  }
}
