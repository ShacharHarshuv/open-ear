import { Component } from '@angular/core';
import { NoteEvent } from '../../../../services/player.service';
import {
  Chord,
  ChordSymbol,
  IV_V_I_CADENCE_IN_C,
  TriadInversion,
} from '../../../utility/music/chords';

@Component({
  selector: 'app-chord-in-key-explanation',
  templateUrl: './chord-in-key-explanation.component.html',
})
export class ChordInKeyExplanationComponent {
  getChordExample(
    chordSymbol: ChordSymbol,
    topVoicesInversion: TriadInversion
  ): NoteEvent[] {
    return [
      ...IV_V_I_CADENCE_IN_C,
      {
        notes: [],
        duration: '4n',
      },
      {
        notes: new Chord(chordSymbol).getVoicing({ topVoicesInversion }),
        velocity: 0.3,
        duration: '1n',
      },
    ];
  }

  readonly cadenceAndIChord: NoteEvent[] = this.getChordExample(
    'C',
    TriadInversion.Octave
  );

  readonly cadenceAndVChord: NoteEvent[] = this.getChordExample(
    'G',
    TriadInversion.Third
  );
}
