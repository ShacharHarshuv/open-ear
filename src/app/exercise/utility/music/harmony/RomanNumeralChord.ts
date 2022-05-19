import { ChordType } from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import * as _ from 'lodash';

export type ScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export enum Accidental {
  Natural = '',
  Sharp = '#',
  Flat = 'b',
}

export class RomanNumeralChord {
  readonly degree: ScaleDegree;
  readonly accidental: Accidental;
  readonly type: ChordType;

  static readonly romanNumerals: Record<ScaleDegree, string> = { 1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v', 6: 'vi', 7: 'vii'};
  static readonly romanNumeralsToScaleDegree: Record<string, ScaleDegree> = _.mapValues(_.invert(RomanNumeralChord.romanNumerals), value => +value as ScaleDegree);

  static accidentalToString: Record<Accidental, string> = {
    [Accidental.Natural]: '',
    [Accidental.Sharp]: '♯',
    [Accidental.Flat]: '♭',
  }

  constructor(romanNumeralInput: RomanNumeralChordSymbol | {
    degree: ScaleDegree,
    accidental: Accidental, // default is Natural
    type: ChordType, // default is major
  }) {
    if (typeof romanNumeralInput === 'object') {
      this.degree = romanNumeralInput.degree;
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

    this.degree = RomanNumeralChord.romanNumeralsToScaleDegree[romanNumeralString.toLowerCase()];
    if (!this.degree) {
      throw new Error(`${romanNumeralString} is not a valid roman numeral`);
    }

    this.type = typeString === 'dim' ? ChordType.Diminished : romanNumeralString.toLowerCase() === romanNumeralString ? ChordType.Minor : ChordType.Major;

    this.accidental = {'#': Accidental.Sharp, 'b': Accidental.Flat, '': Accidental.Natural}[accidentalString ?? '']!;
  }

  toString(): string {
    const romanNumeral: string = RomanNumeralChord.romanNumerals[this.degree];
    return `${RomanNumeralChord.accidentalToString[this.accidental]}${this.type === ChordType.Major ? romanNumeral.toUpperCase() : romanNumeral}${this.type === ChordType.Diminished ? '°' : ''}`
  }
}
