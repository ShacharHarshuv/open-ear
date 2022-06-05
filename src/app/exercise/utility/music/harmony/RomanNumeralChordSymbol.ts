import { ChordType } from '../chords';

type UppercaseRomanNumeralChordSymbol = 'I' | 'bII' | 'II' | 'bIII' | 'III' | 'IV' | '#IV' | 'V' | 'bVI' | 'VI' | 'bVII' | 'VII';
type LowercaseRomanNumeralChordSymbol = 'i' | 'bii' | 'ii' | 'biii' | 'iii' | 'iv' | '#iv' | 'v' | 'bvi' | 'vi' | 'bvii' | 'vii';
type MajorChordTypesSuffix = '' | ChordType.Major7th | ChordType.Dominant7th | ChordType.sus4 | ChordType.sus2;
type MinorChordTypesSuffix = '' | ChordType.Diminished | ChordType.Minor7th | ChordType.HalfDiminished7th | ChordType.Diminished7th;

export type RomanNumeralChordSymbol = `${UppercaseRomanNumeralChordSymbol}${MajorChordTypesSuffix}` | `${LowercaseRomanNumeralChordSymbol}${MinorChordTypesSuffix}`;
