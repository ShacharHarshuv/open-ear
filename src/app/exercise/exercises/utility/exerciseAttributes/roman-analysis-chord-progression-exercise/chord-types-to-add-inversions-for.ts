import { ChordType } from '../../../../utility/music/chords';

function generateChordTypesWithInversions(
  chords: (ChordType | [ChordType, number])[],
) {
  return chords.map((maybeChordType) => {
    if (typeof maybeChordType === 'string') {
      return {
        type: maybeChordType,
      };
    } else {
      return {
        type: maybeChordType[0],
        numberOfInversions: maybeChordType[1],
      };
    }
  });
}

export const chordTypesToAddInversionsFor = generateChordTypesWithInversions([
  ChordType.Major,
  [ChordType.MajorAdd9, 2],
  ChordType.Major7th,
  ChordType.Minor,
  ChordType.Minor7th,
  ChordType.Dominant7th,
  ChordType.Diminished,
  ChordType.HalfDiminished7th,
]);
