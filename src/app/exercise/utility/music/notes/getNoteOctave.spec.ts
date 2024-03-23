import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteOctave } from './getNoteOctave';

describe('getNoteOctave', () => {
  const noteToExpectedOctave: { [note in Note]?: number } = {
    C1: 1,
    Bb3: 3,
    G9: 9,
  };

  _.forEach(noteToExpectedOctave, (expected: number, note: Note) => {
    it(note, () => {
      expect(getNoteOctave(note)).toEqual(expected);
    });
  });
});
