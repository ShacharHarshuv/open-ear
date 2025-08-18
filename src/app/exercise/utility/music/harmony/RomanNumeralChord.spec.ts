import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { MusicSymbol } from '../MusicSymbol';
import { ChordSymbol, ChordType } from '../chords';
import { Key } from '../keys/Key';
import { Accidental, DiatonicScaleDegree, ScaleDegree } from '../scale-degrees';
import { Mode } from './Mode';
import { RomanNumeralChord } from './RomanNumeralChord';
import { RomanNumeralChordSymbol } from './RomanNumeralChordSymbol';

describe('RomanNumeralBuilder', () => {
  const testCases: {
    force?: boolean; // for debugging purposes only
    romanNumeralChordSymbol: RomanNumeralChordSymbol;
    diatonicDegree: DiatonicScaleDegree;
    scaleDegree: ScaleDegree;
    bass?: ScaleDegree;
    accidental?: Accidental;
    type: ChordType;
    serialized: string;
    getChord: Partial<Record<Key, ChordSymbol>>;
    isDiatonic: boolean;
  }[] = [
    {
      romanNumeralChordSymbol: 'I',
      diatonicDegree: 1,
      scaleDegree: '1',
      type: ChordType.Major,
      serialized: 'Ⅰ',
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
      serialized: 'ⅱ',
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
      serialized: '♭Ⅲ',
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
      serialized: '♯ⅳ°',
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
      serialized: 'ⅶ°',
      getChord: {
        Eb: 'Ddim',
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
      serialized: 'Ⅴ<sup>7</sup>',
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
      serialized: 'Ⅴ<sup>9</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'V11',
      type: ChordType.Dominant11th,
      scaleDegree: '5',
      getChord: {
        C: 'G11',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 5,
      serialized: 'Ⅴ<sup>11</sup>',
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
      serialized: 'Ⅴ<sup>7(♯9)</sup>',
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
      serialized: 'Ⅳ<sup>M7</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'Imaj9',
      type: ChordType.Major9th,
      scaleDegree: '1',
      getChord: {
        C: 'Cmaj9',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 1,
      serialized: 'Ⅰ<sup>M9</sup>',
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
      serialized: 'ⅱ<sup>7</sup>',
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
      serialized: 'Ⅴ<sub>sus</sub>',
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
      serialized: 'Ⅰ<sub>sus2</sub>',
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
      serialized: 'Ⅰ<sup>6</sup>',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'vib6',
      type: ChordType.Minorb6th,
      scaleDegree: '6',
      getChord: {
        C: 'Amb6',
      },
      accidental: Accidental.Natural,
      diatonicDegree: 6,
      serialized: `ⅵ<sup>${MusicSymbol.Flat}6</sup>`,
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
      serialized: 'ⅶ°<sup>7</sup>',
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
      serialized: 'ⅶø',
      isDiatonic: true,
    },
    {
      romanNumeralChordSymbol: 'bVI#5',
      type: ChordType.Sharp5,
      scaleDegree: 'b6',
      serialized: `♭Ⅵ<sup>${MusicSymbol.Sharp}5</sup>`,
      diatonicDegree: 6,
      accidental: Accidental.Flat,
      getChord: {
        C: 'Ab#5',
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
      serialized: 'ⅵ<sup>M7</sup>',
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
      serialized: 'ⅰ<sup>M9</sup>',
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
      serialized: 'Ⅰ<sup>add9</sup>',
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
      serialized: 'ⅵ<sup>add9</sup>',
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
      serialized: 'Ⅰ<sup>add#4</sup>',
    },
    // slash chords
    {
      romanNumeralChordSymbol: 'I/3',
      type: ChordType.Major,
      isDiatonic: true,
      scaleDegree: '1',
      bass: '3',
      diatonicDegree: 1,
      accidental: Accidental.Natural,
      getChord: {
        C: 'C/E',
      },
      serialized: 'Ⅰ/3',
    },
    {
      romanNumeralChordSymbol: 'I/5',
      type: ChordType.Major,
      isDiatonic: true,
      scaleDegree: '1',
      bass: '5',
      diatonicDegree: 1,
      accidental: Accidental.Natural,
      getChord: {
        C: 'C/G',
      },
      serialized: 'Ⅰ/5',
    },
    {
      romanNumeralChordSymbol: 'V7/7',
      type: ChordType.Dominant7th,
      isDiatonic: true,
      scaleDegree: '5',
      bass: '7',
      diatonicDegree: 5,
      accidental: Accidental.Natural,
      getChord: {
        C: 'G7/B',
      },
      serialized: 'Ⅴ<sup>7</sup>/7',
    },
    {
      romanNumeralChordSymbol: 'vi#5',
      type: ChordType.MinorSharp5,
      isDiatonic: true, // since #3 = 4, all notes are technically within the key
      scaleDegree: '6',
      bass: '6',
      diatonicDegree: 6,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Am#5',
      },
      serialized: `ⅵ<sup>${MusicSymbol.Sharp}5</sup>`,
    },
    {
      romanNumeralChordSymbol: 'vi6',
      type: ChordType.Minor6th,
      isDiatonic: false,
      scaleDegree: '6',
      bass: '6',
      diatonicDegree: 6,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Am6',
      },
      serialized: `ⅵ<sup>6</sup>`,
    },
    {
      romanNumeralChordSymbol: 'vi9',
      type: ChordType.Minor9th,
      isDiatonic: true,
      scaleDegree: '6',
      bass: '6',
      diatonicDegree: 6,
      accidental: Accidental.Natural,
      getChord: {
        C: 'Am9',
      },
      serialized: `ⅵ<sup>9</sup>`,
    },
    {
      romanNumeralChordSymbol: 'III7#5',
      type: ChordType.Dominant7thSharp5th,
      isDiatonic: false,
      scaleDegree: '3',
      bass: '3',
      diatonicDegree: 3,
      accidental: Accidental.Natural,
      getChord: {
        F: 'A7#5',
      },
      serialized: `Ⅲ<sup>7(♯5)</sup>`,
    },
  ];

  // commented out as after adding a lot of chords, this maintenance is not worth it
  // it('should cover all chord types', () => {
  //   const existingChordTypes: ChordType[] = _.keys(
  //     chordTypeConfigMap,
  //   ) as (keyof typeof chordTypeConfigMap)[];
  //   const coveredChordTypes: ChordType[] = _.chain(testCases)
  //     .map('type')
  //     .uniq()
  //     .value();
  //   const missingChordTypes: ChordType[] = _.difference(
  //     existingChordTypes,
  //     coveredChordTypes,
  //   );
  //   expect(missingChordTypes).toEqual([]);
  // });

  testCases.forEach((testCase) => {
    const inputs: ConstructorParameters<typeof RomanNumeralChord>[] = [
      [testCase.romanNumeralChordSymbol],
      [
        {
          scaleDegree: testCase.scaleDegree,
          type: testCase.type,
          bass: testCase.bass,
        },
      ],
    ];
    inputs.forEach((input) => {
      (testCase.force ? fdescribe : describe)(
        `${JSON.stringify(input)}`,
        () => {
          let romanNumeral: RomanNumeralChord;

          beforeEach(() => {
            romanNumeral = new RomanNumeralChord(...input);
          });

          it('diatonicDegree', () => {
            expect(romanNumeral.diatonicDegree).toEqual(
              testCase.diatonicDegree,
            );
          });

          it('accidental', () => {
            expect(romanNumeral.accidental).toEqual(
              testCase.accidental ?? Accidental.Natural,
            );
          });

          it('type', () => {
            expect(romanNumeral.type).toEqual(testCase.type);
          });

          it('scaleDegree', () => {
            expect(romanNumeral.scaleDegree).toEqual(testCase.scaleDegree);
          });

          it('chordSymbol', () => {
            expect(romanNumeral.romanNumeralChordSymbol).toEqual(
              testCase.romanNumeralChordSymbol,
            );
          });

          it('serialized', () => {
            expect(romanNumeral.toViewString()).toEqual(testCase.serialized);
          });

          it('getChord', () => {
            for (let chordKey in testCase.getChord) {
              expect(romanNumeral.getChord(chordKey as Key).symbol).toEqual(
                testCase.getChord[chordKey],
              );
            }
          });

          it('isDiatonic', () => {
            expect(romanNumeral.isDiatonic).toEqual(testCase.isDiatonic);
          });
        },
      );
    });
  });

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
      {
        args: ['bIII/5', Mode.Minor, Mode.Major],
        returnValue: 'I/3',
      },
    ]);
  });
});
