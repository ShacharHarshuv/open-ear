import {
  Chord,
  ChordSymbol,
  ChordType
} from './Chord';
import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/interval';
import { toNoteTypeNumber } from '../../notes/toNoteTypeNumber';

describe('Chord', () => {
  const testCases: [ChordSymbol, {
    root: NoteType,
    type: ChordType,
    intervals: Interval[],
    noteTypes: NoteType[],
  }][] = [
    ['F', {
      root: 'F',
      type: 'M',
      intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
      noteTypes: ['F', 'A', 'C']
    }],
    ['Bb', {
      root: 'Bb',
      type: 'M',
      intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
      noteTypes: ['Bb', 'D', 'F'],
    }],
    ['F#', {
      root: 'F#',
      type: 'M',
      intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
      noteTypes: ['F#', 'A#', 'C#'],
    }],
    ['Fm', {
      root: 'F',
      type: 'm',
      intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
      noteTypes: ['F', 'Ab', 'C'],
    }],
    ['Bbm', {
      root: 'Bb',
      type: 'm',
      intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
      noteTypes: ['Bb', 'Db', 'F'],
    }],
    ['F#m', {
      root: 'F#',
      type: 'm',
      intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
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
      });

      it(`should have intervals of ${expectedResult.intervals.join(', ')}`, () => {
        expect(chord.intervals).toEqual(expectedResult.intervals);
      });

      it(`should have the notes ${expectedResult.noteTypes.join(', ')}`, () => {
        expect(chord.noteTypes.map(noteType => toNoteTypeNumber(noteType)))
          .toEqual(expectedResult.noteTypes.map(noteType => toNoteTypeNumber(noteType)))
      });
    });
  })
})
