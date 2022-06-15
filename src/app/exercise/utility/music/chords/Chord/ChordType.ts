import { Interval } from '../../intervals/Interval';
import { MusicSymbol } from '../../MusicSymbol';

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
  romanNumeral: {
    isLowercase: boolean;
    postfix: string;
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
      postfix: MusicSymbol.Diminished,
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
      postfix: `${MusicSymbol.Diminished}<sup>7</sup>`,
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
      postfix: `<sub>M7</sub>`,
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
      postfix: `<sup>7</sup>`,
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
      postfix: `<sub>sus</sub>`,
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
      postfix: `<sub>sus2</sub>`,
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
      postfix: `<sup>6</sup>`,
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
      postfix: `${MusicSymbol.Diminished}<sup>7</sup>`,
    }
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
      postfix: MusicSymbol.HalfDiminished,
    }
  },
}
