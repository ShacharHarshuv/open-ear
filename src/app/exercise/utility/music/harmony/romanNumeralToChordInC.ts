import { Chord } from '../chords';
import { RomanNumeralChord } from './RomanNumeralChord';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';

export function romanNumeralToChordInC(
  romanNumeralSymbol: RomanNumeralChordSymbol,
): Chord {
  return new RomanNumeralChord(romanNumeralSymbol).getChord('C');
}
