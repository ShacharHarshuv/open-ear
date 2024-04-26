import * as _ from 'lodash';
import { MusicSymbol } from '../../MusicSymbol';
import { MajorChordTypesPostfix, MinorChordTypesPostfix } from '../../harmony';
import { EnharmonicScaleDegree } from '../../scale-degrees';

export enum ChordType {
  Major = 'M',
  Minor = 'm',
  Diminished = 'dim',
  Sharp5 = '#5',
  Dominant7th = '7',
  Major7th = 'maj7',
  Minor7th = 'm7',
  Sus4 = 'sus',
  Sus2 = 'sus2',
  Major6th = '6',
  Minorb6th = 'mb6',
  Diminished7th = 'dim7',
  Dominant7thSharp9th = '7#9',
  Dominant9th = '9',
  HalfDiminished7th = '7b5',
  MinorMajor7th = 'mM7',
  MinorMajor9th = 'mM9',
  MajorAdd9 = 'add9',
  MinorAdd9 = 'madd9',
  MajorAddSharp4 = 'add#4',
  MinorSharp5 = 'm#5',
}

interface IChordTypeConfig {
  displayName: string;
  scaleDegreeList: EnharmonicScaleDegree[];
  romanNumeral: (
    | {
        isLowercase: true;
        postfix: `${MinorChordTypesPostfix}`;
      }
    | {
        isLowercase: false;
        postfix: `${MajorChordTypesPostfix}`;
      }
  ) & {
    viewPostfix: string;
  };
}

