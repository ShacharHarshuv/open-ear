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

function getSimplifiedType(chord: RomanNumeralChord): ChordType {
  const { type } = chord;
  if (
    type === ChordType.Major7th &&
    isIntervalDiatonic(chord.scaleDegree, Interval.MajorSeventh)
  ) {
    return ChordType.Major;
  }

  if (
    type === ChordType.Minor7th &&
    isIntervalDiatonic(chord.scaleDegree, Interval.MinorSeventh)
  ) {
    return ChordType.Minor;
  }

  if (
    type === ChordType.Major6th &&
    isIntervalDiatonic(chord.scaleDegree, Interval.MajorSixth)
  ) {
    return ChordType.Major;
  }

  if (
    type === ChordType.Dominant7th &&
    isIntervalDiatonic(chord.scaleDegree, Interval.MinorSeventh)
  ) {
    return ChordType.Major;
  }

  if (type === ChordType.Dominant9th) {
    if (isIntervalDiatonic(chord.scaleDegree, Interval.MinorSeventh)) {
      return ChordType.Major;
    } else {
      return ChordType.Dominant7th;
    }
  }

  // if (type === ChordType.Sharp5) {
  //   return ChordType.Major;
  // }

  if (type === ChordType.Dominant7thSharp5th) {
    return getSimplifiedType(
      new RomanNumeralChord({
        scaleDegree: chord.scaleDegree,
        bass: chord.bass,
        type: ChordType.Dominant7th,
      }),
    );
  }

  // if (type === ChordType.Dominant13th) {
  //   return ChordType.Dominant11th;
  // }

  return type;
}

export function simplifyExtensions(
  chord: RomanNumeralChordSymbol | RomanNumeralChord,
): RomanNumeralChordSymbol {
  if (typeof chord === 'string') {
    return simplifyExtensions(new RomanNumeralChord(chord));
  }

  return new RomanNumeralChord({
    scaleDegree: chord.scaleDegree,
    type: getSimplifiedType(chord),
    bass: chord.bass,
  }).romanNumeralChordSymbol;
}
