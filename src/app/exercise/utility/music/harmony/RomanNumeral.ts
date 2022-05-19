import { ChordType } from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';

export type ScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export enum Accidental {
  Natural = '',
  Sharp = '#',
  Flat = 'b',
}

export class RomanNumeral {
  readonly degree: ScaleDegree;
  readonly accidental: Accidental;
  readonly type: ChordType;

  constructor(romanNumeralInput: RomanNumeralChordSymbol | {
    degree: ScaleDegree,
    accidental: Accidental,
    type: ChordType,
  }) {
    if (typeof romanNumeralInput === 'object') {
      this.degree = romanNumeralInput.degree;
      this.accidental = romanNumeralInput.accidental;
      this.type = romanNumeralInput.type;
      return;
    }

    this.accidental = romanNumeralInput.includes(Accidental.Sharp) ? Accidental.Sharp :
      romanNumeralInput.includes(Accidental.Flat) ? Accidental.Flat : Accidental.Natural;
  }
}
