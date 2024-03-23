import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import Exercise from '../../../exercise/exercise-logic';
import { PlayerService } from '../../../services/player.service';
import IExercise = Exercise.Exercise;

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class ExerciseSummaryComponent {
  private _player = inject(PlayerService);

  @Input()
  // @ts-ignore
  exercise: IExercise;

  // This has to be called by a user click event to work
  initAudioPlayer(): void {
    this._player.init();
  }
}
