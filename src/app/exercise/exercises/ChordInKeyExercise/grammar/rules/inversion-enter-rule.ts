import {
  Interval,
  RomanNumeralChordSymbol,
  ScaleDegree,
  scaleDegreeToChromaticDegree,
  transposeScaleDegree,
} from '../../../../utility';
import { Rule } from '../../../../utility/grammer';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';

function isFirstInversionTriad(chord: RomanNumeralChord) {
  if (chord.intervals().length !== 3) {
    return false;
  }

  const third = chord.intervals()[1];

  if (third !== Interval.MajorThird && third !== Interval.MinorThird) {
    return false;
  }

  if (chord.bass !== transposeScaleDegree(chord.scaleDegree, third)) {
    return false;
  }

  return true;
}

function isStep(scaleDegree1: ScaleDegree, scaleDegree2: ScaleDegree) {
  return (
    Math.abs(
      scaleDegreeToChromaticDegree[scaleDegree1] -
        scaleDegreeToChromaticDegree[scaleDegree2],
    ) <= 2
  );
}

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
      return isStep(prevChord.bass, nextChord.bass);
    } else {
      return isStep(prevChord.bass, nextChord.bass);
    }
  };
};
