import { isEqual, last } from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { keys } from '../../../../shared/ts-utility/keys';
import { Chord, ChordType } from '../chords';
import { chordTypeConfigMap } from '../chords/Chord/ChordType';
import { getInterval } from '../intervals/getInterval';
import { getNoteType } from '../notes/getNoteType';
import { RomanNumeralChord } from './RomanNumeralChord';
import { RomanNumeralChordSymbol } from './index';

export function simplifyExtensions(
  chordSymbol: RomanNumeralChordSymbol,
): RomanNumeralChordSymbol {
  const romanNumeral = new RomanNumeralChord(chordSymbol);

  const typeConfig = chordTypeConfigMap[romanNumeral.type];

  const includesTriad = (() => {
    const triadScaleDegrees = typeConfig.scaleDegreeList.slice(0, 2);
    const triads = [
      chordTypeConfigMap[ChordType.Major],
      chordTypeConfigMap[ChordType.Minor],
      chordTypeConfigMap[ChordType.Diminished],
      chordTypeConfigMap[ChordType.Sharp5],
    ];
    return triads.some(({ scaleDegreeList }) =>
      isEqual(scaleDegreeList, triadScaleDegrees),
    );
  })();

  if (!includesTriad) {
    return chordSymbol; // not simplifying for more complex tensions
  }

  const simplifiedType = (() => {
    const chordInC = romanNumeral.getChord('C');
    const notes = chordInC.getVoicing({
      position: 0,
      withBass: false,
    });
    const simplifiedNotes = [...notes];
    function isDiatonic(note: Note) {
      return ['C', 'D', 'E', 'F', 'G', 'A', 'B'].includes(getNoteType(note));
    }
    while (simplifiedNotes.length > 3 && isDiatonic(last(simplifiedNotes)!)) {
      simplifiedNotes.pop();
    }

    if (simplifiedNotes.length === notes.length) {
      return romanNumeral.type;
    }

    const simplifiedIntervals = simplifiedNotes.map((note) =>
      getInterval(simplifiedNotes[0], note),
    );

    const type = keys(chordTypeConfigMap).find((type: ChordType) => {
      const candidateTypeIntervals = new Chord({
        root: 'C', // doesn't matter
        type: type,
      }).intervals;
      return isEqual(candidateTypeIntervals, simplifiedIntervals);
    });

    if (!type) {
      throw new Error(`Could not simplify chord ${chordSymbol}`);
    }

    return type;
  })();

  return new RomanNumeralChord({
    scaleDegree: romanNumeral.scaleDegree,
    type: simplifiedType,
    bass: romanNumeral.bass,
  }).romanNumeralChordSymbol;
}
