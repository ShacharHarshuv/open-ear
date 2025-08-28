import { isEqual } from 'lodash';
import { ChordType } from 'src/app/exercise/utility/music/chords';
import { RomanNumeralChord } from 'src/app/exercise/utility/music/harmony/RomanNumeralChord';
import { RomanNumeralChordSymbol } from 'src/app/exercise/utility/music/harmony/RomanNumeralChordSymbol';
import { Interval } from '../intervals/Interval';
import {
  EnharmonicScaleDegree,
  isDiatonic,
  scaleDegreeToChromaticDegree,
  transposeScaleDegree,
} from '../scale-degrees';

export interface AcceptableChordAnalysisOptions {
  ignoreExtensions?: 'always' | 'when-equivalent' | false;
  ignoreSharp5?: boolean;
  ignoreSuspensions?: boolean;
}

function changeType(chord: RomanNumeralChord, type: ChordType) {
  return new RomanNumeralChord({
    scaleDegree: chord.scaleDegree,
    bass: chord.bass,
    type,
  });
}

function _isAcceptableChordAnalysis(
  actual: RomanNumeralChord,
  candidate: RomanNumeralChord,
  options?: AcceptableChordAnalysisOptions,
) {
  if (actual.bass !== candidate.bass) {
    return false;
  }

  // actual equivalency
  function getDegreesWithout5th(chord: RomanNumeralChord) {
    return chord
      .scaleDegrees()
      .sort()
      .filter(
        (d) =>
          getIntervalBetweenScaleDegrees(actual.bass, d) !==
          Interval.PerfectFifth,
      );
  }

  if (isEqual(getDegreesWithout5th(actual), getDegreesWithout5th(candidate))) {
    return true;
  }

  function acceptAsIf(newType: ChordType) {
    return _isAcceptableChordAnalysis(
      changeType(actual, newType),
      candidate,
      options,
    );
  }

  if (options?.ignoreExtensions) {
    // vi7 <> I6 equivalency: (relevant only if pass is the same)
    if (
      actual.type === ChordType.Minor7th &&
      !candidate.isLowercase && // prevents infinite recurssion
      _isAcceptableChordAnalysis(
        new RomanNumeralChord({
          scaleDegree: transposeScaleDegree(
            actual.scaleDegree,
            Interval.MinorThird,
          ), // vi7 -> I6
          bass: actual.bass,
          type: ChordType.Major6th,
        }),
        candidate,
        options,
      )
    ) {
      return true;
    }

    if (
      actual.type === ChordType.Major6th &&
      candidate.isLowercase &&
      _isAcceptableChordAnalysis(
        new RomanNumeralChord({
          scaleDegree: transposeScaleDegree(
            actual.scaleDegree,
            -Interval.MinorThird,
          ), // vi7 -> I6
          bass: actual.bass,
          type: ChordType.Minor7th,
        }),
        candidate,
        options,
      )
    ) {
      return true;
    }

    switch (actual.type) {
      case ChordType.Dominant7th:
        if (
          options.ignoreExtensions === 'always' ||
          isDiatonic(
            transposeScaleDegree(actual.scaleDegree, Interval.MinorSeventh),
          )
        ) {
          return acceptAsIf(ChordType.Major);
        }
        break;

      case ChordType.Minor7th:
      case ChordType.Minor9th:
        return acceptAsIf(ChordType.Minor);

      case ChordType.Major7th:
      case ChordType.Major9th:
      case ChordType.Major6th:
      case ChordType.MajorAdd9:
      case ChordType.MajorAddSharp4:
        return acceptAsIf(ChordType.Major);

      case ChordType.Diminished7th:
      case ChordType.HalfDiminished7th:
        return acceptAsIf(ChordType.Diminished);

      case ChordType.Dominant7thSharp9th:
        return acceptAsIf(ChordType.Dominant7th);

      case ChordType.Dominant9th:
        return acceptAsIf(ChordType.Dominant7th);

      case ChordType.Dominant11th:
        return acceptAsIf(ChordType.Dominant7th);

      case ChordType.MinorAdd9:
        return acceptAsIf(ChordType.Minor);

      case ChordType.MinorMajor9th:
        return acceptAsIf(ChordType.MinorMajor7th);
    }
  }

  if (options?.ignoreSharp5) {
    if (actual.type === ChordType.Sharp5) {
      return acceptAsIf(ChordType.Major);
    }
    if (actual.type === ChordType.Dominant7thSharp5th) {
      return acceptAsIf(ChordType.Dominant7th);
    }

    // minor sharp5 is not easily simplified to minor triad, so we won't address this
  }

  if (options?.ignoreSuspensions) {
    if (actual.type === ChordType.Sus2) {
      return acceptAsIf(ChordType.Major) || acceptAsIf(ChordType.Minor);
    }
    if (actual.type === ChordType.Sus4) {
      return acceptAsIf(ChordType.Major) || acceptAsIf(ChordType.Minor);
    }
  }

  return false;
}

// Note: the simplification only goes one way - if the actual chord is V7, then V is valid but V9 is not
export function isAcceptableChordAnalysis(
  actual: RomanNumeralChordSymbol,
  candidate: RomanNumeralChordSymbol,
  options?: AcceptableChordAnalysisOptions,
) {
  if (actual === candidate) {
    return true;
  }

  return _isAcceptableChordAnalysis(
    new RomanNumeralChord(actual),
    new RomanNumeralChord(candidate),
    options,
  );
}

function getIntervalBetweenScaleDegrees(
  bass: EnharmonicScaleDegree,
  voice: EnharmonicScaleDegree,
) {
  let bassChromaticDegree = scaleDegreeToChromaticDegree[bass];
  const voiceChromaticDegree = scaleDegreeToChromaticDegree[voice];
  if (bassChromaticDegree > voiceChromaticDegree) {
    bassChromaticDegree -= 12;
  }

  return voiceChromaticDegree - bassChromaticDegree;
}

export function getSimplestAcceptableChordAnalysis(
  original: RomanNumeralChordSymbol,
  options?: AcceptableChordAnalysisOptions,
): RomanNumeralChordSymbol {
  const originalChord = new RomanNumeralChord(original);

  // Try the basic triad types in order of simplicity
  const basicTypes = [ChordType.Major, ChordType.Minor, ChordType.Diminished];

  for (const type of basicTypes) {
    const simplifiedChord = new RomanNumeralChord({
      scaleDegree: originalChord.scaleDegree,
      bass: originalChord.bass,
      type,
    });

    if (
      isAcceptableChordAnalysis(
        original,
        simplifiedChord.romanNumeralChordSymbol,
        options,
      )
    ) {
      return simplifiedChord.romanNumeralChordSymbol;
    }
  }

  // If no basic triad works, return the original
  return original;
}
