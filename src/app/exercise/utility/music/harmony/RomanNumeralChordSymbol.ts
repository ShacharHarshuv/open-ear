type MajorRomanNumeralChordSymbol = 'I' | 'bII' | 'II' | 'bIII' | 'III' | 'IV' | '#IV' | 'V' | 'bVI' | 'VI' | 'bVII' | 'VII';
type MinorRomanNumeralChordSymbol = 'i' | 'bii' | 'ii' | 'biii' | 'iii' | 'iv' | '#iv' | 'v' | 'bvi' | 'vi' | 'bvii' | 'vii';
type DiminishedRomanNumeralChordSymbol = `${MinorRomanNumeralChordSymbol}dim`

export type RomanNumeralChordSymbol = MajorRomanNumeralChordSymbol | MinorRomanNumeralChordSymbol | DiminishedRomanNumeralChordSymbol;
