import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Exercise } from '../../../exercise/exercise-logic';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class ExerciseSummaryComponent {
  private _player = inject(PlayerService);

  readonly exercise =
    input.required<Pick<Exercise, 'id' | 'name' | 'summary'>>();

  // This has to be called by a user click event to work
  initAudioPlayer(): void {
    this._player.init();
  }
}
