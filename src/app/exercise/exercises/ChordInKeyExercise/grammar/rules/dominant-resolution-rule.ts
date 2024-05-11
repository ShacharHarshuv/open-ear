import {
  Interval,
  RomanNumeralChordSymbol,
  isDiatonic,
  transposeScaleDegree,
} from '../../../../utility';
import { Rule, acceptAll } from '../../../../utility/grammer';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';

function isDominant(chord: RomanNumeralChord) {
  if (!chord.intervals().includes(Interval.MajorThird)) {
    return false;
  }

  const root = chord.scaleDegree;
  const third = transposeScaleDegree(root, Interval.MajorThird);

  return !isDiatonic(third);
}

export const dominantResolutionRule: Rule<RomanNumeralChordSymbol> = (prev) => {
  const prevChord = new RomanNumeralChord(prev);
  if (!isDominant(prevChord)) {
    return acceptAll;
  }

  return (next) => {
    const nextChord = new RomanNumeralChord(next);

    const resolutionDegree = transposeScaleDegree(
      prevChord.scaleDegree,
      Interval.PerfectFourth,
    );

    return (
      (nextChord.scaleDegree === resolutionDegree && !nextChord.isInversion) ||
      // deceptive resolution
      (nextChord.scaleDegrees()[1] === resolutionDegree &&
        !nextChord.isInversion) ||
      (nextChord.scaleDegree === prevChord.scaleDegree && isDominant(nextChord)) // prolongation
    );
  };
};
