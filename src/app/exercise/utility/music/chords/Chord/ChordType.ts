import { Interval } from '../../intervals/Interval';
import { MusicSymbol } from '../../MusicSymbol';
import {
  MajorChordTypesPostfix,
  MinorChordTypesPostfix,
} from '../../harmony';
import * as _ from 'lodash';

export enum ChordType {
  Major = 'M',
  Minor = 'm',
  Diminished = 'dim',
  Augmented = '+',
  Dominant7th = '7',
  Major7th = 'maj7',
  Minor7th = 'm7',
  Sus4 = 'sus',
  Sus2 = 'sus2',
  Major6th = '6',
  Minor6th = 'm6',
  Diminished7th = 'dim7',
  HalfDiminished7th = '7b5',
  MinorMajor7th = 'mM7',
  MinorMajor9th = 'mM9',
  MajorAdd9 = 'add9',
  MinorAdd9 = 'madd9',
  Dominant7thSharp9th = '7#9',
}

interface IChordTypeConfig {
  displayName: string;
  intervalList: Interval[];
  romanNumeral: ({
    isLowercase: true;
    postfix: `${MinorChordTypesPostfix}`,
  } | {
    isLowercase: false;
    postfix: `${MajorChordTypesPostfix}`,
  }) & {
    viewPostfix: string;
  }
}

export const chordTypeConfigMap: Record<ChordType, IChordTypeConfig> = {
  [ChordType.Major]: {
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
    ],
    displayName: 'Major Triad',
    romanNumeral: {
      isLowercase: false,
      postfix: '',
      viewPostfix: '',
    },
  },
  [ChordType.Minor]: {
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
    ],
    displayName: 'Minor Triad',
    romanNumeral: {
      isLowercase: true,
      postfix: '',
      viewPostfix: '',
    },
  },
  [ChordType.Diminished]: {
    intervalList: [
      Interval.MinorThird,
      Interval.DiminishedFifth,
    ],
    displayName: 'Diminished Triad',
    romanNumeral: {
      isLowercase: true,
      postfix: 'dim',
      viewPostfix: MusicSymbol.Diminished,
    },
  },
  [ChordType.Augmented]: {
    intervalList: [
      Interval.MajorThird,
      Interval.AugmentedFifth,
    ],
    displayName: 'Augmented Triad',
    romanNumeral: {
      isLowercase: false,
      postfix: '+',
      viewPostfix: '+',
    }
  },
  [ChordType.Dominant7th]: {
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MinorSeventh,
    ],
    displayName: 'Dominant 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: '7',
      viewPostfix: `<sup>7</sup>`,
    },
  },
  [ChordType.Dominant7thSharp9th]: {
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MinorSeventh,
      Interval.AugmentedNinth,
    ],
    displayName: 'Dominant 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: '7#9',
      viewPostfix: `<sup>7(${MusicSymbol.Sharp}9)</sup>`,
    },
  },
  [ChordType.Major7th]: {
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
    ],
    displayName: 'Major 7th',
    romanNumeral: {
      isLowercase: false,
      postfix: 'maj7',
      viewPostfix: `<sup>M7</sup>`,
    },
  },
  [ChordType.Minor7th]: {
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MinorSeventh,
    ],
    displayName: 'Minor 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: '7',
      viewPostfix: `<sup>7</sup>`,
    },
  },
  [ChordType.Sus4]: {
    intervalList: [
      Interval.PerfectFourth,
      Interval.PerfectFifth,
    ],
    displayName: 'Suspended 4th',
    romanNumeral: {
      isLowercase: false,
      postfix: 'sus',
      viewPostfix: `<sub>sus</sub>`,
    },
  },
  [ChordType.Sus2]: {
    intervalList: [
      Interval.MajorSecond,
      Interval.PerfectFifth,
    ],
    displayName: 'Suspended 2nd',
    romanNumeral: {
      isLowercase: false,
      postfix: 'sus2',
      viewPostfix: `<sub>sus2</sub>`,
    },
  },
  [ChordType.Major6th]: {
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorSixth,
    ],
    displayName: 'Major 6th',
    romanNumeral: {
      isLowercase: false,
      postfix: '6',
      viewPostfix: `<sup>6</sup>`,
    },
  },
  [ChordType.Minor6th]: {
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MinorSixth,
    ],
    displayName: 'Minor 6th',
    romanNumeral: {
      isLowercase: true,
      postfix: '6',
      viewPostfix: `<sup>6</sup>`
    }
  },
  [ChordType.Diminished7th]: {
    intervalList: [
      Interval.MinorThird,
      Interval.DiminishedFifth,
      Interval.DiminishedSeventh,
    ],
    displayName: 'Diminished 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: 'dim7',
      viewPostfix: `${MusicSymbol.Diminished}<sup>7</sup>`,
    },
  },
  [ChordType.HalfDiminished7th]: {
    intervalList: [
      Interval.MinorThird,
      Interval.DiminishedFifth,
      Interval.MinorSeventh,
    ],
    displayName: 'Half Diminished 7th',
    romanNumeral: {
      isLowercase: true,
      postfix: '7b5',
      viewPostfix: MusicSymbol.HalfDiminished,
    },
  },
  [ChordType.MinorMajor7th]: {
    displayName: 'Minor Major 7th',
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
    ],
    romanNumeral: {
      isLowercase: true,
      postfix: 'maj7',
      viewPostfix: `<sup>M7</sup>`
    }
  },
  [ChordType.MinorMajor9th]: {
    displayName: 'Minor Major 9th',
    romanNumeral: {
      isLowercase: true,
      postfix: 'M9',
      viewPostfix: `<sup>M9</sup>`,
    },
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MajorSeventh,
      Interval.MajorNinth,
    ],
  },
  [ChordType.MajorAdd9]: {
    displayName: 'Major Add 9',
    romanNumeral: {
      isLowercase: false,
      postfix: 'add9',
      viewPostfix: '<sup>add9</sup>'
    },
    intervalList: [
      Interval.MajorThird,
      Interval.PerfectFifth,
      Interval.MajorNinth,
    ],
  },
  [ChordType.MinorAdd9]: {
    displayName: 'Minor Add 9',
    romanNumeral: {
      isLowercase: true,
      postfix: 'add9',
      viewPostfix: '<sup>add9</sup>'
    },
    intervalList: [
      Interval.MinorThird,
      Interval.PerfectFifth,
      Interval.MajorNinth,
    ],
  }
}

type RomanNumeralChordTypeParserMap =
  Record<'lowercase', Record<MinorChordTypesPostfix, ChordType>> &
  Record<'uppercase', Record<MajorChordTypesPostfix, ChordType>>;

export const romanNumeralChordTypeParserMap: RomanNumeralChordTypeParserMap=
  _.reduce(chordTypeConfigMap, (map, config, type) => {
    const key = config.romanNumeral.isLowercase ? 'lowercase' : 'uppercase';
    if (!map[key]) {
      map[key] = {};
    }
    map[key][config.romanNumeral.postfix] = type;
    return map;
  }, {}) as RomanNumeralChordTypeParserMap;
