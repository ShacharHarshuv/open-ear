import {
  RomanNumeralChord,
  Accidental,
} from './RomanNumeralChord';
import {
  ChordType,
  ChordSymbol,
} from '../chords';
import {
  DiatonicScaleDegree,
  ScaleDegree,
} from './ScaleDegrees';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import {
  toRelativeMode,
  Mode,
} from './Mode';
import { Key } from '../keys/Key';

describe('RomanNumeralBuilder', () => {
  const testCases: {
    force?: boolean; // for debugging purposes only
    inputs: ConstructorParameters<typeof RomanNumeralChord>[],
    romanNumeralChordSymbol: RomanNumeralChordSymbol,
    diatonicDegree: DiatonicScaleDegree,
    scaleDegree: ScaleDegree,
    accidental?: Accidental,
    type: ChordType,
    serialized: string,
    getChord: Partial<Record<Key, ChordSymbol>>
  }[] = [
    {
      inputs: [['I'], [{
        scaleDegree: '1',
        type: ChordType.Major,
      }]],
      romanNumeralChordSymbol: 'I',
      diatonicDegree: 1,
      scaleDegree: '1',
      type: ChordType.Major,
      serialized: 'I',
      getChord: {
        C: 'C',
        'A#': 'A#',
      },
    },
    {
      inputs: [['ii'], [{
        scaleDegree: '2',
        type: ChordType.Minor,
      }]],
      romanNumeralChordSymbol: 'ii',
      diatonicDegree: 2,
      scaleDegree: '2',
      type: ChordType.Minor,
      serialized: 'ii',
      getChord: {
        C: 'Dm',
      },
    },
    {
      inputs: [['bIII'], [{
        scaleDegree: 'b3',
        type: ChordType.Major,
      }]],
      romanNumeralChordSymbol: 'bIII',
      diatonicDegree: 3,
      scaleDegree: 'b3',
      accidental: Accidental.Flat,
      type: ChordType.Major,
      serialized: '♭III',
      getChord: {
        C: 'Eb',
      },
    },
    {
      inputs: [['#ivdim'], [{
        scaleDegree: '#4',
        type: ChordType.Diminished,
      }]],
      romanNumeralChordSymbol: '#ivdim',
      diatonicDegree: 4,
      scaleDegree: '#4',
      accidental: Accidental.Sharp,
      type: ChordType.Diminished,
      serialized: '♯iv°',
      getChord: {
        G: 'C#dim',
      },
    },
    {
      inputs: [['viidim'], [{
        scaleDegree: '7',
        type: ChordType.Diminished,
      }]],
      romanNumeralChordSymbol: 'viidim',
      diatonicDegree: 7,
      scaleDegree: '7',
      type: ChordType.Diminished,
      serialized: 'vii°',
      getChord: {
        'Eb': 'Ddim',
      },
    },
    {
      inputs: [['V7'], [{
        scaleDegree: '5',
        type: ChordType.Dominant7th,
      }]],
      romanNumeralChordSymbol: 'V7',
      type: ChordType.Dominant7th,
      scaleDegree: '5',
      getChord: {
        C: 'G7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'V⁷',
    },
    {
      inputs: [['IVmaj7'], [{
        scaleDegree: '4',
        type: ChordType.Major7th,
      }]],
      romanNumeralChordSymbol: 'IVmaj7',
      type: ChordType.Major7th,
      scaleDegree: '4',
      getChord: {
        C: 'Fmaj7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 4,
      serialized: 'IVmaj⁷',
    },
    {
      inputs: [['ii7'], [{
        scaleDegree: '2',
        type: ChordType.Minor7th,
      }]],
      romanNumeralChordSymbol: 'ii7',
      type: ChordType.Minor7th,
      scaleDegree: '2',
      getChord: {
        C: 'Dm7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 2,
      serialized: 'ii⁷',
    },
    {
      inputs: [['Vsus'], [{
        scaleDegree: '5',
        type: ChordType.Sus4,
      }]],
      romanNumeralChordSymbol: 'Vsus',
      type: ChordType.Sus4,
      scaleDegree: '5',
      getChord: {
        C: 'Gsus',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'Vsus',
    },
    {
      inputs: [['Isus2'], [{
        scaleDegree: '1',
        type: ChordType.Sus2,
      }]],
      romanNumeralChordSymbol: 'Isus2',
      type: ChordType.Sus2,
      scaleDegree: '1',
      getChord: {
        C: 'Csus2',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 1,
      serialized: 'Isus2',
    },
    {
      inputs: [['I6'], [{
        scaleDegree: '1',
        type: ChordType.Major6th,
      }]],
      romanNumeralChordSymbol: 'I6',
      type: ChordType.Major6th,
      scaleDegree: '1',
      getChord: {
        C: 'C6',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 1,
      serialized: 'I⁶',
    },
    {
      inputs: [['viidim7'], [{
        scaleDegree: '7',
        type: ChordType.Diminished7th,
      }]],
      romanNumeralChordSymbol: 'viidim7',
      type: ChordType.Diminished7th,
      scaleDegree: '7',
      getChord: {
        C: 'Bdim7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 7,
      serialized: 'vii°⁷',
    },
    {
      inputs: [['vii7b5'], [{
        scaleDegree: '7',
        type: ChordType.HalfDiminished7th,
      }]],
      romanNumeralChordSymbol: 'vii7b5',
      type: ChordType.HalfDiminished7th,
      scaleDegree: '7',
      getChord: {
        C: 'B7b5',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 7,
      serialized: 'viiø',
    },
  ];

  testCases.forEach(testCase => {
    testCase.inputs.forEach(input => {
      (testCase.force ? fdescribe : describe)(`${JSON.stringify(testCase.inputs)}`, () => {
        let romanNumeral: RomanNumeralChord;

        beforeEach(() => {
          romanNumeral = new RomanNumeralChord(...input);
        })

        it('diatonicDegree', () => {
          expect(romanNumeral.diatonicDegree).toEqual(testCase.diatonicDegree);
        });

        it('accidental', () => {
          expect(romanNumeral.accidental).toEqual(testCase.accidental ?? Accidental.Natural);
        });

        it('type', () => {
          expect(romanNumeral.type).toEqual(testCase.type);
        });

        it('scaleDegree', () => {
          expect(romanNumeral.scaleDegree).toEqual(testCase.scaleDegree);
        });

        it('serialized', () => {
          expect(romanNumeral.toString()).toEqual(testCase.serialized);
        });

        it('getChord', () => {
          for (let chordKey in testCase.getChord) {
            expect(romanNumeral.getChord(chordKey as Key).symbol).toEqual(testCase.getChord[chordKey])
          }
        });
      });
    })
  })

  describe('toRelativeMode', () => {
    testPureFunction(RomanNumeralChord.toRelativeMode, [
      {
        args: ['I', Mode.Major, Mode.Minor],
        returnValue: 'bIII',
      },
      {
        args: ['i', Mode.Minor, Mode.Major],
        returnValue: 'vi',
      },
      {
        args: ['bVII', Mode.Minor, Mode.Major],
        returnValue: 'V',
      },
      {
        args: ['V', Mode.Minor, Mode.Major],
        returnValue: 'III',
      },
      {
        args: ['iii', Mode.Major, Mode.Minor],
        returnValue: 'v',
      },
      {
        args: ['i', Mode.Dorian, Mode.Major],
        returnValue: 'ii',
      },
      {
        args: ['I', Mode.Mixolydian, Mode.Major],
        returnValue: 'V',
      },
    ])
  })
});
