import {
  Chord,
  ChordSymbol,
  ChordType
} from './Chord';
import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/interval';
import { toNoteTypeNumber } from '../../notes/toNoteTypeNumber';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteNumber } from '../../notes/toNoteName';

describe('Chord', () => {
  const testCases: {
    chordSymbol: ChordSymbol,
    octave?: number,
    expectedResult: {
      root: NoteType,
      type: ChordType,
      intervals: Interval[],
      noteTypes: NoteType[],
      voicing: [number, Note[]][],
    }
  }[] = [
    {
      chordSymbol: 'C',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: 'M',
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['C', 'E', 'G'],
        voicing: [
          [1, ['E4', 'G4', 'C5']],
        ]
      }
    },
    {
      chordSymbol: 'F',
      expectedResult: {
        root: 'F',
        type: 'M',
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['F', 'A', 'C'],
        voicing: [
          [0, ['F3', 'A3', 'C4']],
          [1, ['A3', 'C4', 'F4']],
          [2, ['C4', 'F4', 'A4']],
        ]
      }
    },
    {
      chordSymbol: 'Bb',
      expectedResult: {
        root: 'Bb',
        type: 'M',
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['Bb', 'D', 'F'],
        voicing: [
          [0, ['Bb3', 'D4', 'F4']],
          [1, ['D4', 'F4', 'Bb4']],
          [2, ['F3', 'Bb3', 'D4']],
        ]
      }
    },
    {
      chordSymbol: 'F#',
      expectedResult: {
        root: 'F#',
        type: 'M',
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['F#', 'A#', 'C#'],
        voicing: [
          [0, ['F#3', 'A#3', 'C#4']],
          [1, ['A#3', 'C#4', 'F#4']],
          [2, ['C#4', 'F#4', 'A#4']],
        ]
      }
    },
    {
      chordSymbol: 'Fm',
      expectedResult: {
        root: 'F',
        type: 'm',
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['F', 'Ab', 'C'],
        voicing: [
          [0, ['F3', 'Ab3', 'C4']],
          [1, ['Ab3', 'C4', 'F4']],
          [2, ['C4', 'F4', 'Ab4']],
        ]
      }
    },
    {
      chordSymbol: 'Bbm',
      expectedResult: {
        root: 'Bb',
        type: 'm',
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['Bb', 'Db', 'F'],
        voicing: [
          [0, ['Bb3', 'Db4', 'F4']],
          [1, ['Db4', 'F4', 'Bb4']],
          [2, ['F3', 'Bb3', 'Db4']],
        ]
      }
    },
    {
      chordSymbol: 'F#m',
      expectedResult: {
        root: 'F#',
        type: 'm',
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['F#', 'A', 'C#'],
        voicing: [
          [0, ['F#3', 'A3', 'C#4']],
          [1, ['A3', 'C#4', 'F#4']],
          [2, ['C#4', 'F#4', 'A4']],
        ],
      }
    },
  ];

  testCases.forEach(({
                       chordSymbol,
                       octave,
                       expectedResult
                     }) => {
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

      describe('voicing', function () {
        expectedResult.voicing.forEach(([inversion, expectedVoicing]) => {
          it(`should have the voicing of ${expectedVoicing.join(', ')} in ${inversion}th inversion`, () => {
            expect(chord.getVoicing({
              topVoicesInversion: inversion,
              withBass: false,
              octave: octave,
            }).map(toNoteNumber)).toEqual(expectedVoicing.map(toNoteNumber));
          });
        })
      });
    });
  })
})
