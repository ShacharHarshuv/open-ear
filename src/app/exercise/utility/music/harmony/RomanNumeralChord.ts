import { ChordType } from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import * as _ from 'lodash';
import {
  DiatonicScaleDegree,
  ScaleDegree,
} from './ScaleDegrees';
import {
  Mode,
  toRelativeMode,
} from './Mode';
import { MusicSymbol } from '../MusicSymbol';

export enum Accidental {
  Natural = '',
  Sharp = '#',
  Flat = 'b',
}

export class RomanNumeralChord {
  readonly diatonicDegree: DiatonicScaleDegree;
  readonly accidental: Accidental;
  readonly type: ChordType;

  get scaleDegree(): ScaleDegree {
    return (this.accidental + this.diatonicDegree) as ScaleDegree;
  }

  get romanNumeralChordSymbol(): RomanNumeralChordSymbol {
    const romanNumeral: string = RomanNumeralChord.romanNumerals[this.diatonicDegree];
    return `${this.accidental}${this.type === ChordType.Major ? romanNumeral.toUpperCase() : romanNumeral}${this.type === ChordType.Diminished ? ChordType.Diminished : ''}` as RomanNumeralChordSymbol;
  }

  static readonly romanNumerals: Record<DiatonicScaleDegree, string> = { 1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v', 6: 'vi', 7: 'vii'};
  static readonly romanNumeralsToScaleDegree: Record<string, DiatonicScaleDegree> = _.mapValues(_.invert(RomanNumeralChord.romanNumerals), value => +value as DiatonicScaleDegree);

  static accidentalToString: Record<Accidental, string> = {
    [Accidental.Natural]: '',
    [Accidental.Sharp]: MusicSymbol.Sharp,
    [Accidental.Flat]: MusicSymbol.Flat,
  }

  constructor(romanNumeralInput: RomanNumeralChordSymbol | {
    scaleDegree: ScaleDegree,
    type: ChordType,
  }) {
    if (typeof romanNumeralInput === 'object') {
      this.type = romanNumeralInput.type;
      const regexMatch: RegExpMatchArray | null = romanNumeralInput.scaleDegree.match(/(b|#)?([1-7])/);
      if (!regexMatch) {
        throw new Error(`${romanNumeralInput.scaleDegree} is not a valid scale degree`);
      }
      this.diatonicDegree = +regexMatch[2] as DiatonicScaleDegree;
      this.accidental = regexMatch[1] as Accidental ?? Accidental.Natural;
      return;
    }

    const regexMatch: RegExpMatchArray | null = romanNumeralInput.match(/(b|#)?([ivIV]+)(dim)?/);
    if (!regexMatch) {
      throw new Error(`RomanNumeralChordSymbol: ${romanNumeralInput} is not a valid input`);
    }

    const accidentalString: string | undefined = regexMatch[1];
    const romanNumeralString: string | undefined = regexMatch[2];
    const typeString: string | undefined = regexMatch[3];

    this.diatonicDegree = RomanNumeralChord.romanNumeralsToScaleDegree[romanNumeralString.toLowerCase()];
    if (!this.diatonicDegree) {
      throw new Error(`${romanNumeralString} is not a valid roman numeral`);
    }

    this.type = typeString === 'dim' ? ChordType.Diminished : romanNumeralString.toLowerCase() === romanNumeralString ? ChordType.Minor : ChordType.Major;

    this.accidental = {'#': Accidental.Sharp, 'b': Accidental.Flat, '': Accidental.Natural}[accidentalString ?? '']!;
  }

  toString(): string {
    const romanNumeral: string = RomanNumeralChord.romanNumerals[this.diatonicDegree];
    return `${RomanNumeralChord.accidentalToString[this.accidental]}${this.type === ChordType.Major ? romanNumeral.toUpperCase() : romanNumeral}${this.type === ChordType.Diminished ? MusicSymbol.Diminished : ''}`
  }

  static toRelativeMode(chordSymbol: RomanNumeralChordSymbol, source: Mode, target: Mode): RomanNumeralChordSymbol {
    const chord = new RomanNumeralChord(chordSymbol);
    const scaleDegree = toRelativeMode(chord.scaleDegree, source, target);
    return new RomanNumeralChord({
      scaleDegree,
      type: chord.type,
    }).romanNumeralChordSymbol;
  }
}
