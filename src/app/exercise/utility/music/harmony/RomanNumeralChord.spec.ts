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
} from '../scale-degrees';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';
import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import {
  toRelativeMode,
  Mode,
} from './Mode';
import { Key } from '../keys/Key';
import { chordTypeConfigMap } from '../chords/Chord/ChordType';
import * as _ from 'lodash';

describe('RomanNumeralBuilder', () => {
  const testCases: {
    force?: boolean; // for debugging purposes only
    romanNumeralChordSymbol: RomanNumeralChordSymbol,
    diatonicDegree: DiatonicScaleDegree,
    scaleDegree: ScaleDegree,
    accidental?: Accidental,
    type: ChordType,
    serialized: string,
    getChord: Partial<Record<Key, ChordSymbol>>,
    isDiatonic: boolean,
  }[] = [
    {
      romanNumeralChordSymbol: 'I',
      diatonicDegree: 1,
      scaleDegree: '1',
      type: ChordType.Major,
      serialized: 'I',
      getChord: {
        C: 'C',
        'A#': 'A#',
      },
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'ii',
      diatonicDegree: 2,
      scaleDegree: '2',
      type: ChordType.Minor,
      serialized: 'ii',
      getChord: {
        C: 'Dm',
      },
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'bIII',
      diatonicDegree: 3,
      scaleDegree: 'b3',
      accidental: Accidental.Flat,
      type: ChordType.Major,
      serialized: '♭III',
      getChord: {
        C: 'Eb',
      },
      isDiatonic: false,
    },
    {
      romanNumeralChordSymbol: '#ivdim',
      diatonicDegree: 4,
      scaleDegree: '#4',
      accidental: Accidental.Sharp,
      type: ChordType.Diminished,
      serialized: '♯iv°',
      getChord: {
        G: 'C#dim',
      },
      isDiatonic: false,
    },
    {
      romanNumeralChordSymbol: 'viidim',
      diatonicDegree: 7,
      scaleDegree: '7',
      type: ChordType.Diminished,
      serialized: 'vii°',
      getChord: {
        'Eb': 'Ddim',
      },
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'V7',
      type: ChordType.Dominant7th,
      scaleDegree: '5',
      getChord: {
        C: 'G7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'V<sup>7</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'V9',
      type: ChordType.Dominant9th,
      scaleDegree: '5',
      getChord: {
        C: 'G9',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'V<sup>9</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'V7#9',
      type: ChordType.Dominant7thSharp9th,
      scaleDegree: '5',
      getChord: {
        C: 'G7#9',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'V<sup>7(♯9)</sup>',
      isDiatonic: false,
    },
    {
      romanNumeralChordSymbol: 'IVmaj7',
      type: ChordType.Major7th,
      scaleDegree: '4',
      getChord: {
        C: 'Fmaj7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 4,
      serialized: 'IV<sup>M7</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'ii7',
      type: ChordType.Minor7th,
      scaleDegree: '2',
      getChord: {
        C: 'Dm7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 2,
      serialized: 'ii<sup>7</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'Vsus',
      type: ChordType.Sus4,
      scaleDegree: '5',
      getChord: {
        C: 'Gsus',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'V<sub>sus</sub>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'Isus2',
      type: ChordType.Sus2,
      scaleDegree: '1',
      getChord: {
        C: 'Csus2',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 1,
      serialized: 'I<sub>sus2</sub>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'I6',
      type: ChordType.Major6th,
      scaleDegree: '1',
      getChord: {
        C: 'C6',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 1,
      serialized: 'I<sup>6</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'vi6',
      type: ChordType.Minorb6th,
      scaleDegree: '6',
      getChord: {
        C: 'Am6',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 6,
      serialized: 'vi<sup>6</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'viidim7',
      type: ChordType.Diminished7th,
      scaleDegree: '7',
      getChord: {
        C: 'Bdim7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 7,
      serialized: 'vii°<sup>7</sup>',
      isDiatonic: false,
    },
    {
      romanNumeralChordSymbol: 'vii7b5',
      type: ChordType.HalfDiminished7th,
      scaleDegree: '7',
      getChord: {
        C: 'B7b5',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 7,
      serialized: 'viiø',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'bVI+',
      type: ChordType.Augmented,
      scaleDegree: 'b6',
      serialized: '♭VI+',
      diatonicDegree: 6,
      accidental: Accidental.Flat,
      getChord: {
        C: 'Ab+',
      },
      isDiatonic: false,
    },
    {
      romanNumeralChordSymbol: 'vimaj7',
      type: ChordType.MinorMajor7th,
      isDiatonic: false,
      scaleDegree: '6',
      getChord: {
        C: 'AmM7',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 6,
      serialized: 'vi<sup>M7</sup>',
    },
    {
      romanNumeralChordSymbol: 'iM9',
      type: ChordType.MinorMajor9th,
      isDiatonic: false,
      scaleDegree: '1',
      diatonicDegree: 1,
      accidental: Accidental.Natural,
      getChord: {
        C: 'CmM9',
      },
      serialized: 'i<sup>M9</sup>'
    },
    {
      romanNumeralChordSymbol: 'Iadd9',
      type: ChordType.MajorAdd9,
      isDiatonic: true,
      scaleDegree: '1',
      diatonicDegree: 1,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Cadd9',
      },
      serialized: 'I<sup>add9</sup>'
    },
    {
      romanNumeralChordSymbol: 'viadd9',
      type: ChordType.MinorAdd9,
      isDiatonic: true,
      scaleDegree: '6',
      diatonicDegree: 6,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Amadd9',
      },
      serialized: 'vi<sup>add9</sup>'
    },
    {
      romanNumeralChordSymbol: 'Iadd#4',
      type: ChordType.MajorAddSharp4,
      isDiatonic: false,
      scaleDegree: '1',
      diatonicDegree: 1,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Cadd#4',
      },
      serialized: 'I<sup>add#4</sup>'
    }
  ];

  it('should cover all chord types', () => {
    const existingChordTypes: ChordType[] = _.keys(chordTypeConfigMap) as (keyof typeof chordTypeConfigMap)[];
    const coveredChordTypes: ChordType[] = _.chain(testCases).map('type').uniq().value();
    const missingChordTypes: ChordType[] = _.difference(existingChordTypes, coveredChordTypes);
    expect(missingChordTypes).toEqual([]);
  })

  testCases.forEach(testCase => {
    const inputs: ConstructorParameters<typeof RomanNumeralChord>[] = [
      [testCase.romanNumeralChordSymbol],
      [{
        scaleDegree: testCase.scaleDegree,
        type: testCase.type,
      }],
    ]
    inputs.forEach(input => {
      (testCase.force ? fdescribe : describe)(`${JSON.stringify(inputs)}`, () => {
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

        it('chordSymbol', () => {
          expect(romanNumeral.romanNumeralChordSymbol).toEqual(testCase.romanNumeralChordSymbol);
        })

        it('serialized', () => {
          expect(romanNumeral.toViewString()).toEqual(testCase.serialized);
        });

        it('getChord', () => {
          for (let chordKey in testCase.getChord) {
            expect(romanNumeral.getChord(chordKey as Key).symbol).toEqual(testCase.getChord[chordKey])
          }
        });

        it('isDiatonic', () => {
          expect(romanNumeral.isDiatonic).toEqual(testCase.isDiatonic);
        })
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
