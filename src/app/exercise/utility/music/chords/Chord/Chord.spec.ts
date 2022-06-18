import {
  Chord,
  Direction,
} from './Chord';
import { NoteType } from '../../notes/NoteType';
import { toNoteTypeNumber } from '../../notes/toNoteTypeNumber';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteNumber } from '../../notes/toNoteName';
import { testPureFunction } from '../../../../../shared/testing-utility/testPureFunction';
import {
  ChordType,
  chordTypeConfigMap,
} from './ChordType';
import * as _ from 'lodash';

describe('Chord', () => {
  const testCases: {
    force?: boolean;
    chordSymbolOrConfig: ConstructorParameters<typeof Chord>[0],
    octave?: number,
    expectedResult: {
      root: NoteType,
      type: ChordType,
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
      chordSymbolOrConfig: 'C9',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Dominant9th,
        noteTypes: ['C', 'E', 'G', 'Bb', 'D'],
        voicing: [
          [0, ['C4', 'E4', 'G4', 'Bb4', 'D5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'C7#9',
      octave: 5,
      expectedResult: {
        root: 'C',
        type: ChordType.Dominant7thSharp9th,
        noteTypes: ['C', 'E', 'G', 'Bb', 'D#'],
        voicing: [
          [0, ['C4', 'E4', 'G4', 'Bb4', 'D#5']],
        ],
      },
    },
    {
      chordSymbolOrConfig: 'Cmaj7',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.Major7th,
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
        voicing: [
          [0, ['A3', 'C4', 'Eb4', 'G4']],
          [1, ['C4', 'Eb4', 'G4', 'A4']],
          [2, ['Eb3', 'G3', 'A3', 'C4']],
          [3, ['G3', 'A3', 'C4', 'Eb4']],
        ],
        noteTypes: ['A', 'C', 'Eb', 'G'],
      },
    },
    {
      chordSymbolOrConfig: 'Dm6',
      octave: 4,
      expectedResult: {
        root: 'D',
        noteTypes: ['D', 'F', 'A', 'Bb'],
        voicing: [
          [0, ['D4', 'F4', 'A4', 'Bb4']],
          [1, ['F3', 'A3', 'Bb3', 'D4']],
          [2, ['A3', 'Bb3', 'D4', 'F4']],
          [3, ['Bb3', 'D4', 'F4', 'A4']],
        ],
        type: ChordType.Minor6th,
      }
    },
    {
      chordSymbolOrConfig: 'GmM7',
      octave: 4,
      expectedResult: {
        root: 'G',
        type: ChordType.MinorMajor7th,
        noteTypes: ['G', 'Bb', 'D', 'F#'],
        voicing: [
          [0, ['G3', 'Bb3', 'D4', 'F#4']],
          [1, ['Bb3', 'D4', 'F#4', 'G4']],
          [2, ['D4', 'F#4', 'G4', 'Bb4']],
          [3, ['F#3', 'G3', 'Bb3', 'D4']],
        ]
      }
    },
    {
      chordSymbolOrConfig: 'C+',
      octave: 4,
      expectedResult: {
        root: 'C',
        voicing: [
          [0, ['C4', 'E4', 'G#4']],
          [1, ['E3', 'G#3', 'C4']],
          [2, ['G#3', 'C4', 'E4']],
        ],
        type: ChordType.Augmented,
        noteTypes: ['C', 'E', 'G#'],
      }
    },
    {
      chordSymbolOrConfig: 'CmM9',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.MinorMajor9th,
        noteTypes: ['C', 'Eb', 'G', 'B', 'D'],
        voicing: [
          [0, ['C3', 'Eb3', 'G3', 'B3', 'D4']]
        ]
      }
    },
    {
      chordSymbolOrConfig: 'Cadd9',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.MajorAdd9,
        noteTypes: ['C', 'E', 'G', 'D'],
        voicing: [
          [0, ['C3', 'E3', 'G3', 'D4']]
        ]
      }
    },
    {
      chordSymbolOrConfig: 'Cmadd9',
      octave: 4,
      expectedResult: {
        root: 'C',
        type: ChordType.MinorAdd9,
        noteTypes: ['C', 'Eb', 'G', 'D'],
        voicing: [
          [0, ['C3', 'Eb3', 'G3', 'D4']]
        ]
      }
    }
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

      it(`should have the notes ${expectedResult.noteTypes.join(', ')}`, () => {
        expect(chord.noteTypes.map(noteType => toNoteTypeNumber(noteType)))
          .toEqual(expectedResult.noteTypes.map(noteType => toNoteTypeNumber(noteType)))
      });

      describe('voicing', function() {
        expectedResult.voicing.forEach(([inversion, expectedVoicing]) => {
          it(`should have the voicing of ${expectedVoicing.join(', ')} in ${inversion}th inversion`, () => {
            const voicing = chord.getVoicing({
              topVoicesInversion: inversion,
              withBass: false,
              octave: octave,
            });
            expect(voicing.map(toNoteNumber)).toEqual(expectedVoicing.map(toNoteNumber));
          });
        })
      });
    });
  });

  it('should cover all chord types', () => {
    const existingChordTypes: ChordType[] = _.keys(chordTypeConfigMap) as (keyof typeof chordTypeConfigMap)[];
    const coveredChordTypes: ChordType[] = _.chain(testCases).map(testCase => testCase.expectedResult.type).uniq().value();
    const missingChordTypes: ChordType[] = _.difference(existingChordTypes, coveredChordTypes);
    expect(missingChordTypes).toEqual([]);
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
