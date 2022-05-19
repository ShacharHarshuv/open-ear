import {
  RomanNumeralChord,
  Accidental,
} from './RomanNumeralChord';
import { ChordType } from '../chords';
import {
  DiatonicScaleDegree,
  ScaleDegree,
} from './ScaleDegrees';

describe('RomanNumeralBuilder', () => {
  const testCases: {
    input: ConstructorParameters<typeof RomanNumeralChord>,
    diatonicDegree: DiatonicScaleDegree,
    scaleDegree: ScaleDegree,
    accidental?: Accidental,
    type: ChordType,
    serialized: string,
  }[] = [
    {
      input: ['I'],
      diatonicDegree: 1,
      scaleDegree: '1',
      type: ChordType.Major,
      serialized: 'I',
    },
    {
      input: ['ii'],
      diatonicDegree: 2,
      scaleDegree: '2',
      type: ChordType.Minor,
      serialized: 'ii',
    },
    {
      input: ['bIII'],
      diatonicDegree: 3,
      scaleDegree: 'b3',
      accidental: Accidental.Flat,
      type: ChordType.Major,
      serialized: '♭III'
    },
    {
      input: ['#ivdim'],
      diatonicDegree: 4,
      scaleDegree: '#4',
      accidental: Accidental.Sharp,
      type: ChordType.Diminished,
      serialized: '♯iv°',
    },
    {
      input: ['viidim'],
      diatonicDegree: 7,
      scaleDegree: '7',
      type: ChordType.Diminished,
      serialized: 'vii°',
    },
  ];

  testCases.forEach(testCase => {
    it(`${JSON.stringify(testCase.input)}`, () => {
      const romanNumeral = new RomanNumeralChord(...testCase.input);
      expect(romanNumeral.diatonicDegree).toEqual(testCase.diatonicDegree);
      expect(romanNumeral.accidental).toEqual(testCase.accidental ?? Accidental.Natural);
      expect(romanNumeral.type).toEqual(testCase.type);
      expect(romanNumeral.scaleDegree).toEqual(testCase.scaleDegree);
      expect(romanNumeral.toString()).toEqual(testCase.serialized);
    });
  })
});
