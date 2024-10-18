import { ChordType } from '../chords';
import { ScaleDegree } from '../scale-degrees';

export type UppercaseRomanNumeralChordSymbol =
  | 'I'
  | 'bII'
  | 'II'
  | 'bIII'
  | 'III'
  | 'IV'
  | '#IV'
  | 'V'
  | 'bV'
  | 'bVI'
  | 'VI'
  | 'bVII'
  | 'VII'
  | '#V';
export type LowercaseRomanNumeralChordSymbol =
  | 'i'
  | '#i'
  | 'bii'
  | 'ii'
  | '#ii'
  | 'biii'
  | 'iii'
  | 'iv'
  | '#iv'
  | 'v'
  | '#v'
  | 'bvi'
  | 'vi'
  | '#vi'
  | 'bvii'
  | 'vii';
export type MajorChordTypesPostfix =
  | ''
  | ChordType.Major7th
  | ChordType.Dominant7th
  | ChordType.Sus4
  | ChordType.Sus2
  | ChordType.Major6th
  | ChordType.Sharp5
  | ChordType.MajorAdd9
  | ChordType.Dominant9th
  | ChordType.Dominant11th
  | ChordType.Dominant7thSharp9th
  | ChordType.MajorAddSharp4;
export type MinorChordTypesPostfix =
  | ''
  | ChordType.Diminished
  | '7'
  | '9'
  | ChordType.HalfDiminished7th
  | ChordType.Diminished7th
  | 'b6'
  | '6'
  | ChordType.Major7th
  | 'M9'
  | 'add9'
  | ChordType.Sus4
  | ChordType.Sus2
  | ChordType.Sharp5;

type SlashChordPostfix = `/${ScaleDegree}`;

type RomanNumeralChordSymbolInRootInversion =
  | `${UppercaseRomanNumeralChordSymbol}${MajorChordTypesPostfix}`
  | `${LowercaseRomanNumeralChordSymbol}${MinorChordTypesPostfix}`;

export type RomanNumeralChordSymbol =
  `${RomanNumeralChordSymbolInRootInversion}${'' | SlashChordPostfix}`;
