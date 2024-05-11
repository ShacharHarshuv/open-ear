import { RomanNumeralChordSymbol } from '../../../../utility';
import { Rule } from '../../../../utility/grammer';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';
import { isFirstInversionTriad } from '../utilities/is-first-inversion-triad';
import { isStepOrUnison } from '../utilities/is-step-or-unison';

export const inversionEnterRule: Rule<RomanNumeralChordSymbol> = (prev) => {
  const prevChord = new RomanNumeralChord(prev);

  return (next) => {
    const nextChord = new RomanNumeralChord(next);

    if (!nextChord.isInversion) {
      return true;
    }

    if (next.split('/')[0] === prev.split('/')[0]) {
      return true;
    }

    if (prevChord.isInversion) {
      if (
        !isFirstInversionTriad(prevChord) ||
        !isFirstInversionTriad(nextChord)
      ) {
        return false;
      }

      // todo: check if the bass is a step apart.
      return isStepOrUnison(prevChord.bass, nextChord.bass);
    } else {
      return isStepOrUnison(prevChord.bass, nextChord.bass); // will also allow for a stationary bass motion
    }
  };
};
