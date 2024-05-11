import {
  RomanNumeralChordSymbol,
  Interval,
  scaleDegreeToChromaticDegree,
  chromaticDegreeToScaleDegree,
  transposeScaleDegree,
  isDiatonic,
} from '../../../../utility';
import {
  Rule,
  acceptAll,
} from '../../../../utility/grammer';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';
import { transpose } from '../../../../utility/music/transpose';

function isDominant(chord: RomanNumeralChord) {
  if (!chord.intervals().includes(Interval.MajorThird)) {
    return;
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
    if (nextChord.isInversion) {
      return false;
    }

    // todo: allow for more kinds of resolutions.
    return nextChord.scaleDegree === transposeScaleDegree(prevChord.scaleDegree, Interval.PerfectFourth);
  }
}
