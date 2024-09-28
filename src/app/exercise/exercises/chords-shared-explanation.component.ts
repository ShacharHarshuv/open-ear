import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NoteEvent } from '../../services/player.service';
import { CollapsibleComponent } from '../../shared/components/shared-components/collapsible/collapsible.component';
import { InfoPanelComponent } from '../../shared/components/shared-components/info-panel/info-panel.component';
import { PlayOnClickDirective } from '../../shared/components/shared-components/play-on-click.directive';
import {
  Chord,
  ChordSymbol,
  IV_V_I_CADENCE_IN_C,
  TriadPosition,
} from '../utility/music/chords';
import { RomanNumeralSymbolComponent } from './ChordInKeyExercise/chord-in-key-explanation/roman-numeral-symbol.component';

@Component({
  selector: 'app-chords-shared-explanation',
  standalone: true,
  imports: [
    CollapsibleComponent,
    InfoPanelComponent,
    IonicModule,
    RomanNumeralSymbolComponent,
    PlayOnClickDirective,
  ],
  template: `
    <app-info-panel>
      <b>Tip!</b> Every chord has its own sensation of tension/release. The
      <app-roman-numeral-symbol symbol="I" />
      chord feels most at rest, while the
      <app-roman-numeral-symbol symbol="V" />
      has tension - it "wants" to move.
    </app-info-panel>

    <p>
      <b>Note!</b> This app uses a <b>unique notation for slash chords</b>,
      which is a combination of classical roman numeral analysis and Jazz chord
      symbols. In that notation
      <app-roman-numeral-symbol symbol="I/3" />
      in C major is "C/E". See later for details
    </p>

    <p>
      <b>To select more complicated chords</b> in the settings, long press the
      triad with the bass note that you want, a popover will open, given you
      options to select many other chords with the same bass note. When doing
      the exercise, a short click will select the default chord, while long
      press and slide will enable you to select others.
    </p>

    <app-collapsible>
      <h2>Triads & Roman Numerals</h2>
      <p>Triadic chords are chords built from 3 notes using thirds.</p>
      <p>For example, in the key of C major, we can form this chord:</p>
      <app-info-panel><b>C</b> D <b>E</b> F <b>G</b> A B</app-info-panel>
      <p>
        Because it is built starting from the first degree (Tonic note)
        <b
          >it is called the
          <app-roman-numeral-symbol symbol="I" />
          (one) chord</b
        >. The
        <app-roman-numeral-symbol symbol="I" />
        chord is most "at rest", and holds no tension.
      </p>
      <ion-button [color]="'light'" [appPlayOnClick]="cadenceAndIChord">
        Cadence + &nbsp;<app-roman-numeral-symbol symbol="I" />&nbsp; chord
      </ion-button>
      <p>
        We can also build a triad from the 5th degree to form a 'V' (five)
        chord. Notice how this chord holds tension, and wants to resolve to the
        tonic.
      </p>
      <ion-button [color]="'light'" [appPlayOnClick]="cadenceAndVChord">
        Cadence + &nbsp;<app-roman-numeral-symbol symbol="V" />&nbsp; chord
      </ion-button>
      <p>
        Because the chord sensation is dependant on the key, we use Roman
        numerals to indicate chords numbers in an arbitrary key.
      </p>
      <p>
        Note that we use lower-case to indicate the minor chords (
        <app-roman-numeral-symbol symbol="ii" />
        ,
        <app-roman-numeral-symbol symbol="iii" />
        and
        <app-roman-numeral-symbol symbol="vi" />
        ), and dim to indicate diminished chords (
        <app-roman-numeral-symbol symbol="viidim" />
        )
      </p>

      <h2>Extensions and Inversions</h2>
      <p>
        The roman numeral analysis method was invented mainly with classical
        music in mind, so it's not very good in conveying more complex chords
        that can be found in modern music like Jazz. To accommodate for this,
        this app uses a unique convention for notating extensions and
        inversions, that is borrowed from jazz.
      </p>
      <ul>
        <li>
          Extensions are notated like in Jazz. For example:
          <app-roman-numeral-symbol symbol="I6" />
          in C major is C6 (C-E-G-A), NOT C/E (C in first inversion)
        </li>
        <li>
          Inversions are notated with a slash symbol followed by the scale
          degree of the bass note. For example:
          <app-roman-numeral-symbol symbol="I/3" />
          in C major is C/E (E-C-E-G with E on the bass).
          <app-roman-numeral-symbol symbol="I" />
          denotes that it's the first chord (C) and /3 denotes the bass has the
          3rd scale degree (E).
        </li>
      </ul>
    </app-collapsible>
  `,
  styles: ``,
})
export class ChordsSharedExplanationComponent {
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
