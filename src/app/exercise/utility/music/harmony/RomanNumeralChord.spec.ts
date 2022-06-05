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
      }
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
      }
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
      }
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
        G: 'C#dim'
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
      }
    },
  ];

  testCases.forEach(testCase => {
    testCase.inputs.forEach(input => {
      it(`${JSON.stringify(testCase.inputs)}`, () => {
        const romanNumeral = new RomanNumeralChord(...input);
        expect(romanNumeral.diatonicDegree).toEqual(testCase.diatonicDegree);
        expect(romanNumeral.accidental).toEqual(testCase.accidental ?? Accidental.Natural);
        expect(romanNumeral.type).toEqual(testCase.type);
        expect(romanNumeral.scaleDegree).toEqual(testCase.scaleDegree);
        expect(romanNumeral.toString()).toEqual(testCase.serialized);
        for (let chordKey in testCase.getChord) {
          expect(romanNumeral.getChord(chordKey as Key).symbol).toEqual(testCase.getChord[chordKey])
        }
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
