import {
  Chord,
  ChordType,
  Direction,
} from './Chord';
import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/Interval';
import { toNoteTypeNumber } from '../../notes/toNoteTypeNumber';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteNumber } from '../../notes/toNoteName';
import { testPureFunction } from '../../../../../shared/testing-utility/testPureFunction';

describe('Chord', () => {
  const testCases: {
    force?: boolean;
    chordSymbolOrConfig: ConstructorParameters<typeof Chord>[0],
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
      chordSymbolOrConfig: 'C',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Major,
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['C', 'E', 'G'],
        voicing: [
          [1, ['E4', 'G4', 'C5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'F',
      expectedResult: {
        root: 'F',
        type: ChordType.Major,
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['F', 'A', 'C'],
        voicing: [
          [0, ['F3', 'A3', 'C4']],
          [1, ['A3', 'C4', 'F4']],
          [2, ['C4', 'F4', 'A4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Bb',
      expectedResult: {
        root: 'Bb',
        type: ChordType.Major,
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['Bb', 'D', 'F'],
        voicing: [
          [0, ['Bb3', 'D4', 'F4']],
          [1, ['D4', 'F4', 'Bb4']],
          [2, ['F3', 'Bb3', 'D4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'F#',
      expectedResult: {
        root: 'F#',
        type: ChordType.Major,
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['F#', 'A#', 'C#'],
        voicing: [
          [0, ['F#3', 'A#3', 'C#4']],
          [1, ['A#3', 'C#4', 'F#4']],
          [2, ['C#4', 'F#4', 'A#4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Fm',
      expectedResult: {
        root: 'F',
        type: ChordType.Minor,
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['F', 'Ab', 'C'],
        voicing: [
          [0, ['F3', 'Ab3', 'C4']],
          [1, ['Ab3', 'C4', 'F4']],
          [2, ['C4', 'F4', 'Ab4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Bbm',
      expectedResult: {
        root: 'Bb',
        type: ChordType.Minor,
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['Bb', 'Db', 'F'],
        voicing: [
          [0, ['Bb3', 'Db4', 'F4']],
          [1, ['Db4', 'F4', 'Bb4']],
          [2, ['F3', 'Bb3', 'Db4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'F#m',
      expectedResult: {
        root: 'F#',
        type: ChordType.Minor,
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['F#', 'A', 'C#'],
        voicing: [
          [0, ['F#3', 'A3', 'C#4']],
          [1, ['A3', 'C#4', 'F#4']],
          [2, ['C#4', 'F#4', 'A4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Bdim',
      expectedResult: {
        root: 'B',
        type: ChordType.Diminished,
        intervals: [Interval.Prima, Interval.MinorThird, Interval.DiminishedFifth],
        noteTypes: ['B', 'D', 'F'],
        voicing: [
          [0, ['B3', 'D4', 'F4']],
          [1, ['D4', 'F4', 'B4']],
          [2, ['F3', 'B3', 'D4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: {
        root: 'C',
        type: ChordType.Major,
      },
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Major,
        intervals: [Interval.Prima, Interval.MajorThird, Interval.PerfectFifth],
        noteTypes: ['C', 'E', 'G'],
        voicing: [
          [1, ['E4', 'G4', 'C5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: {
        root: 'F#',
        type: ChordType.Minor,
      },
      expectedResult: {
        root: 'F#',
        type: ChordType.Minor,
        intervals: [Interval.Prima, Interval.MinorThird, Interval.PerfectFifth],
        noteTypes: ['F#', 'A', 'C#'],
        voicing: [
          [0, ['F#3', 'A3', 'C#4']],
          [1, ['A3', 'C#4', 'F#4']],
          [2, ['C#4', 'F#4', 'A4']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'C7',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.Dominant7th,
        intervals: [
          Interval.Prima,
          Interval.MajorThird,
          Interval.PerfectFifth,
          Interval.MinorSeventh,
        ],
        voicing: [
          [0, ['C4', 'E4', 'G4', 'Bb4']],
          [1, ['E3', 'G3', 'Bb3', 'C4']],
          [2, ['G3', 'Bb3', 'C4', 'E4']],
          [3, ['Bb3', 'C4', 'E4', 'G4']],
        ],
        noteTypes: ['C', 'E', 'G', 'Bb'],
      },
    },
    {
      chordSymbolOrConfig: 'Cmaj7',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.Major7th,
        intervals: [
          Interval.Prima,
          Interval.MajorThird,
          Interval.PerfectFifth,
          Interval.MajorSeventh,
        ],
        voicing: [
          [0, ['C4', 'E4', 'G4', 'B4']],
          [1, ['E3', 'G3', 'B3', 'C4']],
          [2, ['G3', 'B3', 'C4', 'E4']],
          [3, ['B3', 'C4', 'E4', 'G4']],
        ],
        noteTypes: ['C', 'E', 'G', 'B'],
      },
    },
    {
      chordSymbolOrConfig: 'Am7',
      octave: 4,
      expectedResult: {
        root: 'A',
        type: ChordType.Minor7th,
        intervals: [
          Interval.Prima,
          Interval.MinorThird,
          Interval.PerfectFifth,
          Interval.MinorSeventh,
        ],
        voicing: [
          [0, ['A3', 'C4', 'E4', 'G4']],
          [1, ['C4', 'E4', 'G4', 'A4']],
          [2, ['E3', 'G3', 'A3', 'C4']],
          [3, ['G3', 'A3', 'C4', 'E4']],
        ],
        noteTypes: ['A', 'C', 'E', 'G'],
      },
    },
    {
      chordSymbolOrConfig: 'Csus',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Sus4,
        intervals: [Interval.Prima, Interval.PerfectFourth, Interval.PerfectFifth],
        noteTypes: ['C', 'F', 'G'],
        voicing: [
          [0, ['C5', 'F5', 'G5']],
          [1, ['F4', 'G4', 'C5']],
          [2, ['G4', 'C5', 'F5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Csus2',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Sus2,
        intervals: [Interval.Prima, Interval.MajorSecond, Interval.PerfectFifth],
        noteTypes: ['C', 'D', 'G'],
        voicing: [
          [0, ['C5', 'D5', 'G5']],
          [1, ['D4', 'G4', 'C5']],
          [2, ['G4', 'C5', 'D5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'C6',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.Major6th,
        intervals: [
          Interval.Prima,
          Interval.MajorThird,
          Interval.PerfectFifth,
          Interval.MajorSixth,
        ],
        voicing: [
          [0, ['C4', 'E4', 'G4', 'A4']],
          [1, ['E3', 'G3', 'A3', 'C4']],
          [2, ['G3', 'A3', 'C4', 'E4']],
          [3, ['A3', 'C4', 'E4', 'G4']],
        ],
        noteTypes: ['C', 'E', 'G', 'A'],
      },
    },
    {
      chordSymbolOrConfig: 'Adim7',
      octave: 4,
      expectedResult: {
        root: 'A',
        type: ChordType.Diminished7th,
        intervals: [
          Interval.Prima,
          Interval.MinorThird,
          Interval.DiminishedFifth,
          Interval.DiminishedSeventh,
        ],
        voicing: [
          [0, ['A3', 'C4', 'Eb4', 'F#4']],
          [1, ['C4', 'Eb4', 'F#4', 'A4']],
          [2, ['Eb3', 'F#3', 'A3', 'C4']],
          [3, ['F#3', 'A3', 'C4', 'Eb4']],
        ],
        noteTypes: ['A', 'C', 'Eb', 'F#'],
      },
    },
    {
      chordSymbolOrConfig: 'A7b5',
      octave: 4,
      expectedResult: {
        root: 'A',
        type: ChordType.HalfDiminished7th,
        intervals: [
          Interval.Prima,
          Interval.MinorThird,
          Interval.DiminishedFifth,
          Interval.MinorSeventh,
        ],
        voicing: [
          [0, ['A3', 'C4', 'Eb4', 'G4']],
          [1, ['C4', 'Eb4', 'G4', 'A4']],
          [2, ['Eb3', 'G3', 'A3', 'C4']],
          [3, ['G3', 'A3', 'C4', 'Eb4']],
        ],
        noteTypes: ['A', 'C', 'Eb', 'G'],
      },
    },
  ];

  testCases.forEach(({
    force,
    chordSymbolOrConfig,
    octave,
    expectedResult,
  }) => {
    (force ? fdescribe : describe)(`${chordSymbolOrConfig} chord`, () => {
      let chord: Chord;
      beforeAll(() => {
        chord = new Chord(chordSymbolOrConfig);
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

      describe('voicing', function() {
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
  });

  describe('invertVoicing', () => {
    testPureFunction<typeof Chord.invertVoicing>(Chord.invertVoicing, [
      {
        args: [['C4', 'E4', 'G4'], Direction.Up],
        returnValue: ['E4', 'G4', 'C5'],
      },
      {
        args: [['C4', 'E4', 'G4'], Direction.Down],
        returnValue: ['G3', 'C4', 'E4'],
      },
    ])
  });
})
