import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NoteEvent } from '../../../../services/player.service';
import { CollapsibleComponent } from '../../../../shared/components/shared-components/collapsible/collapsible.component';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';
import {
  Chord,
  ChordSymbol,
  IV_V_I_CADENCE_IN_C,
  TriadPosition,
} from '../../../utility/music/chords';
import { RomanNumeralSymbolComponent } from './roman-numeral-symbol.component';

@Component({
  selector: 'app-chord-in-key-explanation',
  templateUrl: './chord-in-key-explanation.component.html',
  standalone: true,
  imports: [
    InfoPanelComponent,
    CollapsibleComponent,
    IonicModule,
    PlayOnClickDirective,
    RomanNumeralSymbolComponent,
  ],
})
export class ChordInKeyExplanationComponent {
  getChordExample(
    chordSymbol: ChordSymbol,
    position: TriadPosition,
  ): NoteEvent[] {
    return [
      ...IV_V_I_CADENCE_IN_C,
      {
        notes: [],
        duration: '4n',
      },
      {
        notes: new Chord(chordSymbol).getVoicing({
          position: position,
        }),
        velocity: 0.3,
        duration: '1n',
      },
    ];
  }

  readonly cadenceAndIChord: NoteEvent[] = this.getChordExample(
    'C',
    TriadPosition.Octave,
  );

  readonly cadenceAndVChord: NoteEvent[] = this.getChordExample(
    'G',
    TriadPosition.Third,
  );
}
