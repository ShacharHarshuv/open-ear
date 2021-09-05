import {
  Chord,
  ChordSymbol,
  ChordType
} from './Chord';
import { NoteType } from '../../notes/NoteType';

describe('Chord', () => {
  const testCases: [ChordSymbol, {
    root: NoteType,
    type: ChordType,
    noteTypes: NoteType[],
  }][] = [
    ['F', {
      root: 'F',
      type: 'M',
      noteTypes: ['F', 'A', 'C']
    }],
    ['Bb', {
      root: 'Bb',
      type: 'M',
      noteTypes: ['Bb', 'D', 'F'],
    }],
    ['F#', {
      root: 'F#',
      type: 'M',
      noteTypes: ['F#', 'A#', 'C#'],
    }],
    ['Fm', {
      root: 'F',
      type: 'm',
      noteTypes: ['F', 'Ab', 'C'],
    }],
    ['Bbm', {
      root: 'Bb',
      type: 'm',
      noteTypes: ['Bb', 'Db', 'F'],
    }],
    ['F#m', {
      root: 'F#',
      type: 'm',
      noteTypes: ['F#', 'A', 'C#'],
    }],
  ];

  testCases.forEach(([chordSymbol, expectedResult]) => {
    describe(`${chordSymbol} chord`, () => {
      let chord: Chord;
      beforeAll(() => {
        chord = new Chord(chordSymbol);
      });

      it(`should have a root ${expectedResult.root}`, () => {
        expect(chord.root).toEqual(expectedResult.root);
      });

      it(`should be a ${expectedResult.type} chord`, () => {
        expect(chord.type).toEqual(expectedResult.type);
      })

      // todo
      // expect(chord.noteTypes.map(noteType => toNoteNumber(noteType + '1' as Note)).sort())
      //   .toEqual(expectedResult.noteTypes.map(noteType => toNoteNumber(noteType + '1' as Note)).sort())
    });
  })
})
