import { ChordType } from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import * as _ from 'lodash';
import {
  DiatonicScaleDegree,
  ScaleDegree,
} from './ScaleDegrees';

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

  static readonly romanNumerals: Record<DiatonicScaleDegree, string> = { 1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v', 6: 'vi', 7: 'vii'};
  static readonly romanNumeralsToScaleDegree: Record<string, DiatonicScaleDegree> = _.mapValues(_.invert(RomanNumeralChord.romanNumerals), value => +value as DiatonicScaleDegree);

  static accidentalToString: Record<Accidental, string> = {
    [Accidental.Natural]: '',
    [Accidental.Sharp]: '♯',
    [Accidental.Flat]: '♭',
  }

  constructor(romanNumeralInput: RomanNumeralChordSymbol | {
    degree: DiatonicScaleDegree,
    accidental: Accidental, // default is Natural
    type: ChordType, // default is major
  }) {
    if (typeof romanNumeralInput === 'object') {
      this.diatonicDegree = romanNumeralInput.degree;
      this.accidental = romanNumeralInput.accidental;
      this.type = romanNumeralInput.type;
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
    return `${RomanNumeralChord.accidentalToString[this.accidental]}${this.type === ChordType.Major ? romanNumeral.toUpperCase() : romanNumeral}${this.type === ChordType.Diminished ? '°' : ''}`
  }
}
