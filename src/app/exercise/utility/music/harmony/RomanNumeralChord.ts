import { ChordType, Chord } from '../chords';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import * as _ from 'lodash';
import {
  DiatonicScaleDegree,
  ScaleDegree,
  scaleDegreeToChromaticDegree,
  getDiatonicScaleDegreeWithAccidental,
  Accidental,
} from '../scale-degrees';
import { Mode, toRelativeMode } from './Mode';
import { MusicSymbol } from '../MusicSymbol';
import { Key } from '../keys/Key';
import { NoteType } from '../notes/NoteType';
import { transpose } from '../transpose';
import {
  chordTypeConfigMap,
  romanNumeralChordTypeParserMap,
} from '../chords/Chord/ChordType';
import { isChordTypeMajor } from '../chords/Chord/isChordTypeMajor';

const allRomanNumeralPostfix: string[] = _.map(
  chordTypeConfigMap,
  (chordTypeConfig) => chordTypeConfig.romanNumeral.postfix
);
const romanNumeralChordSymbolRegex = new RegExp(
  `(b|#)?([ivIV]+)(${allRomanNumeralPostfix.map(_.escapeRegExp).join('|')})?$`
);

export class RomanNumeralChord {
  readonly diatonicDegree: DiatonicScaleDegree;
  readonly accidental: Accidental;
  readonly type: ChordType;

  get scaleDegree(): ScaleDegree {
    return (this.accidental + this.diatonicDegree) as ScaleDegree;
  }

  private get _isLowercase(): boolean {
    return chordTypeConfigMap[this.type].romanNumeral.isLowercase;
  }

  get romanNumeralChordSymbol(): RomanNumeralChordSymbol {
    const romanNumeral: string =
      RomanNumeralChord.romanNumerals[this.diatonicDegree];
    return `${this.accidental}${
      this._isLowercase
        ? romanNumeral.toLowerCase()
        : romanNumeral.toUpperCase()
    }${
      chordTypeConfigMap[this.type].romanNumeral.postfix
    }` as RomanNumeralChordSymbol;
  }

  get isDiatonic(): boolean {
    const chordInC = this.getChord('C');
    return _.every(chordInC.noteTypes, (noteType) =>
      ['C', 'D', 'E', 'F', 'G', 'A', 'B'].includes(noteType)
    );
  }

  static readonly romanNumerals: Record<DiatonicScaleDegree, string> = {
    1: 'i',
    2: 'ii',
    3: 'iii',
    4: 'iv',
    5: 'v',
    6: 'vi',
    7: 'vii',
  };

  static readonly romanNumeralsUnicode: Record<
    DiatonicScaleDegree,
    [string, string]
  > = {
    '1': ['\u2160', '\u2170'], // 'Ⅰ', 'ⅰ'
    '2': ['\u2161', '\u2171'], // 'Ⅱ', 'ⅱ'
    '3': ['\u2162', '\u2172'], // 'Ⅲ', 'ⅲ'
    '4': ['\u2163', '\u2173'], // 'Ⅳ', 'ⅳ'
    '5': ['\u2164', '\u2174'], // 'Ⅴ', 'ⅴ'
    '6': ['\u2165', '\u2175'], // 'Ⅵ', 'ⅵ'
    '7': ['\u2166', '\u2176'], // 'Ⅶ', 'ⅶ'
  };

  static readonly romanNumeralsToScaleDegree: Record<
    string,
    DiatonicScaleDegree
  > = _.mapValues(
    _.invert(RomanNumeralChord.romanNumerals),
    (value) => +value as DiatonicScaleDegree
  );

  static accidentalToString: Record<Accidental, string> = {
    [Accidental.Natural]: '',
    [Accidental.Sharp]: MusicSymbol.Sharp,
    [Accidental.Flat]: MusicSymbol.Flat,
  };

  constructor(
    romanNumeralInput:
      | RomanNumeralChordSymbol
      | {
          scaleDegree: ScaleDegree;
          type: ChordType;
        }
  ) {
    if (typeof romanNumeralInput === 'object') {
      this.type = romanNumeralInput.type;
      const diatonicDegreeWithAccidental = getDiatonicScaleDegreeWithAccidental(
        romanNumeralInput.scaleDegree
      );
      this.diatonicDegree = diatonicDegreeWithAccidental.diatonicScaleDegree;
      this.accidental = diatonicDegreeWithAccidental.accidental;
      return;
    }

    const regexMatch: RegExpMatchArray | null = romanNumeralInput.match(
      romanNumeralChordSymbolRegex
    );
    if (!regexMatch) {
      throw new Error(
        `RomanNumeralChordSymbol: ${romanNumeralInput} is not a valid input`
      );
    }

    const accidentalString: string | undefined = regexMatch[1];
    const romanNumeralString: string | undefined = regexMatch[2];
    const typeString: string | undefined = regexMatch[3];

    this.diatonicDegree =
      RomanNumeralChord.romanNumeralsToScaleDegree[
        romanNumeralString.toLowerCase()
      ];
    if (!this.diatonicDegree) {
      throw new Error(`${romanNumeralString} is not a valid roman numeral`);
    }

    const isLowercase = romanNumeralString.toLowerCase() === romanNumeralString;
    this.type =
      romanNumeralChordTypeParserMap[isLowercase ? 'lowercase' : 'uppercase'][
        typeString ?? ''
      ];

    if (!this.type) {
      throw new Error(`Unable to determine type of ${romanNumeralInput}`);
    }

    this.accidental = {
      '#': Accidental.Sharp,
      b: Accidental.Flat,
      '': Accidental.Natural,
    }[accidentalString ?? '']!;
  }

  getChord(key: Key): Chord {
    const baseNote: NoteType = (transpose(
      key,
      scaleDegreeToChromaticDegree[this.diatonicDegree] - 1
    ) + this.accidental) as NoteType;

    return new Chord({
      root: baseNote,
      type: this.type,
    });
  }

  toViewString(): string {
    const romanNumeral: string =
      RomanNumeralChord.romanNumeralsUnicode[this.diatonicDegree][
        isChordTypeMajor(this.type) ? 0 : 1
      ];
    let postfix: string =
      chordTypeConfigMap[this.type].romanNumeral.viewPostfix;
    return `${RomanNumeralChord.accidentalToString[this.accidental]}${
      this._isLowercase
        ? romanNumeral.toLowerCase()
        : romanNumeral.toUpperCase()
    }${postfix}`;
  }

  static toRelativeMode(
    chordSymbol: RomanNumeralChordSymbol,
    source: Mode,
    target: Mode
  ): RomanNumeralChordSymbol {
    const chord = new RomanNumeralChord(chordSymbol);
    const scaleDegree = toRelativeMode(chord.scaleDegree, source, target);
    return new RomanNumeralChord({
      scaleDegree,
      type: chord.type,
    }).romanNumeralChordSymbol;
  }
}
