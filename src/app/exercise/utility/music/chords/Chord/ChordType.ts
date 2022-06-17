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
  Dominant7th = '7',
  Major7th = 'maj7',
  Minor7th = 'm7',
  Sus4 = 'sus',
  Sus2 = 'sus2',
  Major6th = '6',
  Diminished7th = 'dim7',
  HalfDiminished7th = '7b5',
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
      Interval.Prima,
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
      Interval.Prima,
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
      Interval.Prima,
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
  [ChordType.Dominant7th]: {
    intervalList: [
      Interval.Prima,
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
  [ChordType.Major7th]: {
    intervalList: [
      Interval.Prima,
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
      Interval.Prima,
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
      Interval.Prima,
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
      Interval.Prima,
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
      Interval.Prima,
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
  [ChordType.Diminished7th]: {
    intervalList: [
      Interval.Prima,
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
      Interval.Prima,
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
