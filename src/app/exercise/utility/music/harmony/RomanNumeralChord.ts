import {
  ChordType,
  Chord,
} from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import * as _ from 'lodash';
import {
  DiatonicScaleDegree,
  ScaleDegree,
  scaleDegreeToChromaticDegree,
} from './ScaleDegrees';
import {
  Mode,
  toRelativeMode,
} from './Mode';
import { MusicSymbol } from '../MusicSymbol';
import { Key } from '../keys/Key';
import { NoteType } from '../notes/NoteType';
import { transpose } from '../transpose';
import { SupertextDigit } from '../SupertextDigit';

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

  private get _isLowercase(): boolean {
    const chordTypeToIsLowerCase: Record<ChordType, boolean> = {
      [ChordType.Major]: false,
      [ChordType.Minor]: true,
      [ChordType.Diminished]: true,
      [ChordType.HalfDiminished7th]: true,
      [ChordType.Diminished7th]: true,
      [ChordType.Dominant7th]: false,
      [ChordType.Major7th]: false,
      [ChordType.Minor7th]: true,
      [ChordType.Major6th]: false,
      [ChordType.Sus4]: false,
      [ChordType.Sus2]: false,
    };
    return chordTypeToIsLowerCase[this.type];
  }

  get romanNumeralChordSymbol(): RomanNumeralChordSymbol {
    const suffix = (() => {
      switch (this.type) {
        case ChordType.Major:
        case ChordType.Minor:
          return '';
        case ChordType.Minor7th:
          return '7';
        default:
          return this.type as ChordType;
      }
    })();
    const romanNumeral: string = RomanNumeralChord.romanNumerals[this.diatonicDegree];
    return `${this.accidental}${this._isLowercase ? romanNumeral.toLowerCase() : romanNumeral.toUpperCase()}${suffix}` as RomanNumeralChordSymbol;
  }

  static readonly romanNumerals: Record<DiatonicScaleDegree, string> = { 1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v', 6: 'vi', 7: 'vii'};
  static readonly romanNumeralsToScaleDegree: Record<string, DiatonicScaleDegree> = _.mapValues(_.invert(RomanNumeralChord.romanNumerals), value => +value as DiatonicScaleDegree);

  static accidentalToString: Record<Accidental, string> = {
    [Accidental.Natural]: '',
    [Accidental.Sharp]: MusicSymbol.Sharp,
    [Accidental.Flat]: MusicSymbol.Flat,
  }

  // TODO
  // static chordTypeToSuffix: Record<ChordType, string> = {
  //   [ChordType.Major]: '',
  //   [ChordType.Minor]: '',
  //   [ChordType.Diminished]: MusicSymbol.Diminished,
  //   [ChordType.Dominant7th]: MusicSymbol.Diminished,
  // }

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

    const regexMatch: RegExpMatchArray | null = romanNumeralInput.match(/(b|#)?([ivIV]+)(dim|7|maj7|sus|sus2|6|dim7|7b5)?$/);
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

    const isLowercase = romanNumeralString.toLowerCase() === romanNumeralString;
    if (isLowercase) {
      switch (typeString) {
        case undefined:
          this.type = ChordType.Minor;
          break;
        case '7':
          this.type = ChordType.Minor7th;
          break;
        case 'dim':
          this.type = ChordType.Diminished;
          break;
        case 'dim7':
          this.type = ChordType.Diminished7th;
          break;
        case '7b5':
          this.type = ChordType.HalfDiminished7th;
      }
    } else {
      switch (typeString) {
        case undefined:
          this.type = ChordType.Major;
          break;
        default:
          this.type = typeString as ChordType;
      }
    }

    if (!this.type) {
      throw new Error(`Unable to determine type of ${this.romanNumeralChordSymbol}`);
    }

    this.accidental = {'#': Accidental.Sharp, 'b': Accidental.Flat, '': Accidental.Natural}[accidentalString ?? '']!;
  }

  getChord(key: Key): Chord {
    const baseNote: NoteType = (transpose(key, scaleDegreeToChromaticDegree[this.diatonicDegree] - 1) + this.accidental) as NoteType;

    return new Chord({
      root: baseNote,
      type: this.type,
    })
  }

  toString(): string {
    const romanNumeral: string = RomanNumeralChord.romanNumerals[this.diatonicDegree];
    let postfix: string = '';
    switch (this.type) {
      case ChordType.Diminished:
        postfix = MusicSymbol.Diminished;
        break;
      case ChordType.Dominant7th:
      case ChordType.Minor7th:
        postfix = SupertextDigit[7];
        break;
      case ChordType.Diminished7th:
        postfix = MusicSymbol.Diminished + SupertextDigit[7];
        break;
      case ChordType.HalfDiminished7th:
        postfix = MusicSymbol.HalfDiminished;
        break;
      case ChordType.Major6th:
        postfix = SupertextDigit[6];
        break;
      case ChordType.Major7th:
        postfix = `maj${SupertextDigit[7]}`;
        break;
      case ChordType.Sus4:
        postfix = ChordType.Sus4;
        break;
      case ChordType.Sus2:
        postfix = ChordType.Sus2;
        break;
    }
    return `${RomanNumeralChord.accidentalToString[this.accidental]}${this._isLowercase ? romanNumeral.toLowerCase() : romanNumeral.toUpperCase()}${postfix}`
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
