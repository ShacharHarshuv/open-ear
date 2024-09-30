import { ChordType } from '../chords';
import { Interval } from '../intervals/Interval';
import { ScaleDegree, isDiatonic } from '../scale-degrees';
import { RomanNumeralChord } from './RomanNumeralChord';
import { RomanNumeralChordSymbol } from './index';
import { transposeScaleDegree } from './transposeScaleDegree';

function isIntervalDiatonic(root: ScaleDegree, interval: Interval) {
  const scaleDegree = transposeScaleDegree(root, interval);
  return isDiatonic(scaleDegree);
}

export function simplifyExtensions(
  chordSymbol: RomanNumeralChordSymbol,
): RomanNumeralChordSymbol {
  const romanNumeral = new RomanNumeralChord(chordSymbol);

  const { type } = romanNumeral;

  const simplifiedType = (() => {
    if (
      type === ChordType.Major7th &&
      isIntervalDiatonic(romanNumeral.scaleDegree, Interval.MajorSeventh)
    ) {
      return ChordType.Major;
    }

    if (
      type === ChordType.Minor7th &&
      isIntervalDiatonic(romanNumeral.scaleDegree, Interval.MinorSeventh)
    ) {
      return ChordType.Minor;
    }

    if (
      type === ChordType.Major6th &&
      isIntervalDiatonic(romanNumeral.scaleDegree, Interval.MajorSixth)
    ) {
      return ChordType.Major;
    }

    if (
      type === ChordType.Dominant7th &&
      isIntervalDiatonic(romanNumeral.scaleDegree, Interval.MinorSeventh)
    ) {
      return ChordType.Major;
    }

    if (type === ChordType.Dominant9th) {
      if (isIntervalDiatonic(romanNumeral.scaleDegree, Interval.MinorSeventh)) {
        return ChordType.Major;
      } else {
        return ChordType.Dominant7th;
      }
    }

    // if (type === ChordType.Dominant13th) {
    //   return ChordType.Dominant11th;
    // }

    return type;
  })();

  return new RomanNumeralChord({
    scaleDegree: romanNumeral.scaleDegree,
    type: simplifiedType,
    bass: romanNumeral.bass,
  }).romanNumeralChordSymbol;
}