export const chordTypeConfigMap: Record<ChordType, IChordTypeConfig> = {
  [ChordType.Major]: {
    scaleDegreeList: ['3', '5'],
    displayName: 'Major Triad',
    romanNumeral: {
      isLowercase: false,
      postfix: '',
      viewPostfix: '',
    },
  },
  [ChordType.Minor]: {
    scaleDegreeList: ['b3', '5'],
    displayName: 'Minor Triad',
    romanNumeral: {
      isLowercase: true,
      postfix: '',
      viewPostfix: '',
    },
  },
  [ChordType.Diminished]: {
    scaleDegreeList: ['b3', 'b5'],
    displayName: 'Diminished Triad',
    romanNumeral: {
      isLowercase: true,
      postfix: 'dim',
      viewPostfix: MusicSymbol.Diminished,
    },
  },
  [ChordType.Sharp5]: {
    scaleDegreeList: ['3', '#5'],
    displayName: 'Augmented Triad',
    romanNumeral: {
      isLowercase: false,
      postfix: '#5',
      viewPostfix: `<sup>${MusicSymbol.Sharp}5</sup>`,
    },
  },
  [ChordType.Dominant7th]: {
    scaleDegreeList: ['3', '5', 'b7'],
    displayName: 'Dominant 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: '7',
      viewPostfix: `<sup>7</sup>`,
    },
  },
  [ChordType.Dominant9th]: {
    scaleDegreeList: ['3', '5', 'b7', '9'],
    displayName: 'Dominant 9th',
    romanNumeral: {
      isLowercase: false,
      postfix: '9',
      viewPostfix: `<sup>9</sup>`,
    },
  },
  [ChordType.Dominant7thSharp9th]: {
    scaleDegreeList: ['3', '5', 'b7', '#9'],
    displayName: 'Dominant 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: '7#9',
      viewPostfix: `<sup>7(${MusicSymbol.Sharp}9)</sup>`,
    },
  },
  [ChordType.Major7th]: {
    scaleDegreeList: ['3', '5', '7'],
    displayName: 'Major 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: 'maj7',
      viewPostfix: `<sup>M7</sup>`,
    },
  },
  [ChordType.Minor7th]: {
    scaleDegreeList: ['b3', '5', 'b7'],
    displayName: 'Minor 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: '7',
      viewPostfix: `<sup>7</sup>`,
    },
  },
  [ChordType.Sus4]: {
    scaleDegreeList: ['4', '5'],
    displayName: 'Suspended 4th',
    romanNumeral: {
      isLowercase: false,
      postfix: 'sus',
      viewPostfix: `<sub>sus</sub>`,
    },
  },
  [ChordType.Sus2]: {
    scaleDegreeList: ['2', '5'],
    displayName: 'Suspended 2nd',
    romanNumeral: {
      isLowercase: false,
      postfix: 'sus2',
      viewPostfix: `<sub>sus2</sub>`,
    },
  },
  [ChordType.Major6th]: {
    scaleDegreeList: ['3', '5', '6'],
    displayName: 'Major 6th',
    romanNumeral: {
      isLowercase: false,
      postfix: '6',
      viewPostfix: `<sup>6</sup>`,
    },
  },
  [ChordType.Minorb6th]: {
    scaleDegreeList: ['b3', '5', 'b6'],
    displayName: `Minor ${MusicSymbol.Flat}6th`,
    romanNumeral: {
      isLowercase: true,
      postfix: '6',
      viewPostfix: `<sup>6</sup>`,
    },
  },
  [ChordType.Diminished7th]: {
    scaleDegreeList: ['b3', 'b5', 'bb7'],
    displayName: 'Diminished 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: 'dim7',
      viewPostfix: `${MusicSymbol.Diminished}<sup>7</sup>`,
    },
  },
  [ChordType.HalfDiminished7th]: {
    scaleDegreeList: ['b3', 'b5', 'b7'],
    displayName: 'Half Diminished 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: '7b5',
      viewPostfix: MusicSymbol.HalfDiminished,
    },
  },
  [ChordType.MinorMajor7th]: {
    displayName: 'Minor Major 7th',
    scaleDegreeList: ['b3', '5', '7'],
    romanNumeral: {
      isLowercase: true,
      postfix: 'maj7',
      viewPostfix: `<sup>M7</sup>`,
    },
  },
  [ChordType.MinorMajor9th]: {
    displayName: 'Minor Major 9th',
    romanNumeral: {
      isLowercase: true,
      postfix: 'M9',
      viewPostfix: `<sup>M9</sup>`,
    },
    scaleDegreeList: ['b3', '5', '7', '9'],
  },
  [ChordType.MajorAdd9]: {
    displayName: 'Major Add 9',
    romanNumeral: {
      isLowercase: false,
      postfix: 'add9',
      viewPostfix: '<sup>add9</sup>',
    },
    scaleDegreeList: ['3', '5', '9'],
  },
  [ChordType.MinorAdd9]: {
    displayName: 'Minor Add 9',
    romanNumeral: {
      isLowercase: true,
      postfix: 'add9',
      viewPostfix: '<sup>add9</sup>',
    },
    scaleDegreeList: ['b3', '5', '9'],
  },
  [ChordType.MajorAddSharp4]: {
    scaleDegreeList: ['3', '#4', '5'],
    displayName: `Major Add ${MusicSymbol.Sharp}4`,
    romanNumeral: {
      isLowercase: false,
      postfix: 'add#4',
      viewPostfix: `<sup>add#4</sup>`,
    },
  },
  [ChordType.MinorSharp5]: {
    scaleDegreeList: ['b3', '#5'],
    displayName: `${MusicSymbol}5`,
    romanNumeral: {
      isLowercase: true,
      postfix: '#5',
      viewPostfix: `<sup>${MusicSymbol.Sharp}5</sup>`,
    },
  },
};

type RomanNumeralChordTypeParserMap = Record<
  'lowercase',
  Record<MinorChordTypesPostfix, ChordType>
> &
  Record<'uppercase', Record<MajorChordTypesPostfix, ChordType>>;

export const romanNumeralChordTypeParserMap: RomanNumeralChordTypeParserMap =
  _.reduce(
    chordTypeConfigMap,
    (map, config, type) => {
      const key = config.romanNumeral.isLowercase ? 'lowercase' : 'uppercase';
      if (!map[key]) {
        map[key] = {};
      }
      map[key][config.romanNumeral.postfix] = type;
      return map;
    },
    {},
  ) as RomanNumeralChordTypeParserMap;

console.log(romanNumeralChordTypeParserMap); // todo
