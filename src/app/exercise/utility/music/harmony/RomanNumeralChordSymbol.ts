type MajorRomanNumeralChord = 'I' | 'bII' | 'II' | 'bIII' | 'III' | 'IV' | '#IV' | 'V' | 'bVI' | 'VI' | 'bVII' | 'VII';
type MinorRomanNumeralChord = 'i' | 'bii' | 'ii' | 'biii' | 'iii' | 'iv' | '#iv' | 'v' | 'bvi' | 'vi' | 'bvii' | 'vii';
type DiminishedRomanNumeralChord = `${MinorRomanNumeralChord}dim`

export type RomanNumeralChordSymbol = MajorRomanNumeralChord | MinorRomanNumeralChord | DiminishedRomanNumeralChord;
