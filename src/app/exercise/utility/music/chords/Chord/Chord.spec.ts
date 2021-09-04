import {
  Chord,
  ChordSymbol
} from './Chord';
import { NoteType } from '../../notes/NoteType';

describe('Chord', () => {
  const testCases: [ChordSymbol, {
    root: NoteType,
    noteTypes: NoteType[],
  }][] = [
    ['F', {
      root: 'F',
      noteTypes: ['F', 'A', 'C']
    }],
    ['Bb', {
      root: 'Bb',
      noteTypes: ['Bb', 'D', 'F'],
    }],
    ['F#', {
      root: 'F#',
      noteTypes: ['F#', 'A#', 'C#'],
    }],
    ['Fm', {
      root: 'F',
      noteTypes: ['F', 'Ab', 'C'],
    }],
    ['Bbm', {
      root: 'Bb',
      noteTypes: ['Bb', 'Db', 'F'],
    }],
    ['F#m', {
      root: 'F#',
      noteTypes: ['F#', 'A', 'C#'],
    }],
  ];

  testCases.forEach(([chordSymbol, expectedResult]) => {
    describe(`${chordSymbol} chord`, () => {
      let chord: Chord;
      beforeEach(() => {
        chord = new Chord(chordSymbol);
      });

      it(`should have a root ${expectedResult.root}`, () => {
        expect(chord.root).toEqual(expectedResult.root);
      });

      // todo
      // expect(chord.noteTypes.map(noteType => toNoteNumber(noteType + '1' as Note)).sort())
      //   .toEqual(expectedResult.noteTypes.map(noteType => toNoteNumber(noteType + '1' as Note)).sort())
    });
  })
})
