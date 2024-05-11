import { Interval, transposeScaleDegree } from '../../../../utility';
import { RomanNumeralChord } from '../../../../utility/music/harmony/RomanNumeralChord';

export function isFirstInversionTriad(chord: RomanNumeralChord) {
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
