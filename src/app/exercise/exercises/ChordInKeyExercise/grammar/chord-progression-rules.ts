import { RomanNumeralChordSymbol } from '../../../utility';
import { Rule, noRepeatsRule } from '../../../utility/grammer';
import { dominantResolutionRule } from './rules/dominant-resolution-rule';
import { inversionEnterRule } from './rules/inversion-enter-rule';

export const chordProgressionRules: Rule<RomanNumeralChordSymbol>[] = [
  noRepeatsRule,
  dominantResolutionRule,
  inversionEnterRule,
];
