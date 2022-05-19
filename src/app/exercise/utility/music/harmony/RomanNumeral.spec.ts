import {
  RomanNumeralChord,
  ScaleDegree,
  Accidental,
} from './RomanNumeralChord';
import { ChordType } from '../chords';

describe('RomanNumeralBuilder', () => {
  const testCases: {
    input: ConstructorParameters<typeof RomanNumeralChord>,
    degree: ScaleDegree,
    accidental?: Accidental,
    type: ChordType,
    serialized: string,
  }[] = [
    {
      input: ['I'],
      degree: 1,
      type: ChordType.Major,
      serialized: 'I',
    },
    {
      input: ['ii'],
      degree: 2,
      type: ChordType.Minor,
      serialized: 'ii',
    },
    {
      input: ['bIII'],
      degree: 3,
      accidental: Accidental.Flat,
      type: ChordType.Major,
      serialized: '♭III'
    },
    {
      input: ['#ivdim'],
      degree: 4,
      accidental: Accidental.Sharp,
      type: ChordType.Diminished,
      serialized: '♯iv°',
    },
    {
      input: ['viidim'],
      degree: 7,
      type: ChordType.Diminished,
      serialized: 'vii°',
    },
  ];

  testCases.forEach(testCase => {
    it(`${JSON.stringify(testCase.input)}`, () => {
      const romanNumeral = new RomanNumeralChord(...testCase.input);
      expect(romanNumeral.degree).toEqual(testCase.degree);
      expect(romanNumeral.accidental).toEqual(testCase.accidental ?? Accidental.Natural);
      expect(romanNumeral.type).toEqual(testCase.type);
      expect(romanNumeral.toString()).toEqual(testCase.serialized);
    });
  })
});
