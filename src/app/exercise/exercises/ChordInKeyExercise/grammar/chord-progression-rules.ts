import {
  Rule,
  noRepeatsRule,
  acceptOnly,
  acceptAll,
} from '../../../utility/grammer';
import { RomanNumeralChordSymbol } from '../../../utility';
import { RomanNumeralChord } from '../../../utility/music/harmony/RomanNumeralChord';
import { dominantResolutionRule } from './rules/dominant-resolution-rule';

export const chordProgressionRules: Rule<RomanNumeralChordSymbol>[] = [
  noRepeatsRule,
  dominantResolutionRule,
]
