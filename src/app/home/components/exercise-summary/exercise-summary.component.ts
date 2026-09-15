import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { Exercise } from '../../../exercise/exercise-logic';
import { PlayerService } from '../../../services/player.service';

// Best-effort mapping to distinct Ionicons (already bundled, no new
// dependency) per exercise, since a single generic icon for every tile
// isn't very distinguishing. Ionicons doesn't have music-theory-specific
// icons, so these are approximations, not literal representations.
// Anything not in this map (e.g. the dynamically-generated "songs" family
// of exercises) falls back to the default.
const exerciseIconById: Record<string, string> = {
  noteInKey: 'musical-note-outline',
  interval: 'swap-vertical-outline',
  chordTypeInKey: 'layers-outline',
  chordInKey: 'apps-outline',
  commonChordProgression: 'repeat-outline',
  notesWithChords: 'albums-outline',
  triadInversions: 'sync-outline',
};
const defaultExerciseIcon = 'disc-outline';

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class ExerciseSummaryComponent {
  private _player = inject(PlayerService);
  private _alertController = inject(AlertController);

  readonly exercise =
    input.required<Pick<Exercise, 'id' | 'name' | 'summary'>>();

  get icon(): string {
    return exerciseIconById[this.exercise().id] ?? defaultExerciseIcon;
  }

  // This has to be called by a user click event to work
  initAudioPlayer(): void {
    this._player.init();
  }

  async showInfo(event: Event): Promise<void> {
    // don't trigger the card's own click/navigation
    event.stopPropagation();
    event.preventDefault();

    const alert = await this._alertController.create({
      header: this.exercise().name,
      message: this.exercise().summary,
      buttons: ['Got it'],
    });
    await alert.present();
  }
}
