import { isEqual, last } from 'lodash';
import { ChordType } from 'src/app/exercise/utility/music/chords';
import { RomanNumeralChord } from 'src/app/exercise/utility/music/harmony/RomanNumeralChord';
import { RomanNumeralChordSymbol } from 'src/app/exercise/utility/music/harmony/RomanNumeralChordSymbol';
import { Interval } from '../intervals/Interval';
import { isDiatonic, transposeScaleDegree } from '../scale-degrees';

interface Options {
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
  options?: Options,
) {
  if (
    actual.bass === candidate.bass &&
    isEqual(actual.scaleDegrees().sort(), candidate.scaleDegrees().sort())
  ) {
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
    switch (actual.type) {
      case ChordType.Dominant7th:
        if (
          options.ignoreExtensions === 'always' ||
          isDiatonic(transposeScaleDegree(actual.bass, Interval.MinorSeventh))
        ) {
          return acceptAsIf(ChordType.Major);
        }
        break;

      case ChordType.Major7th:
        if (
          options.ignoreExtensions === 'always' ||
          (isDiatonic(actual.bass) && isDiatonic(last(actual.scaleDegrees())!))
        ) {
          return acceptAsIf(ChordType.Major);
        }
        break;

      case ChordType.Minor7th:
      case ChordType.Minor9th:
        return acceptAsIf(ChordType.Minor);

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
      return acceptAsIf(ChordType.Major) /*  || simplify(ChordType.Minor) */; // TODO: consider how to address suspensions to minor if we ever need it (right now all suspensions in song samples are to major)
    }
    if (actual.type === ChordType.Sus4) {
      return acceptAsIf(ChordType.Major) /*  || simplify(ChordType.Minor) */;
    }
  }

  return false;
}

// Note: the simplification only goes one way - if the actual chord is V7, then V is valid but V9 is not
export function isAcceptableChordAnalysis(
  actual: RomanNumeralChordSymbol,
  candidate: RomanNumeralChordSymbol,
  options?: Options,
) {
  console.log('isAcceptableChordAnalysis', actual, candidate, options);
  if (actual === candidate) {
    return true;
  }

  return _isAcceptableChordAnalysis(
    new RomanNumeralChord(actual),
    new RomanNumeralChord(candidate),
    options,
  );
}
