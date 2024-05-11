import { RomanNumeralChordSymbol } from '../../../../utility';
import { Rule, acceptAll } from '../../../../utility/grammer';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';
import { isFirstInversionTriad } from '../utilities/is-first-inversion-triad';
import { isStepOrUnison } from '../utilities/is-step-or-unison';

export const inversionExitRule: Rule<RomanNumeralChordSymbol> = (prev) => {
  const prevChord = new RomanNumeralChord(prev);
  if (!prevChord.isInversion) {
    return acceptAll;
  }

  return (next) => {
    const nextChord = new RomanNumeralChord(next);

    return (
      (!nextChord.isInversion ||
        (isFirstInversionTriad(prevChord) &&
          isFirstInversionTriad(nextChord))) &&
      isStepOrUnison(prevChord.bass, nextChord.bass)
    );
  };
};
