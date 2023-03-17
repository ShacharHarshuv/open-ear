import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import { Chord } from '../chords';
import { RomanNumeralChord } from './RomanNumeralChord';

export function romanNumeralToChordInC(
  romanNumeralSymbol: RomanNumeralChordSymbol
): Chord {
  return new RomanNumeralChord(romanNumeralSymbol).getChord('C');
}
