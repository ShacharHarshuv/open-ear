import { Component, inject } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Note } from 'tone/Tone/core/type/NoteUnits';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  private _playingNotesSet = new Set<Note>();
  readonly playerService = inject(PlayerService);

  get currentlyPlaying(): string {
    return Array.from(this._playingNotesSet).join(', ');
  }

  play(): void {
    this.playerService.playMultipleParts([
      {
        partOrTime: [
          {
            notes: 'C4',
            duration: '4n',
          },
        ],
        beforePlaying: () => this._playingNotesSet.add('C4'),
        afterPlaying: () => this._playingNotesSet.delete('C4'),
      },
      {
        partOrTime: [
          {
            notes: 'E4',
            duration: '2n',
          },
        ],
        beforePlaying: () => this._playingNotesSet.add('E4'),
        afterPlaying: () => this._playingNotesSet.delete('E4'),
      },
      {
        playAfter: 0,
        partOrTime: [
          {
            notes: 'G4',
            duration: '2n',
          },
        ],
        beforePlaying: () => this._playingNotesSet.add('G4'),
        afterPlaying: () => this._playingNotesSet.delete('G4'),
      },
    ]);
  }

  playSimplePart() {
    this.playerService.playPart([
      {
        notes: 'C4',
      },
    ]);
  }
}
