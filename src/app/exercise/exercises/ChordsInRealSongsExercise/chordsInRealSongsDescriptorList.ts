import { DeepReadonly } from '../../../shared/ts-utility';
import { Mode, RomanNumeralChordSymbol } from '../../utility';
import { NoteType } from '../../utility/music/notes/NoteType';
import { CadenceType } from '../utility/exerciseAttributes/tonalExercise';

export interface ProgressionInSongFromYouTubeDescriptor {
  key: NoteType;
  mode: Mode; // will determinate the cadence to play
  cadence?: CadenceType; // if not provided, will be determined by the mode
  videoId: string;
  name?: string;
  artist?: string;
  section?: string;
  chords: {
    seconds: number;
    chord: RomanNumeralChordSymbol;
  }[];
  endSeconds: number;
  /**
   * Used for debugging purposes only!
   * Makes it so only this will be used
   * */
  solo?: boolean;
}

export const chordsInRealSongsDescriptorList: DeepReadonly<
  ProgressionInSongFromYouTubeDescriptor[]
> = [
  {
    name: 'Girlfriend',
    artist: 'Avril Lavigne',
    key: 'D',
    mode: 1,
    videoId: 'Bg59q4puhmg',
    chords: [
      {
        seconds: 36.39,
        chord: 'I',
      },
      {
        seconds: 39.34,
        chord: 'V',
      },
      {
        seconds: 42.23,
        chord: 'vi',
      },
      {
        seconds: 45.14,
        chord: 'IV',
      },
    ],
    endSeconds: 48.1,
  },
  {
    name: `It's your love`,
    key: 'G',
    mode: Mode.Major,
    videoId: '2AJ4i4S_fP8',
    artist: 'Tim McGraw',
    chords: [
      {
        seconds: 14.5,
        chord: 'I',
      },
      {
        seconds: 17.7,
        chord: 'V',
      },
      {
        seconds: 21,
        chord: 'vi',
      },
      {
        seconds: 24.2,
        chord: 'IV',
      },
    ],
    endSeconds: 28,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: '1cCBqY2B7lI',
    name: 'Confusion and Frustration in Modern Times',
    artist: 'Sum 41',
    chords: [
      {
        chord: 'vi',
        seconds: 0,
      },
      {
        chord: 'IV',
        seconds: 2.17,
      },
      {
        chord: 'I',
        seconds: 4.44,
      },
      {
        chord: 'V',
        seconds: 6.41,
      },
      {
        chord: 'vi',
        seconds: 8.28,
      },
      {
        chord: 'IV',
        seconds: 10.34,
      },
      {
        chord: 'I',
        seconds: 12.41,
      },
      {
        chord: 'V',
        seconds: 14.48,
      },
      {
        chord: 'IV',
        seconds: 16.55,
      },
    ],
    endSeconds: 18.62,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: '1cCBqY2B7lI',
    name: 'Confusion and Frustration in Modern Times',
    artist: 'Sum 41',
    chords: [
      {
        chord: 'I',
        seconds: 21.92,
      },
      {
        chord: 'IV',
        seconds: 22.65,
      },
      {
        chord: 'vi',
        seconds: 23.76,
      },
      {
        chord: 'IV',
        seconds: 24.64,
      },
      {
        chord: 'I',
        seconds: 25.76,
      },
      {
        chord: 'IV',
        seconds: 26.81,
      },
      {
        chord: 'V',
        seconds: 27.83,
      },
    ],
    endSeconds: 29.81,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: '1cCBqY2B7lI',
    name: 'Confusion and Frustration in Modern Times',
    artist: 'Sum 41',
    chords: [
      {
        chord: 'I',
        seconds: 29.81,
      },
      {
        chord: 'vi',
        seconds: 31.84,
      },
      {
        chord: 'IV',
        seconds: 32.97,
      },
      {
        chord: 'I',
        seconds: 34.0,
      },
      {
        chord: 'vi',
        seconds: 35.93,
      },
      {
        chord: 'IV',
        seconds: 36.99,
      },
    ],
    endSeconds: 39.28,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: '1cCBqY2B7lI',
    name: 'Confusion and Frustration in Modern Times',
    artist: 'Sum 41',
    chords: [
      {
        chord: 'vi',
        seconds: 38.05,
      },
      {
        chord: 'IV',
        seconds: 39.16,
      },
      {
        chord: 'I',
        seconds: 40.1,
      },
      {
        chord: 'V',
        seconds: 41.06,
      },
    ],
    endSeconds: 42.24,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: '1cCBqY2B7lI',
    name: 'Confusion and Frustration in Modern Times',
    artist: 'Sum 41',
    chords: [
      {
        chord: 'I',
        seconds: 52.34,
      },
      {
        chord: 'V',
        seconds: 53.34,
      },
      {
        chord: 'vi',
        seconds: 54.2,
      },
      {
        chord: 'IV',
        seconds: 55.25,
      },
    ],
    endSeconds: 56.56,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: 'dZX6Q-Bj_xg',
    name: 'Passion Pit Take A Walk',
    artist: 'MilkMan',
    chords: [
      {
        chord: 'ii',
        seconds: 37.76,
      },
      {
        chord: 'IV',
        seconds: 39.81,
      },
      {
        chord: 'vi',
        seconds: 42.37,
      },
      {
        chord: 'V',
        seconds: 44.42,
      },
    ],
    endSeconds: 47.5,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: 'dZX6Q-Bj_xg',
    name: 'Passion Pit Take A Walk',
    artist: 'MilkMan',
    chords: [
      {
        chord: 'ii',
        seconds: 47.3,
      },
      {
        chord: 'IV',
        seconds: 49.3,
      },
      {
        chord: 'vi',
        seconds: 51.5,
      },
      {
        chord: 'V',
        seconds: 53.8,
      },
    ],
    endSeconds: 55.3,
  },
  {
    key: 'B',
    mode: Mode.Major,
    videoId: 'dZX6Q-Bj_xg',
    name: 'Passion Pit Take A Walk',
    artist: 'MilkMan',
    chords: [
      {
        chord: 'IV',
        seconds: 94.77,
      },
      {
        chord: 'I',
        seconds: 97.03,
      },
      {
        chord: 'V',
        seconds: 99.3,
      },
      {
        chord: 'vi',
        seconds: 101.56,
      },
    ],
    endSeconds: 104,
  },
  {
    key: 'Db',
    mode: Mode.Major,
    videoId: 'CvBfHwUxHIk',
    name: 'Umbrella',
    artist: 'Rihanna',
    chords: [
      {
        chord: 'IV',
        seconds: 57,
      },
      {
        chord: 'I',
        seconds: 58.8,
      },
      {
        chord: 'V',
        seconds: 61.5,
      },
      {
        chord: 'vi',
        seconds: 64.2,
      },
    ],
    endSeconds: 67.5,
  },
  {
    key: 'F',
    mode: Mode.Minor,
    videoId: 'hTWKbfoikeg',
    name: 'Smells Like Teen Spirit',
    artist: '',
    chords: [
      {
        chord: 'i',
        seconds: 26,
      },
      {
        chord: 'iv',
        seconds: 27.03,
      },
      {
        chord: 'bIII',
        seconds: 28.07,
      },
      {
        chord: 'bVI',
        seconds: 29.1,
      },
      {
        chord: 'i',
        seconds: 30.14,
      },
      {
        chord: 'iv',
        seconds: 31.17,
      },
      {
        chord: 'bIII',
        seconds: 32.21,
      },
      {
        chord: 'bVI',
        seconds: 33.24,
      },
    ],
    endSeconds: 34.28,
  },
  {
    key: 'F',
    mode: Mode.Minor,
    videoId: 'hTWKbfoikeg',
    name: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    chords: [
      {
        chord: 'i',
        seconds: 59.07,
      },
      {
        chord: 'iv',
        seconds: 59.96,
      },
      {
        chord: 'bIII',
        seconds: 60.96,
      },
      {
        chord: 'bVI',
        seconds: 61.97,
      },
      {
        chord: 'i',
        seconds: 62.98,
      },
      {
        chord: 'iv',
        seconds: 63.99,
      },
      {
        chord: 'bIII',
        seconds: 65.06,
      },
      {
        chord: 'bVI',
        seconds: 66.03,
      },
    ],
    endSeconds: 67.28,
  },
  {
    key: 'F#',
    mode: Mode.Minor,
    videoId: 'Zi_XLOBDo_Y',
    name: 'Billie Jean',
    artist: 'Michael Jackson',
    chords: [
      {
        chord: 'bVI',
        seconds: 71.08,
      },
      {
        chord: 'i',
        seconds: 72.94,
      },
      {
        chord: 'bVI',
        seconds: 75.02,
      },
      {
        chord: 'i',
        seconds: 76.99,
      },
      {
        chord: 'bVI',
        seconds: 79.16,
      },
      {
        chord: 'i',
        seconds: 81.2,
      },
      {
        chord: 'bVI',
        seconds: 83.2,
      },
      {
        chord: 'V',
        seconds: 85.19,
      },
    ],
    endSeconds: 87.59,
  },
  {
    key: 'Db',
    mode: Mode.Mixolydian,
    videoId: '1w7OgIMMRc4',
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    chords: [
      {
        seconds: 31,
        chord: 'I',
      },
      {
        seconds: 34.5,
        chord: 'bVII',
      },
      {
        seconds: 38.5,
        chord: 'IV',
      },
      {
        seconds: 42,
        chord: 'I',
      },
    ],
    endSeconds: 46.2,
  },
  {
    key: 'Db',
    mode: Mode.Mixolydian,
    videoId: '1w7OgIMMRc4',
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    chords: [
      {
        seconds: 61,
        chord: 'V',
      },
      {
        seconds: 63,
        chord: 'bVII',
      },
      {
        seconds: 65,
        chord: 'I',
      },
    ],
    endSeconds: 69,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: 'QDYfEBY9NM4',
    name: 'Let It Be',
    artist: 'The Beatles',
    chords: [
      {
        chord: 'I',
        seconds: 64.66,
      },
      {
        chord: 'V',
        seconds: 66.37,
      },
      {
        chord: 'vi',
        seconds: 68.06,
      },
      {
        chord: 'IV',
        seconds: 69.62,
      },
    ],
    endSeconds: 71.35,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: '9OQBDdNHmXo',
    name: 'All Too Well',
    artist: 'Taylor Swift',
    chords: [
      {
        chord: 'I',
        seconds: 51.67,
      },
      {
        chord: 'V',
        seconds: 54.09,
      },
      {
        chord: 'vi',
        seconds: 56.68,
      },
      {
        chord: 'IV',
        seconds: 59.41,
      },
    ],
    endSeconds: 61.87,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: 'hnK6CoUZZFc',
    name: 'All Too Well',
    artist: 'Taylor Swift',
    chords: [
      {
        chord: 'I',
        seconds: 98.04,
      },
      {
        chord: 'V',
        seconds: 100.62,
      },
      {
        chord: 'vi',
        seconds: 103.15,
      },
      {
        chord: 'IV',
        seconds: 105.74,
      },
    ],
    endSeconds: 108.31,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'hLQl3WQQoQ0',
    name: 'Someone Like You',
    artist: 'Adele',
    chords: [
      {
        chord: 'I',
        seconds: 73.7,
      },
      {
        chord: 'V',
        seconds: 75.51,
      },
      {
        chord: 'vi',
        seconds: 77.33,
      },
      {
        chord: 'IV',
        seconds: 79.15,
      },
    ],
    endSeconds: 80.97,
  },
  {
    key: 'E',
    mode: Mode.Major,
    videoId: '1k8craCGpgs',
    name: "Don't Stop Believing",
    artist: 'Journey',
    chords: [
      {
        chord: 'I',
        seconds: 17.36,
      },
      {
        chord: 'V',
        seconds: 19.12,
      },
      {
        chord: 'vi',
        seconds: 21.39,
      },
      {
        chord: 'IV',
        seconds: 23.16,
      },
    ],
    endSeconds: 25.43,
  },
  {
    key: 'F',
    mode: Mode.Major,
    videoId: 'aF4CWCXirZ8',
    name: 'Can You Feel The Love Tonight',
    artist: 'Elton John',
    chords: [
      {
        chord: 'I',
        seconds: 66.11,
      },
      {
        chord: 'V',
        seconds: 67.69,
      },
      {
        chord: 'vi',
        seconds: 69.27,
      },
      {
        chord: 'IV',
        seconds: 70.85,
      },
    ],
    endSeconds: 72.43,
  },
  {
    key: 'F#',
    mode: Mode.Major,
    videoId: 'i8dh9gDzmz8',
    name: 'When I Come Around',
    artist: 'Green Day',
    chords: [
      {
        chord: 'I',
        seconds: 15.89,
      },
      {
        chord: 'V',
        seconds: 16.93,
      },
      {
        chord: 'vi',
        seconds: 18.04,
      },
      {
        chord: 'IV',
        seconds: 19.04,
      },
    ],
    endSeconds: 20.54,
  },
  {
    key: 'Ab',
    mode: Mode.Major,
    videoId: 'moSFlvxnbgk',
    name: 'Let It Go',
    artist: 'Robert and Kristen Anderson-Lopez',
    chords: [
      {
        chord: 'I',
        seconds: 60.49,
      },
      {
        chord: 'V',
        seconds: 62.24,
      },
      {
        chord: 'vi',
        seconds: 64.07,
      },
      {
        chord: 'IV',
        seconds: 65.84,
      },
    ],
    endSeconds: 67.58,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'kXYiU_JCYtU',
    name: 'Numb',
    artist: 'Linkin Park',
    chords: [
      {
        chord: 'vi',
        seconds: 21.7,
      },
      {
        chord: 'IV',
        seconds: 23.88,
      },
      {
        chord: 'I',
        seconds: 26.06,
      },
      {
        chord: 'V',
        seconds: 28.24,
      },
    ],
    endSeconds: 30.42,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'fe4EK4HSPkI',
    name: 'Kids',
    artist: 'MGMT',
    chords: [
      {
        chord: 'vi',
        seconds: 86.34,
      },
      {
        chord: 'IV',
        seconds: 88.04,
      },
      {
        chord: 'I',
        seconds: 89.89,
      },
      {
        chord: 'V',
        seconds: 91.89,
      },
    ],
    endSeconds: 94.15,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'FTQbiNvZqaY',
    name: 'Africa',
    artist: 'Toto',
    chords: [
      {
        chord: 'vi',
        seconds: 69.32,
      },
      {
        chord: 'IV',
        seconds: 70.6,
      },
      {
        chord: 'I',
        seconds: 71.92,
      },
      {
        chord: 'V',
        seconds: 73.22,
      },
    ],
    endSeconds: 74.43,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'NPBCbTZWnq0',
    name: 'River flows in you',
    artist: 'Yiruma',
    chords: [
      {
        chord: 'vi',
        seconds: 53.03,
      },
      {
        chord: 'IV',
        seconds: 54.59,
      },
      {
        chord: 'I',
        seconds: 56.28,
      },
      {
        chord: 'V',
        seconds: 57.87,
      },
    ],
    endSeconds: 60.04,
  },
  {
    key: 'F',
    mode: Mode.Major,
    videoId: '5NPBIwQyPWE',
    name: 'Complicated',
    artist: 'Avril Lavigne',
    chords: [
      {
        chord: 'vi',
        seconds: 69.83,
      },
      {
        chord: 'IV',
        seconds: 70.98,
      },
      {
        chord: 'I',
        seconds: 72.6,
      },
      {
        chord: 'V',
        seconds: 74.06,
      },
    ],
    endSeconds: 75.99,
  },
  {
    key: 'F',
    mode: Mode.Major,
    videoId: 'SR6iYWJxHqs',
    name: 'Grenade',
    artist: 'Bruno Mars',
    chords: [
      {
        chord: 'vi',
        seconds: 39.43,
      },
      {
        chord: 'IV',
        seconds: 40.49,
      },
      {
        chord: 'I',
        seconds: 41.56,
      },
      {
        chord: 'V',
        seconds: 42.61,
      },
    ],
    endSeconds: 43.61,
  },
  {
    key: 'Ab',
    mode: Mode.Major,
    videoId: '7I0vkKy504U',
    name: 'San Francisco',
    artist: 'Scott McKenzie',
    chords: [
      {
        chord: 'vi',
        seconds: 6,
      },
      {
        chord: 'IV',
        seconds: 8.11,
      },
      {
        chord: 'I',
        seconds: 10.28,
      },
      {
        chord: 'V',
        seconds: 12.32,
      },
    ],
    endSeconds: 14.46,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: 'dTa2Bzlbjv0',
    name: 'Save Tonight',
    artist: 'Eagle Eye Cherry',
    chords: [
      {
        chord: 'vi',
        seconds: 48.17,
      },
      {
        chord: 'IV',
        seconds: 49.17,
      },
      {
        chord: 'I',
        seconds: 50.17,
      },
      {
        chord: 'V',
        seconds: 51.13,
      },
    ],
    endSeconds: 52.17,
  },
  {
    key: 'G#',
    mode: 6,
    videoId: 'uSiHqxgE2d0',
    name: 'Hit The Road Jack',
    artist: 'Ray Charles',
    chords: [
      {
        chord: 'i',
        seconds: 2.94,
      },
      {
        chord: 'bVII',
        seconds: 3.62,
      },
      {
        chord: 'bVI',
        seconds: 4.32,
      },
      {
        chord: 'V',
        seconds: 4.93,
      },
    ],
    endSeconds: 5.66,
  },
  {
    key: 'D#',
    mode: Mode.Minor,
    videoId: 'gO071XuztZA',
    name: 'Good Vibrations',
    artist: 'Beach Boys',
    chords: [
      {
        chord: 'i',
        seconds: 0.72,
      },
      {
        chord: 'bVII',
        seconds: 3.86,
      },
      {
        chord: 'bVI',
        seconds: 6.99,
      },
      {
        chord: 'V',
        seconds: 10.13,
      },
    ],
    endSeconds: 13.27,
  },
  {
    key: 'A',
    mode: Mode.Minor,
    videoId: 'Vyc8lezaa9g',
    name: 'Citizen Erased',
    artist: 'Muse',
    chords: [
      {
        chord: 'i',
        seconds: 471.1,
      },
      {
        chord: 'bVII',
        seconds: 473.44,
      },
      {
        chord: 'bVI',
        seconds: 475.89,
      },
      {
        chord: 'V',
        seconds: 478.51,
      },
    ],
    endSeconds: 481.07,
  },
  {
    key: 'A',
    mode: Mode.Minor,
    videoId: 'Vyc8lezaa9g',
    name: 'Summer in the City',
    artist: 'Quincy Jones',
    chords: [
      {
        chord: 'i',
        seconds: 481.7,
      },
      {
        chord: 'bVII',
        seconds: 482.54,
      },
      {
        chord: 'bVI',
        seconds: 484,
      },
      {
        chord: 'V',
        seconds: 485.53,
      },
    ],
    endSeconds: 487,
  },
  {
    key: 'F#',
    mode: Mode.Minor,
    videoId: 'OTvhWVTwRnM',
    name: 'Happy together',
    artist: 'The Turtles',
    chords: [
      {
        chord: 'i',
        seconds: 16.96,
      },
      {
        chord: 'bVII',
        seconds: 20.66,
      },
      {
        chord: 'bVI',
        seconds: 24.69,
      },
      {
        chord: 'V',
        seconds: 28.56,
      },
    ],
    endSeconds: 32.86,
  },
  {
    key: 'F',
    mode: Mode.Minor,
    videoId: '0S13mP_pfEc',
    name: 'Runaway',
    artist: 'Del Shannon',
    chords: [
      {
        chord: 'i',
        seconds: 6.96,
      },
      {
        chord: 'bVII',
        seconds: 9.82,
      },
      {
        chord: 'bVI',
        seconds: 12.94,
      },
      {
        chord: 'V',
        seconds: 16.07,
      },
    ],
    endSeconds: 19.35,
  },
  {
    key: 'C',
    mode: Mode.Minor,
    videoId: 'rYEDA3JcQqw',
    name: 'Rolling In The Deep',
    artist: 'Adele',
    chords: [
      {
        chord: 'i',
        seconds: 59.6,
      },
      {
        chord: 'bVII',
        seconds: 61.89,
      },
      {
        chord: 'bVI',
        seconds: 64.17,
      },
      {
        chord: 'bVII',
        seconds: 67.6,
      },
    ],
    endSeconds: 68.74,
  },
  {
    key: 'C',
    mode: Mode.Minor,
    videoId: 'TLV4_xaYynY',
    name: 'All Along The Watchtower',
    artist: 'Jimi Handrix',
    chords: [
      {
        chord: 'i',
        seconds: 18.72,
      },
      {
        chord: 'bVII',
        seconds: 19.8,
      },
      {
        chord: 'bVI',
        seconds: 20.61,
      },
      {
        chord: 'bVII',
        seconds: 22.23,
      },
    ],
    endSeconds: 23.04,
  },
  {
    key: 'A',
    mode: Mode.Minor,
    videoId: 'iXQUu5Dti4g',
    name: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    chords: [
      {
        chord: 'i',
        seconds: 404,
      },
      {
        chord: 'bVII',
        seconds: 405.15,
      },
      {
        chord: 'bVI',
        seconds: 406.42,
      },
      {
        chord: 'bVII',
        seconds: 408.49,
      },
      {
        chord: 'i',
        seconds: 408.74,
      },
    ],
    endSeconds: 410,
  },
  {
    key: 'C',
    mode: Mode.Minor,
    videoId: 'WNIPqafd4As',
    name: 'My Heart Will Go On',
    artist: 'Celin Deon',
    chords: [
      {
        chord: 'i',
        seconds: 214.68,
      },
      {
        chord: 'bVII',
        seconds: 217.1,
      },
      {
        chord: 'bVI',
        seconds: 219.53,
      },
      {
        chord: 'bVII',
        seconds: 221.95,
      },
    ],
    endSeconds: 224.38,
  },
  {
    key: 'D',
    mode: Mode.Minor,
    videoId: '8UVNT4wvIGY',
    name: 'Somebody That I Used To Know',
    artist: 'Gotye',
    chords: [
      {
        chord: 'i',
        seconds: 93.09,
      },
      {
        chord: 'bVII',
        seconds: 94.03,
      },
      {
        chord: 'bVI',
        seconds: 94.97,
      },
      {
        chord: 'bVII',
        seconds: 95.9,
      },
    ],
    endSeconds: 96.84,
  },
  {
    key: 'E',
    mode: Mode.Major,
    videoId: 'tbU3zdAgiX8',
    name: 'All I Have To Do Is Dream',
    artist: 'Everly Brothers',
    chords: [
      {
        chord: 'I',
        seconds: 3.8,
      },
      {
        chord: 'vi',
        seconds: 4.73,
      },
      {
        chord: 'IV',
        seconds: 5.91,
      },
      {
        chord: 'V',
        seconds: 7,
      },
    ],
    endSeconds: 8.4,
  },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: '3JWTaaS7LdU',
    name: 'I Will Always Love You',
    artist: 'Whitney Houston',
    chords: [
      {
        chord: 'I',
        seconds: 107.5,
      },
      {
        chord: 'vi',
        seconds: 109.26,
      },
      {
        chord: 'IV',
        seconds: 111.03,
      },
      {
        chord: 'V',
        seconds: 112.79,
      },
    ],
    endSeconds: 114.55,
  },
  {
    key: 'G',
    mode: Mode.Major,
    videoId: 'xw0EozkBWuI',
    name: 'Crocodile Rock',
    artist: 'Elton John',
    section: 'Bridge',
    chords: [
      {
        chord: 'I',
        seconds: 131.83,
      },
      {
        chord: 'vi',
        seconds: 134.79,
      },
      {
        chord: 'IV',
        seconds: 137.96,
      },
      {
        chord: 'V',
        seconds: 141.17,
      },
    ],
    endSeconds: 144.37,
  },
  {
    key: 'G#',
    mode: Mode.Major,
    videoId: 'VJcGi4-n_Yw',
    name: 'Earth Angle',
    artist: 'The Penguins',
    chords: [
      {
        chord: 'I',
        seconds: 13,
      },
      {
        chord: 'vi',
        seconds: 14.54,
      },
      {
        chord: 'IV',
        seconds: 16.06,
      },
      {
        chord: 'V',
        seconds: 17.69,
      },
    ],
    endSeconds: 19.32,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: 'vdvnOH060Qg',
    name: 'Happiness is a Warm Gun',
    artist: 'The Beatles',
    chords: [
      {
        chord: 'I',
        seconds: 94.93,
      },
      {
        chord: 'vi',
        seconds: 96.13,
      },
      {
        chord: 'IV',
        seconds: 97.67,
      },
      {
        chord: 'V',
        seconds: 99.28,
      },
    ],
    endSeconds: 100.94,
  },
  {
    key: 'Db',
    mode: Mode.Major,
    videoId: 'JMcNzjzw63I',
    name: 'Jesus of Suburbia',
    artist: 'Green Day',
    chords: [
      {
        chord: 'I',
        seconds: 0,
      },
      {
        chord: 'vi',
        seconds: 3.3,
      },
      {
        chord: 'IV',
        seconds: 6.72,
      },
      {
        chord: 'V',
        seconds: 10,
      },
    ],
    endSeconds: 13.42,
  },
  {
    key: 'Eb',
    mode: Mode.Major,
    videoId: 'kffacxfA7G4',
    name: 'Baby',
    artist: 'Justin Bieber',
    chords: [
      {
        chord: 'I',
        seconds: 15.51,
      },
      {
        chord: 'vi',
        seconds: 19.12,
      },
      {
        chord: 'IV',
        seconds: 22.78,
      },
      {
        chord: 'V',
        seconds: 26.52,
      },
    ],
    endSeconds: 30.14,
  },
  {
    key: 'G',
    mode: 1,
    videoId: '-CCfIJgVM6M',
    name: 'There she goes',
    artist: "The La's",
    chords: [
      {
        chord: 'I',
        seconds: 33.64,
      },
      {
        chord: 'V',
        seconds: 34.57,
      },
      {
        chord: 'IV',
        seconds: 35.6,
      },
    ],
    endSeconds: 37.51,
  },
  {
    key: 'F#',
    mode: Mode.Major,
    videoId: 'VZt7J0iaUD0',
    name: 'New Project',
    artist: 'Suzanne Vega',
    chords: [
      {
        chord: 'I',
        seconds: 25.65,
      },
      {
        chord: 'V',
        seconds: 27.53,
      },
      {
        chord: 'IV',
        seconds: 29.4,
      },
      {
        chord: 'V',
        seconds: 31.28,
      },
    ],
    endSeconds: 33.15,
  },
  {
    key: 'F',
    mode: Mode.Major,
    videoId: 'N5EnGwXV_Pg',
    name: 'your body is a wonderland',
    artist: '',
    chords: [
      {
        chord: 'I',
        seconds: 79.37,
      },
      {
        chord: 'V',
        seconds: 80.65,
      },
      {
        chord: 'IV',
        seconds: 81.93,
      },
      {
        chord: 'V',
        seconds: 83.2,
      },
    ],
    endSeconds: 84.48,
  },
  // todo: need to figure out the timing here, it's a bit tricky
  // {
  //   "key": "G",
  //   "mode": Mode.Major,
  //   "videoId": "79JcPZNLCTY",
  //   "name": "Tangerine",
  //   "artist": "Led Zeppelin",
  //   "chords": [
  //     {
  //       "chord": "I",
  //       "seconds": 143
  //     },
  //     {
  //       "chord": "V",
  //       "seconds": 143
  //     },
  //     {
  //       "chord": "IV",
  //       "seconds": 143
  //     },
  //     {
  //       "chord": "V",
  //       "seconds": 143
  //     },
  //   ],
  //   "endSeconds": 180
  // },
  {
    key: 'A',
    mode: Mode.Major,
    videoId: 'NHozn0YXAeE',
    name: 'MMMBop',
    artist: 'Hanson',
    chords: [
      {
        chord: 'I',
        seconds: 18.12,
      },
      {
        chord: 'V',
        seconds: 19.33,
      },
      {
        chord: 'IV',
        seconds: 20.43,
      },
      {
        chord: 'V',
        seconds: 21.56,
      },
    ],
    endSeconds: 22.61,
  },
  {
    key: 'C',
    mode: Mode.Major,
    videoId: '9Ht5RZpzPqw',
    name: 'All The Small Things',
    artist: 'Blink 182',
    chords: [
      {
        chord: 'I',
        seconds: 16.88,
      },
      {
        chord: 'V',
        seconds: 18.48,
      },
      {
        chord: 'IV',
        seconds: 20.08,
      },
      {
        chord: 'V',
        seconds: 21.68,
      },
    ],
    endSeconds: 23.28,
  },
  {
    key: 'E',
    mode: Mode.Major,
    videoId: 'j2F4INQFjEI',
    name: 'Heaven is a Place on Earth',
    artist: 'Belinda Carlisle',
    chords: [
      {
        chord: 'I',
        seconds: 37.9,
      },
      {
        chord: 'V',
        seconds: 39.77,
      },
      {
        chord: 'IV',
        seconds: 41.77,
      },
      {
        chord: 'V',
        seconds: 43.61,
      },
    ],
    endSeconds: 45.6,
  },
  {
    key: 'Ab',
    mode: Mode.Major,
    videoId: 'YQHsXMglC9A',
    name: 'Hello',
    artist: 'Adele',
    chords: [
      {
        chord: 'vi',
        seconds: 233.16,
      },
      {
        chord: 'IV',
        seconds: 234.3,
      },
      {
        chord: 'I',
        seconds: 236.2,
      },
      {
        chord: 'V',
        seconds: 237.34,
      },
    ],
    endSeconds: 239.24,
  },
  {
    key: 'F',
    mode: Mode.Mixolydian,
    videoId: 'A_MjCqQoLLA',
    name: 'Hey Jude',
    artist: 'The Beatles',
    section: 'Outro',
    chords: [
      {
        chord: 'I',
        seconds: 258.76,
      },
      {
        chord: 'bVII',
        seconds: 261.92,
      },
      {
        chord: 'IV',
        seconds: 265.08,
      },
      {
        chord: 'I',
        seconds: 268.24,
      },
    ],
    endSeconds: 272.02,
  },
  {
    key: 'E',
    mode: Mode.Mixolydian,
    videoId: 'GgnClrx8N2k',
    name: 'Sympathy for the Devil',
    artist: 'The Rolling Stones',
    chords: [
      {
        chord: 'I',
        seconds: 21.2,
      },
      {
        chord: 'bVII',
        seconds: 23.23,
      },
      {
        chord: 'IV',
        seconds: 25.31,
      },
      {
        chord: 'I',
        seconds: 27.26,
      },
    ],
    endSeconds: 29,
  },
  {
    key: 'D',
    mode: Mode.Mixolydian,
    videoId: 'nlcIKh6sBtc',
    name: 'Royals',
    artist: 'Lorde',
    chords: [
      {
        chord: 'I',
        seconds: 56.59,
      },
      {
        chord: 'bVII',
        seconds: 62.12,
      },
      {
        chord: 'IV',
        seconds: 64.84,
      },
    ],
    endSeconds: 67.71,
  },
  {
    key: 'C',
    mode: Mode.Mixolydian,
    videoId: 'j8h-Ltha_9w',
    name: 'Freedom',
    artist: 'George Michael',
    chords: [
      {
        chord: 'I',
        seconds: 136.17,
      },
      {
        chord: 'bVII',
        seconds: 138.78,
      },
      {
        chord: 'IV',
        seconds: 141.35,
      },
      {
        chord: 'I',
        seconds: 143.98,
      },
    ],
    endSeconds: 146.9,
  },
  {
    key: 'D',
    mode: Mode.Mixolydian,
    videoId: 'ye5BuYf8q4o',
    name: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    chords: [
      {
        chord: 'I',
        seconds: 70.43,
      },
      {
        chord: 'bVII',
        seconds: 71.74,
      },
      {
        chord: 'IV',
        seconds: 72.93,
      },
    ],
    endSeconds: 75.37,
  },
  {
    name: 'Wonderfall',
    artist: 'Oasis',
    key: 'F#',
    mode: Mode.Dorian,
    videoId: '6hzrDeceEKc',
    chords: [
      {
        chord: 'i',
        seconds: 65.76,
      },
      {
        chord: 'bIII',
        seconds: 67.11,
      },
      {
        chord: 'bVII',
        seconds: 68.51,
      },
      {
        chord: 'IV',
        seconds: 69.9,
      },
    ],
    endSeconds: 71.19,
  },
  {
    name: 'Boulevard of Broken Dreams',
    artist: 'Green Day',
    key: 'F',
    mode: Mode.Dorian,
    videoId: 'Soa3gO7tL-c',
    chords: [
      {
        chord: 'i',
        seconds: 54.6,
      },
      {
        chord: 'bIII',
        seconds: 56.1,
      },
      {
        chord: 'bVII',
        seconds: 57.57,
      },
      {
        chord: 'IV',
        seconds: 58.97,
      },
      {
        chord: 'i',
        seconds: 60.47,
      },
    ],
    endSeconds: 61.16,
  },
  {
    name: 'Mad World',
    artist: 'Gray Jules',
    key: 'F',
    mode: Mode.Dorian,
    videoId: '4N3N1MlvVc4',
    chords: [
      {
        chord: 'i',
        seconds: 17.42,
      },
      {
        chord: 'bIII',
        seconds: 20.12,
      },
      {
        chord: 'bVII',
        seconds: 22.75,
      },
      {
        chord: 'IV',
        seconds: 25.53,
      },
    ],
    endSeconds: 28.42,
  },
  {
    name: "D'You Know What I Mean?",
    artist: 'Oasis',
    key: 'B',
    mode: Mode.Dorian,
    videoId: 'jyJU2136ym4',
    chords: [
      {
        chord: 'i',
        seconds: 76.13,
      },
      {
        chord: 'bIII',
        seconds: 77.5,
      },
      {
        chord: 'bVII',
        seconds: 78.98,
      },
      {
        chord: 'IV',
        seconds: 80.44,
      },
      {
        chord: 'i',
        seconds: 81.98,
      },
    ],
    endSeconds: 83.51,
  },
  {
    name: 'Pumped Up Kicks',
    artist: 'Foster The People',
    key: 'F',
    mode: Mode.Dorian,
    videoId: 'SDTZ7iX4vTQ',
    chords: [
      {
        chord: 'i',
        seconds: 75.52,
      },
      {
        chord: 'bIII',
        seconds: 77.37,
      },
      {
        chord: 'bVII',
        seconds: 79.2,
      },
      {
        chord: 'IV',
        seconds: 81.12,
      },
    ],
    endSeconds: 82.94,
  },
  {
    name: 'Radioactive',
    artist: 'Imagine dragons',
    key: 'E',
    mode: Mode.Dorian,
    videoId: 'ktvTqknDobU',
    chords: [
      {
        chord: 'i',
        seconds: 89.6,
      },
      {
        chord: 'bIII',
        seconds: 91.04,
      },
      {
        chord: 'bVII',
        seconds: 92.83,
      },
      {
        chord: 'IV',
        seconds: 94.65,
      },
    ],
    endSeconds: 96.32,
  },
  {
    name: 'What Goes Around... Comes Around ',
    artist: 'Justin Timberlake',
    key: 'A',
    mode: Mode.Dorian,
    videoId: 'm2Kcv-Pmwkg',
    chords: [
      {
        chord: 'i',
        seconds: 69.4,
      },
      {
        chord: 'bIII',
        seconds: 71.05,
      },
      {
        chord: 'bVII',
        seconds: 72.61,
      },
      {
        chord: 'IV',
        seconds: 74.18,
      },
      {
        chord: 'i',
        seconds: 75.79,
      },
    ],
    endSeconds: 77.52,
  },
  {
    name: "Can't Stop",
    artist: 'Red Hot Chili Peppers',
    key: 'E',
    mode: Mode.Minor,
    videoId: '8DyziWtkfBw',
    chords: [
      {
        chord: 'i',
        seconds: 34.22,
      },
      {
        chord: 'bVII',
        seconds: 36.29,
      },
      {
        chord: 'v',
        seconds: 38.9,
      },
      {
        chord: 'bVI',
        seconds: 41.52,
      },
    ],
    endSeconds: 44.1,
  },
  {
    name: 'Attention',
    artist: 'Charlie Puth',
    mode: Mode.Minor,
    videoId: 'nfs8NYg7yQM',
    key: 'Eb',
    chords: [
      {
        chord: 'i',
        seconds: 106,
      },
      {
        chord: 'bVII',
        seconds: 108.31,
      },
      {
        chord: 'v',
        seconds: 110.61,
      },
      {
        chord: 'bVI',
        seconds: 113.05,
      },
      {
        chord: 'bVII',
        seconds: 114.71,
      },
    ],
    endSeconds: 115.42,
  },
  {
    name: 'Sweet Dreams',
    artist: 'Beyoncé',
    mode: Mode.Minor,
    videoId: 'JlxByc0-V40',
    key: 'Eb',
    chords: [
      {
        chord: 'i',
        seconds: 73.55,
      },
      {
        chord: 'bVII',
        seconds: 75.42,
      },
      {
        chord: 'v',
        seconds: 77.33,
      },
      {
        chord: 'bVI',
        seconds: 79.36,
      },
    ],
    endSeconds: 81.27,
  },
  {
    name: "Can't Hold Us",
    artist: 'Macklemore & Ryan Lewis ',
    mode: Mode.Minor,
    videoId: '2zNSgSzhBfM',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 165,
      },
      {
        chord: 'bVII',
        seconds: 166.46,
      },
      {
        chord: 'v',
        seconds: 168.1,
      },
      {
        chord: 'bVI',
        seconds: 169.74,
      },
    ],
    endSeconds: 171.31,
  },
  {
    name: 'Hello',
    artist: 'Adele',
    mode: Mode.Minor,
    videoId: 'YQHsXMglC9A',
    section: 'Pre-Chorus',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 130,
      },
      {
        chord: 'bVII',
        seconds: 130.79,
      },
      {
        chord: 'v',
        seconds: 132.56,
      },
      {
        chord: 'bVI',
        seconds: 133.69,
      },
      {
        chord: 'i',
        seconds: 135.72,
      },
      {
        chord: 'bVII',
        seconds: 136.79,
      },
      {
        chord: 'bVI',
        seconds: 138.1,
      },
    ],
    endSeconds: 141.85,
  },
  {
    name: 'Someone New',
    artist: 'Hozier',
    mode: Mode.Minor,
    videoId: 'bPJSsAr2iu0',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 55,
      },
      {
        chord: 'bVII',
        seconds: 56.32,
      },
      {
        chord: 'v',
        seconds: 57.58,
      },
      {
        chord: 'bVI',
        seconds: 58.77,
      },
    ],
    endSeconds: 60.12,
  },
  {
    name: 'The Zephyr Song',
    artist: 'Red Hot Chilli Peppers',
    mode: Mode.Minor,
    videoId: '0fcRa5Z6LmU',
    key: 'A',
    chords: [
      {
        chord: 'i',
        seconds: 17,
      },
      {
        chord: 'bVII',
        seconds: 18.82,
      },
      {
        chord: 'v',
        seconds: 20.86,
      },
      {
        chord: 'bVI',
        seconds: 22.88,
      },
    ],
    endSeconds: 25.03,
  },
  {
    name: "Who's that Girl",
    artist: 'Eurythmics',
    mode: Mode.Minor,
    videoId: '-5iDKWV6Chg',
    key: 'A',
    chords: [
      {
        chord: 'i',
        seconds: 68,
      },
      {
        chord: 'bVII',
        seconds: 69.54,
      },
      {
        chord: 'v',
        seconds: 71.49,
      },
      {
        chord: 'bVI',
        seconds: 73.52,
      },
      {
        chord: 'bVII',
        seconds: 74.48,
      },
    ],
    endSeconds: 75.5,
  },
  {
    name: 'SOS',
    artist: 'ABBA',
    mode: Mode.Major,
    videoId: 'cvChjHcABPA',
    key: 'F',
    chords: [
      {
        chord: 'I',
        seconds: 44.55,
      },
      {
        chord: 'V',
        seconds: 45.29,
      },
      {
        chord: 'ii',
        seconds: 46.28,
      },
      {
        chord: 'IV',
        seconds: 47.28,
      },
    ],
    endSeconds: 48.23,
  },
  {
    name: 'Believe',
    artist: 'Cher',
    mode: Mode.Major,
    videoId: 'nZXRV4MezEw',
    key: 'F#',
    chords: [
      {
        chord: 'I',
        seconds: 58.55,
      },
      {
        chord: 'V',
        seconds: 60.35,
      },
      {
        chord: 'ii',
        seconds: 62.18,
      },
      {
        chord: 'IV',
        seconds: 63.95,
      },
    ],
    endSeconds: 65.66,
  },
  {
    name: 'All Star',
    artist: 'Smash Mouth',
    mode: Mode.Major,
    videoId: 'L_jWHffIx5E',
    key: 'F#',
    chords: [
      {
        chord: 'I',
        seconds: 56.23,
      },
      {
        chord: 'V',
        seconds: 57.33,
      },
      {
        chord: 'ii',
        seconds: 58.47,
      },
      {
        chord: 'IV',
        seconds: 59.63,
      },
    ],
    endSeconds: 60.79,
  },
  {
    name: 'Singing In My Sleep',
    artist: 'Semisonic',
    mode: Mode.Major,
    videoId: 'zhS3YP04Fjk',
    key: 'E',
    chords: [
      {
        chord: 'I',
        seconds: 75.69,
      },
      {
        chord: 'V',
        seconds: 77.35,
      },
      {
        chord: 'ii',
        seconds: 79.09,
      },
      {
        chord: 'IV',
        seconds: 80.85,
      },
    ],
    endSeconds: 82.55,
  },
  {
    name: 'Closing Time',
    artist: 'Semisonic',
    mode: Mode.Major,
    videoId: 'xGytDsqkQY8',
    key: 'G',
    chords: [
      {
        chord: 'I',
        seconds: 17.49,
      },
      {
        chord: 'V',
        seconds: 18.55,
      },
      {
        chord: 'ii',
        seconds: 19.83,
      },
      {
        chord: 'IV',
        seconds: 21.15,
      },
    ],
    endSeconds: 22.42,
  },
  {
    name: 'Hot N Cold',
    artist: 'Katy Perry',
    mode: Mode.Major,
    videoId: 'kTHNpusq654',
    key: 'G',
    chords: [
      {
        chord: 'I',
        seconds: 65.38,
      },
      {
        chord: 'V',
        seconds: 67.11,
      },
      {
        chord: 'ii',
        seconds: 68.98,
      },
      {
        chord: 'IV',
        seconds: 70.83,
      },
    ],
    endSeconds: 72.56,
  },
  {
    name: 'Archi, Marry Me',
    artist: 'Alvvays',
    mode: Mode.Major,
    videoId: 'ZAn3JdtSrnY',
    key: 'G',
    chords: [
      {
        chord: 'I',
        seconds: 51.57,
      },
      {
        chord: 'V',
        seconds: 53.38,
      },
      {
        chord: 'ii',
        seconds: 55.38,
      },
      {
        chord: 'IV',
        seconds: 57.41,
      },
    ],
    endSeconds: 59.41,
  },
  {
    name: 'Irreplaceable',
    artist: 'Beyoncé',
    mode: Mode.Major,
    videoId: '2EwViQxSJJQ',
    key: 'F',
    chords: [
      {
        chord: 'I',
        seconds: 62.61,
      },
      {
        chord: 'V',
        seconds: 65.32,
      },
      {
        chord: 'ii',
        seconds: 68.02,
      },
      {
        chord: 'IV',
        seconds: 70.78,
      },
    ],
    endSeconds: 73.4,
  },
  {
    name: 'Just Like Heaven',
    artist: 'The Cure',
    mode: Mode.Major,
    videoId: 'n3nPiBai66M',
    key: 'A',
    chords: [
      {
        chord: 'I',
        seconds: 50.99,
      },
      {
        chord: 'V',
        seconds: 52.56,
      },
      {
        chord: 'ii',
        seconds: 54.19,
      },
      {
        chord: 'IV',
        seconds: 55.64,
      },
    ],
    endSeconds: 57.21,
  },
  {
    name: "I'm Like A Bird",
    artist: 'Nelly Furtado',
    mode: Mode.Major,
    videoId: 'roPQ_M3yJTA',
    key: 'Bb',
    chords: [
      {
        chord: 'I',
        seconds: 65.98,
      },
      {
        chord: 'V',
        seconds: 68.63,
      },
      {
        chord: 'ii',
        seconds: 71.33,
      },
      {
        chord: 'IV',
        seconds: 73.97,
      },
    ],
    endSeconds: 76.6,
  },
  {
    name: 'Scott Street',
    artist: 'Pheobe Bridgers',
    mode: Mode.Major,
    videoId: 'BBBxzmyeNdw',
    key: 'Bb',
    chords: [
      {
        chord: 'I',
        seconds: 15.87,
      },
      {
        chord: 'V',
        seconds: 17.59,
      },
      {
        chord: 'ii',
        seconds: 19.33,
      },
      {
        chord: 'IV',
        seconds: 21.17,
      },
    ],
    endSeconds: 22.87,
  },
  // Axis progression IV-rotation
  {
    name: "What's my age again?",
    artist: 'blink-182',
    mode: Mode.Major,
    videoId: 'K7l5ZeVVoCA',
    key: 'F#',
    chords: [
      {
        chord: 'I',
        seconds: 55.7,
      },
      {
        chord: 'V',
        seconds: 56.54,
      },
      {
        chord: 'vi',
        seconds: 57.28,
      },
      {
        chord: 'IV',
        seconds: 58.01,
      },
    ],
    endSeconds: 58.73,
  },
  {
    name: 'Higher Love',
    artist: 'Steve Winwood',
    mode: Mode.Major,
    videoId: 'k9olaIio3l8',
    key: 'F',
    chords: [
      {
        chord: 'IV',
        seconds: 50.06,
      },
      {
        chord: 'I',
        seconds: 51.26,
      },
      {
        chord: 'V',
        seconds: 52.51,
      },
      {
        chord: 'vi',
        seconds: 53.8,
      },
    ],
    endSeconds: 54.89,
  },
  {
    name: 'Dragonstea Din Tei',
    artist: 'O-Zone',
    mode: Mode.Major,
    videoId: 'YnopHCL1Jk8',
    key: 'C',
    chords: [
      {
        chord: 'IV',
        seconds: 115.05,
      },
      {
        chord: 'I',
        seconds: 116.86,
      },
      {
        chord: 'V',
        seconds: 118.65,
      },
      {
        chord: 'vi',
        seconds: 120.46,
      },
    ],
    endSeconds: 122.35,
  },
  {
    name: 'Boulevard Of Broken Dreams',
    artist: 'Green Day ',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'Soa3gO7tL-c',
    key: 'Ab',
    chords: [
      {
        chord: 'IV',
        seconds: 77.69,
      },
      {
        chord: 'I',
        seconds: 79,
      },
      {
        chord: 'V',
        seconds: 80.61,
      },
      {
        chord: 'vi',
        seconds: 81.93,
      },
    ],
    endSeconds: 83.47,
  },
  {
    name: 'Radar Love',
    artist: 'Goldern Earing',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'ckM51xoTC2U',
    key: 'A',
    chords: [
      {
        chord: 'IV',
        seconds: 79.03,
      },
      {
        chord: 'I',
        seconds: 80.24,
      },
      {
        chord: 'V',
        seconds: 81.46,
      },
      {
        chord: 'vi',
        seconds: 82.56,
      },
    ],
    endSeconds: 83.97,
  },
  {
    name: 'Elastic Heart',
    artist: 'Sia',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'KWZGAExj-es',
    key: 'A',
    chords: [
      {
        chord: 'IV',
        seconds: 61.31,
      },
      {
        chord: 'I',
        seconds: 62.67,
      },
      {
        chord: 'V',
        seconds: 64.65,
      },
      {
        chord: 'vi',
        seconds: 66.52,
      },
    ],
    endSeconds: 68.34,
  },
  {
    name: "Big Girls Don't Cry",
    artist: 'Fergie',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'agrXgrAgQ0U',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 82.61,
      },
      {
        chord: 'I',
        seconds: 84.78,
      },
      {
        chord: 'V',
        seconds: 86.89,
      },
      {
        chord: 'vi',
        seconds: 89,
      },
    ],
    endSeconds: 91.12,
  },
  {
    name: 'Let Her Go',
    artist: 'Passenger',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'RBumgq5yVrA',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 103.67,
      },
      {
        chord: 'I',
        seconds: 105.24,
      },
      {
        chord: 'V',
        seconds: 106.89,
      },
      {
        chord: 'vi',
        seconds: 108.41,
      },
    ],
    endSeconds: 110.05,
  },
  {
    name: 'Bad Blood',
    artist: 'Taylor Swift',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'QcIy9NiNbmo',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 187,
      },
      {
        chord: 'I',
        seconds: 188.13,
      },
      {
        chord: 'V',
        seconds: 189.39,
      },
      {
        chord: 'vi',
        seconds: 190.86,
      },
    ],
    endSeconds: 192.7,
  },
  {
    name: 'Mine',
    artist: 'Taylor Swift',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'XPBwXKgDTdE',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 49,
      },
      {
        chord: 'I',
        seconds: 51.06,
      },
      {
        chord: 'V',
        seconds: 53.03,
      },
      {
        chord: 'vi',
        seconds: 55,
      },
    ],
    endSeconds: 56.94,
  },
  {
    name: 'We Are Never Ever Getting Back Together',
    artist: 'Taylor Swift',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'WA4iX5D9Z64',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 43,
      },
      {
        chord: 'I',
        seconds: 44.27,
      },
      {
        chord: 'V',
        seconds: 45.65,
      },
      {
        chord: 'vi',
        seconds: 47.04,
      },
      {
        chord: 'V',
        seconds: 47.79,
      },
    ],
    endSeconds: 48.71,
  },
  {
    name: 'Misery Business',
    artist: 'Paramore',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'aCyGvGEtOwc',
    key: 'Ab',
    chords: [
      {
        chord: 'IV',
        seconds: 36.92,
      },
      {
        chord: 'I',
        seconds: 38.14,
      },
      {
        chord: 'V',
        seconds: 39.45,
      },
      {
        chord: 'vi',
        seconds: 40.86,
      },
      {
        chord: 'V',
        seconds: 41.5,
      },
    ],
    endSeconds: 42.42,
  },
  {
    name: 'Good 4 u',
    artist: 'Olivia Rodrigo',
    mode: Mode.Major,
    section: 'Chorus',
    videoId: 'gNi_6U5Pm_o',
    key: 'Ab',
    chords: [
      {
        chord: 'IV',
        seconds: 44.74,
      },
      {
        chord: 'I',
        seconds: 45.95,
      },
      {
        chord: 'V',
        seconds: 47.43,
      },
      {
        chord: 'vi',
        seconds: 49.62,
      },
      {
        chord: 'V',
        seconds: 50.01,
      },
      {
        chord: 'IV',
        seconds: 50.44,
      },
    ],
    endSeconds: 51.29,
  },
  {
    name: 'Drive By',
    artist: 'Train',
    mode: Mode.Major,
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords: [
      {
        chord: 'IV',
        seconds: 48.23,
      },
      {
        chord: 'I',
        seconds: 50.14,
      },
      {
        chord: 'V',
        seconds: 52.13,
      },
      {
        chord: 'vi',
        seconds: 54.01,
      },
      {
        chord: 'V',
        seconds: 55.01,
      },
      {
        chord: 'IV',
        seconds: 56,
      },
    ],
    endSeconds: 56.83,
  },
  {
    name: 'Drive By',
    artist: 'Train',
    mode: Mode.Major,
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords: [
      {
        chord: 'IV',
        seconds: 56,
      },
      {
        chord: 'I',
        seconds: 57.9,
      },
      {
        chord: 'V',
        seconds: 59.95,
      },
      {
        chord: 'III',
        seconds: 61.96,
      },
    ],
    endSeconds: 63.89,
  },
  {
    name: 'Drive By',
    artist: 'Train',
    mode: Mode.Major,
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords: [
      {
        chord: 'vi',
        seconds: 16.76,
      },
      {
        chord: 'IV',
        seconds: 18.64,
      },
      {
        chord: 'I',
        seconds: 20.7,
      },
      {
        chord: 'V',
        seconds: 22.59,
      },
    ],
    endSeconds: 24.54,
  },
  {
    name: 'Half Of My Heart',
    artist: 'John Mayer',
    mode: Mode.Major,
    videoId: 'aojTGWAqUIQ',
    key: 'F',
    chords: [
      {
        chord: 'IV',
        seconds: 53.7,
      },
      {
        chord: 'I',
        seconds: 54.47,
      },
      {
        chord: 'V',
        seconds: 55.5,
      },
      {
        chord: 'vi',
        seconds: 56.54,
      },
    ],
    endSeconds: 57.73,
  },
  {
    name: 'Castle Of Glass',
    artist: 'Linkin Park',
    mode: Mode.Major,
    videoId: 'ScNNfyq3d_w',
    key: 'E',
    chords: [
      {
        chord: 'IV',
        seconds: 126.27,
      },
      {
        chord: 'I',
        seconds: 128.48,
      },
      {
        chord: 'V',
        seconds: 130.7,
      },
      {
        chord: 'vi',
        seconds: 132.83,
      },
    ],
    endSeconds: 135.13,
  },
  {
    name: 'Alejandro',
    artist: 'Lady Gaga',
    mode: Mode.Major,
    videoId: 'niqrrmev4mA',
    key: 'D',
    chords: [
      {
        chord: 'IV',
        seconds: 182.27,
      },
      {
        chord: 'I',
        seconds: 183.46,
      },
      {
        chord: 'V',
        seconds: 184.66,
      },
      {
        chord: 'vi',
        seconds: 185.87,
      },
    ],
    endSeconds: 187.1,
  },
  {
    name: "Stacy's Mom",
    artist: 'Fountains of Wayne',
    mode: Mode.Major,
    videoId: 'dZLfasMPOU4',
    key: 'E',
    chords: [
      {
        chord: 'IV',
        seconds: 64.9,
      },
      {
        chord: 'I',
        seconds: 65.78,
      },
      {
        chord: 'V',
        seconds: 66.84,
      },
      {
        chord: 'vi',
        seconds: 67.83,
      },
    ],
    endSeconds: 68.87,
  },
  {
    name: 'More than a feeling',
    artist: 'Boston',
    mode: Mode.Major,
    videoId: 'zOILAZHf2pE',
    key: 'G',
    chords: [
      {
        chord: 'I',
        seconds: 51.18,
      },
      {
        chord: 'IV',
        seconds: 52.2,
      },
      {
        chord: 'vi',
        seconds: 53.36,
      },
      {
        chord: 'V',
        seconds: 54.34,
      },
    ],
    endSeconds: 55.41,
  },
  {
    name: '1985',
    artist: 'Bowling For Soup',
    mode: Mode.Major,
    videoId: 'K38xNqZvBJI',
    key: 'G',
    chords: [
      {
        chord: 'I',
        seconds: 34.54,
      },
      {
        chord: 'IV',
        seconds: 36.56,
      },
      {
        chord: 'vi',
        seconds: 38.47,
      },
      {
        chord: 'V',
        seconds: 40.43,
      },
    ],
    endSeconds: 42.43,
  },
  {
    name: 'Mr. Brightside',
    artist: 'The Killers',
    mode: Mode.Major,
    videoId: 'gGdGFtwCNBE',
    key: 'Db',
    chords: [
      {
        chord: 'I',
        seconds: 61.85,
      },
      {
        chord: 'IV',
        seconds: 63.56,
      },
      {
        chord: 'vi',
        seconds: 65.16,
      },
      {
        chord: 'V',
        seconds: 66.76,
      },
    ],
    endSeconds: 68.29,
  },
  {
    name: 'Shut Up and Dance',
    artist: 'Walk the Moon',
    mode: Mode.Major,
    videoId: '6JCLY0Rlx6Q',
    key: 'Db',
    chords: [
      {
        chord: 'I',
        seconds: 66,
      },
      {
        chord: 'IV',
        seconds: 66.86,
      },
      {
        chord: 'vi',
        seconds: 67.78,
      },
      {
        chord: 'V',
        seconds: 68.67,
      },
    ],
    endSeconds: 69.53,
  },
  {
    name: 'She Drives Me Crazy',
    artist: 'Fine Young Cannibals',
    mode: Mode.Major,
    videoId: 'UtvmTu4zAMg',
    key: 'D',
    chords: [
      {
        chord: 'I',
        seconds: 59.15,
      },
      {
        chord: 'IV',
        seconds: 60.02,
      },
      {
        chord: 'vi',
        seconds: 61.21,
      },
      {
        chord: 'V',
        seconds: 62.18,
      },
    ],
    endSeconds: 63.1,
  },
  {
    name: 'What Makes You Beautiful',
    artist: 'One Direction',
    mode: Mode.Major,
    videoId: 'QJO3ROT-A4E',
    key: 'E',
    chords: [
      {
        chord: 'I',
        seconds: 34.7,
      },
      {
        chord: 'IV',
        seconds: 35.78,
      },
      {
        chord: 'vi',
        seconds: 36.75,
      },
      {
        chord: 'V',
        seconds: 37.49,
      },
    ],
    endSeconds: 38.47,
  },
  {
    name: 'Fidelity',
    artist: 'Regina Spektor',
    mode: Mode.Major,
    videoId: 'wigqKfLWjvM',
    key: 'F',
    chords: [
      {
        chord: 'I',
        seconds: 78.68,
      },
      {
        chord: 'IV',
        seconds: 81.23,
      },
      {
        chord: 'vi',
        seconds: 83.8,
      },
      {
        chord: 'V',
        seconds: 86.36,
      },
    ],
    endSeconds: 88.94,
  },
  {
    name: 'Leave The Door Open',
    artist: 'Bruno Mars',
    mode: Mode.Major,
    videoId: 'adLGHcj_fmA',
    key: 'C',
    chords: [
      {
        chord: 'IV',
        seconds: 58.5,
      },
      {
        chord: 'V',
        seconds: 61.7,
      },
      {
        chord: 'iii',
        seconds: 64.9,
      },
      {
        chord: 'vi',
        seconds: 68.17,
      },
    ],
    endSeconds: 71.37,
  },
  {
    name: "It's Gonna Be Me",
    artist: '*NSYNC',
    mode: Mode.Major,
    videoId: 'GQMlWwIXg3M',
    key: 'Eb',
    chords: [
      {
        chord: 'IV',
        seconds: 42.79,
      },
      {
        chord: 'V',
        seconds: 44.36,
      },
      {
        chord: 'iii',
        seconds: 45.82,
      },
      {
        chord: 'vi',
        seconds: 47.2,
      },
    ],
    endSeconds: 48.61,
  },
  {
    name: 'Titanium',
    artist: 'David Guetta',
    mode: Mode.Major,
    videoId: 'JRfuAukYTKg',
    key: 'Eb',
    chords: [
      {
        chord: 'IV',
        seconds: 60.94,
      },
      {
        chord: 'V',
        seconds: 62.64,
      },
      {
        chord: 'iii',
        seconds: 64.53,
      },
      {
        chord: 'vi',
        seconds: 66.44,
      },
    ],
    endSeconds: 68.38,
  },
  {
    name: 'The Show Must Go On',
    artist: 'Queen',
    section: 'Bridge',
    mode: Mode.Major,
    videoId: 't99KH0TR-J4',
    key: 'C',
    chords: [
      {
        chord: 'IV',
        seconds: 175,
      },
      {
        chord: 'V',
        seconds: 176.13,
      },
      {
        chord: 'iii',
        seconds: 177.69,
      },
      {
        chord: 'vi',
        seconds: 179.06,
      },
    ],
    endSeconds: 179.69,
  },
  {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    mode: Mode.Major,
    videoId: 'dQw4w9WgXcQ',
    key: 'Ab',
    chords: [
      {
        chord: 'IV',
        seconds: 43.42,
      },
      {
        chord: 'V',
        seconds: 44.43,
      },
      {
        chord: 'iii',
        seconds: 45.46,
      },
      {
        chord: 'vi',
        seconds: 46.49,
      },
    ],
    endSeconds: 47.46,
  },
  {
    name: 'Together Forever',
    artist: 'Rick Astley',
    mode: Mode.Major,
    videoId: 'yPYZpwSpKmA',
    key: 'G',
    chords: [
      {
        chord: 'IV',
        seconds: 10.61,
      },
      {
        chord: 'V',
        seconds: 11.11,
      },
      {
        chord: 'iii',
        seconds: 12.2,
      },
      {
        chord: 'vi',
        seconds: 13.2,
      },
    ],
    endSeconds: 14.27,
  },
  {
    name: 'Santa Monica',
    artist: 'Theory of a Deadman',
    key: 'E',
    mode: 6,
    videoId: 'jcryyvQAqc8',
    chords: [
      {
        seconds: 48.48,
        chord: 'i',
      },
      {
        seconds: 52.45,
        chord: 'bIII',
      },
      {
        seconds: 56.45,
        chord: 'bVII',
      },
      {
        seconds: 60.36,
        chord: 'bVI',
      },
    ],
    endSeconds: 63.76,
    section: 'chorus',
  },
  {
    name: 'Broken',
    artist: 'Seether ft. Amy Lee',
    key: 'Eb',
    mode: 6,
    videoId: 'hPC2Fp7IT7o',
    chords: [
      {
        seconds: 18.7,
        chord: 'i',
      },
      {
        seconds: 20.3,
        chord: 'bVI',
      },
      {
        seconds: 22.85,
        chord: 'i',
      },
      {
        seconds: 24.39,
        chord: 'bVI',
      },
      {
        seconds: 26.56,
        chord: 'i',
      },
      {
        chord: 'bVI',
        seconds: 28.14,
      },
      {
        chord: 'bVII',
        seconds: 30.6,
      },
    ],
    endSeconds: 34.01,
    section: 'verse',
  },
  {
    name: 'Broken',
    artist: 'Seether ft. Amy Lee',
    key: 'Eb',
    mode: 6,
    videoId: 'hPC2Fp7IT7o',
    chords: [
      {
        seconds: 112.03,
        chord: 'bVI',
      },
      {
        seconds: 113.54,
        chord: 'i',
      },
      {
        seconds: 115.94,
        chord: 'bVI',
      },
      {
        seconds: 118,
        chord: 'i',
      },
    ],
    endSeconds: 118.73,
    section: 'chorus',
  },
  {
    name: 'When The Sun Goes Down',
    artist: 'Arctic Monkeys',
    key: 'B',
    mode: 1,
    videoId: 'yUatH8zI6Qc',
    chords: [
      {
        seconds: 0,
        chord: 'I',
      },
      {
        seconds: 2.64,
        chord: 'III',
      },
      {
        seconds: 4.23,
        chord: 'IV',
      },
      {
        seconds: 6.01,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 8.24,
      },
      {
        chord: 'iii',
        seconds: 10.02,
      },
      {
        chord: 'ii',
        seconds: 11.95,
      },
    ],
    endSeconds: 13.6,
    section: 'intro',
  },
  {
    name: 'When The Sun Goes Down',
    artist: 'Arctic Monkeys',
    key: 'B',
    mode: 6,
    videoId: 'yUatH8zI6Qc',
    chords: [
      {
        seconds: 104.27,
        chord: 'iv',
      },
      {
        seconds: 105.01,
        chord: 'v',
      },
      {
        seconds: 105.73,
        chord: 'i',
      },
      {
        seconds: 107.19,
        chord: 'iv',
      },
      {
        chord: 'v',
        seconds: 107.98,
      },
      {
        chord: 'i',
        seconds: 108.74,
      },
      {
        chord: 'bVII',
        seconds: 110.21,
      },
      {
        seconds: 111.69,
        chord: 'V',
      },
    ],
    endSeconds: 113.09,
    section: 'chorus',
  },
  {
    name: 'Here It Goes Again',
    artist: 'OK Go',
    key: 'C',
    mode: 1,
    videoId: 'XJulhGUh8vU',
    chords: [
      {
        seconds: 39.29,
        chord: 'I',
      },
      {
        seconds: 40.91,
        chord: 'V',
      },
      {
        seconds: 42.58,
        chord: 'bVII',
      },
      {
        seconds: 44.22,
        chord: 'IV',
      },
    ],
    endSeconds: 45.9,
  },
  {
    name: 'Build Me Up Buttercup',
    artist: 'The Foundations',
    key: 'C',
    mode: 1,
    videoId: 'hSofzQURQDk',
    chords: [
      {
        seconds: 51.26,
        chord: 'I',
      },
      {
        seconds: 52.11,
        chord: 'V',
      },
      {
        seconds: 53.02,
        chord: 'bVII',
      },
      {
        seconds: 53.89,
        chord: 'IV',
      },
    ],
    endSeconds: 54.79,
  },
  {
    name: 'We Used to Be Friends',
    artist: 'The Dandy Warhols',
    key: 'A',
    mode: 1,
    videoId: 'Bm1g5Yg0hUw',
    chords: [
      {
        seconds: 55.54,
        chord: 'I',
      },
      {
        seconds: 56.41,
        chord: 'V',
      },
      {
        seconds: 57.73,
        chord: 'bVII',
      },
      {
        seconds: 58.72,
        chord: 'IV',
      },
    ],
    endSeconds: 60,
  },
  {
    name: 'Wateerfalls',
    artist: 'TLC',
    key: 'Eb',
    mode: 1,
    videoId: '8WEtxJ4-sh4',
    chords: [
      {
        seconds: 62.14,
        chord: 'I',
      },
      {
        seconds: 64.83,
        chord: 'V',
      },
      {
        seconds: 67.65,
        chord: 'bVII',
      },
      {
        seconds: 70.4,
        chord: 'IV',
      },
    ],
    endSeconds: 73.26,
  },
  {
    name: 'Rio',
    artist: 'Duran Duran',
    key: 'E',
    mode: 1,
    videoId: 'nTizYn3-QN0',
    chords: [
      {
        seconds: 64.11,
        chord: 'I',
      },
      {
        seconds: 65.61,
        chord: 'V',
      },
      {
        seconds: 67.32,
        chord: 'bVII',
      },
      {
        seconds: 69.03,
        chord: 'IV',
      },
    ],
    endSeconds: 70.69,
  },
  {
    name: 'Show Me Love',
    artist: 'Robyn',
    key: 'E',
    mode: 1,
    videoId: 'bhWEI6-_w9E',
    chords: [
      {
        seconds: 55.97,
        chord: 'I',
      },
      {
        seconds: 57.23,
        chord: 'V',
      },
      {
        seconds: 58.58,
        chord: 'bVII',
      },
      {
        seconds: 59.87,
        chord: 'IV',
      },
    ],
    endSeconds: 61.24,
  },
  {
    name: 'Linger',
    artist: 'The Cranberries',
    key: 'D',
    mode: 1,
    videoId: 'G6Kspj3OO0s',
    chords: [
      {
        seconds: 153.32,
        chord: 'I',
      },
      {
        seconds: 158.39,
        chord: 'V',
      },
      {
        seconds: 163.42,
        chord: 'bVII',
      },
      {
        seconds: 168.55,
        chord: 'IV',
      },
    ],
    endSeconds: 173.55,
  },
  {
    name: 'Satellite of Love',
    artist: 'Lou Reed',
    key: 'F',
    mode: 1,
    videoId: 'kJoHspUta-E',
    chords: [
      {
        seconds: 26.59,
        chord: 'I',
      },
      {
        seconds: 28.57,
        chord: 'V',
      },
      {
        seconds: 30.52,
        chord: 'bVII',
      },
      {
        seconds: 32.54,
        chord: 'IV',
      },
    ],
    endSeconds: 34.4,
  },
  {
    name: 'Trurning Japanese',
    artist: 'The Vapors',
    key: 'G',
    mode: 1,
    videoId: 'nGy9uomagO4',
    chords: [
      {
        seconds: 73.5,
        chord: 'I',
      },
      {
        seconds: 76.18,
        chord: 'V',
      },
      {
        seconds: 78.87,
        chord: 'bVII',
      },
      {
        seconds: 81.54,
        chord: 'IV',
      },
    ],
    endSeconds: 84.19,
  },
  {
    name: 'Up&Up',
    artist: 'Coldplay',
    key: 'G',
    mode: 1,
    videoId: 'BPNTC7uZYrI',
    chords: [
      {
        seconds: 60.44,
        chord: 'I',
      },
      {
        seconds: 63.29,
        chord: 'V',
      },
      {
        seconds: 66.12,
        chord: 'bVII',
      },
      {
        seconds: 69.08,
        chord: 'IV',
      },
    ],
    endSeconds: 71.85,
  },
  {
    name: 'Ashes To Ashes',
    artist: 'David Bowie',
    key: 'Bb',
    mode: 1,
    videoId: 'HyMm4rJemtI',
    chords: [
      {
        seconds: 40.94,
        chord: 'I',
      },
      {
        seconds: 44.82,
        chord: 'V',
      },
      {
        seconds: 48.84,
        chord: 'bVII',
      },
      {
        seconds: 52.77,
        chord: 'IV',
      },
    ],
    endSeconds: 56.76,
  },
  {
    name: 'My Girl',
    artist: 'The Temptations',
    key: 'C',
    mode: 1,
    videoId: 'eepLY8J4E6c',
    chords: [
      {
        seconds: 37.36,
        chord: 'I',
      },
      {
        seconds: 38.45,
        chord: 'ii',
      },
      {
        seconds: 39.62,
        chord: 'IV',
      },
      {
        seconds: 40.78,
        chord: 'V',
      },
    ],
    endSeconds: 41.88,
  },
  {
    name: 'My Girl',
    artist: 'blink-182',
    key: 'C',
    mode: 1,
    videoId: 'vVy9Lgpg1m8',
    chords: [
      {
        seconds: 26.82,
        chord: 'I',
      },
      {
        seconds: 27.97,
        chord: 'ii',
      },
      {
        seconds: 29.2,
        chord: 'IV',
      },
      {
        seconds: 30.48,
        chord: 'V',
      },
    ],
    endSeconds: 31.66,
  },
  {
    name: 'Catch My Disease',
    artist: 'blink-182',
    key: 'B',
    mode: 1,
    videoId: 'enhQYHxoNMY',
    chords: [
      {
        seconds: 57.88,
        chord: 'I',
      },
      {
        seconds: 58.65,
        chord: 'ii',
      },
      {
        seconds: 59.91,
        chord: 'IV',
      },
      {
        seconds: 60.65,
        chord: 'V',
      },
    ],
    endSeconds: 61.93,
  },
  {
    name: 'Beneath Your Beautiful',
    artist: 'Labrinth',
    key: 'D',
    mode: 1,
    videoId: 'bqIxCtEveG8',
    chords: [
      {
        seconds: 28.62,
        chord: 'I',
      },
      {
        seconds: 30,
        chord: 'ii',
      },
      {
        seconds: 31.41,
        chord: 'IV',
      },
      {
        seconds: 32.8,
        chord: 'V',
      },
    ],
    endSeconds: 34.19,
    section: 'Verse',
  },
  {
    name: 'Beneath Your Beautiful',
    artist: 'Labrinth',
    key: 'D',
    mode: 1,
    videoId: 'bqIxCtEveG8',
    chords: [
      {
        seconds: 57.08,
        chord: 'I',
      },
      {
        seconds: 58.54,
        chord: 'ii',
      },
      {
        seconds: 59.97,
        chord: 'IV',
      },
      {
        seconds: 61.36,
        chord: 'V',
      },
    ],
    endSeconds: 62.82,
    section: 'Chorus',
  },
  {
    name: 'Accidently In Love',
    artist: 'Counting Crows',
    key: 'G',
    mode: 1,
    videoId: 'Yn8CZyqfex8',
    chords: [
      {
        seconds: 42.37,
        chord: 'I',
      },
      {
        seconds: 43.01,
        chord: 'ii',
      },
      {
        seconds: 43.77,
        chord: 'IV',
      },
      {
        seconds: 44.82,
        chord: 'V',
      },
    ],
    endSeconds: 45.76,
    section: '',
  },
  {
    name: 'Sell Out',
    artist: 'Reel Big Fish',
    key: 'G',
    mode: 1,
    videoId: 'AEKbFMvkLIc',
    chords: [
      {
        seconds: 48.22,
        chord: 'I',
      },
      {
        seconds: 49.24,
        chord: 'ii',
      },
      {
        seconds: 50.47,
        chord: 'IV',
      },
      {
        seconds: 51.52,
        chord: 'V',
      },
    ],
    endSeconds: 52.68,
    section: 'Intro',
  },
  {
    name: 'Sell Out',
    artist: 'Reel Big Fish',
    key: 'G',
    mode: 1,
    videoId: 'AEKbFMvkLIc',
    chords: [
      {
        seconds: 57.16,
        chord: 'I',
      },
      {
        seconds: 58.26,
        chord: 'ii',
      },
      {
        seconds: 59.38,
        chord: 'IV',
      },
      {
        seconds: 60.47,
        chord: 'V',
      },
    ],
    endSeconds: 61.61,
    section: 'Verse',
  },
  {
    name: '99 Luftballons',
    artist: 'NENA',
    key: 'E',
    mode: 1,
    videoId: 'Fpu5a0Bl8eY',
    chords: [
      {
        seconds: 71.34,
        chord: 'I',
      },
      {
        seconds: 72.65,
        chord: 'ii',
      },
      {
        seconds: 73.88,
        chord: 'IV',
      },
      {
        seconds: 75.05,
        chord: 'V',
      },
    ],
    endSeconds: 76.34,
  },
  {
    name: 'Your Song',
    artist: 'Elton John',
    key: 'Eb',
    mode: 1,
    videoId: 'GlPlfCy1urI',
    chords: [
      {
        seconds: 87.87,
        chord: 'I',
      },
      {
        seconds: 89.83,
        chord: 'ii',
      },
      {
        seconds: 91.63,
        chord: 'IV',
      },
      {
        seconds: 93.48,
        chord: 'V',
      },
    ],
    endSeconds: 95.61,
    section: '',
  },
  {
    name: 'Brown Eyed Girl',
    artist: 'Van Morrison',
    key: 'G',
    mode: 1,
    videoId: 'UfmkgQRmmeE',
    chords: [
      {
        seconds: 13.89,
        chord: 'I',
      },
      {
        seconds: 15.51,
        chord: 'IV',
      },
      {
        seconds: 17.1,
        chord: 'I',
      },
      {
        seconds: 18.73,
        chord: 'V',
      },
    ],
    endSeconds: 20.38,
    section: '',
  },
  {
    name: "C'est la vie",
    artist: 'B*Witched',
    key: 'G',
    mode: 1,
    videoId: 'UvjLgjtJKsc',
    chords: [
      {
        seconds: 52.82,
        chord: 'I',
      },
      {
        seconds: 53.77,
        chord: 'IV',
      },
      {
        seconds: 54.98,
        chord: 'I',
      },
      {
        seconds: 55.82,
        chord: 'V',
      },
    ],
    endSeconds: 57.07,
    section: '',
  },
  {
    name: 'Accidently In Love',
    artist: 'Counting Crows',
    key: 'G',
    mode: 1,
    videoId: 'Yn8CZyqfex8',
    chords: [
      {
        seconds: 0.97,
        chord: 'I',
      },
      {
        seconds: 2.23,
        chord: 'IV',
      },
      {
        seconds: 3.96,
        chord: 'I',
      },
      {
        seconds: 5.69,
        chord: 'V',
      },
    ],
    endSeconds: 7.46,
    section: 'Intro',
  },
  {
    name: 'American Pie',
    artist: 'Don McLean',
    key: 'G',
    mode: 1,
    videoId: 'y5ecvBaqHBk',
    chords: [
      {
        seconds: 145.5,
        chord: 'I',
      },
      {
        seconds: 146.28,
        chord: 'IV',
      },
      {
        seconds: 147.26,
        chord: 'I',
      },
      {
        seconds: 148.08,
        chord: 'V',
      },
    ],
    endSeconds: 148.97,
    section: '',
  },
  {
    name: 'Sing The Changes',
    artist: 'Paul McCartney',
    key: 'F',
    mode: 1,
    videoId: 'S6EbORrYL0k',
    chords: [
      {
        seconds: 27.67,
        chord: 'I',
      },
      {
        seconds: 29.51,
        chord: 'IV',
      },
      {
        seconds: 31.43,
        chord: 'I',
      },
      {
        seconds: 33.39,
        chord: 'V',
      },
    ],
    endSeconds: 35.24,
    section: '',
  },
  {
    name: 'The Lion Sleeps Tonight',
    artist: 'The Tokens',
    key: 'F',
    mode: 1,
    videoId: 'OQlByoPdG6c',
    chords: [
      {
        seconds: 79.55,
        chord: 'I',
      },
      {
        seconds: 81.49,
        chord: 'IV',
      },
      {
        seconds: 83.42,
        chord: 'I',
      },
      {
        seconds: 85.37,
        chord: 'V',
      },
    ],
    endSeconds: 87.27,
    section: '',
  },
  {
    name: 'Another Saturday Night',
    artist: 'Sam Cooke',
    key: 'A',
    mode: 1,
    videoId: '82Zee5X70EQ',
    chords: [
      {
        seconds: 1.75,
        chord: 'I',
      },
      {
        seconds: 3.69,
        chord: 'IV',
      },
      {
        seconds: 5.61,
        chord: 'I',
      },
      {
        seconds: 7.54,
        chord: 'V',
      },
    ],
    endSeconds: 9.42,
    section: '',
  },
  {
    name: 'MMMBop',
    artist: 'Hanson',
    key: 'A',
    mode: 1,
    videoId: 'NHozn0YXAeE',
    chords: [
      {
        seconds: 54.81,
        chord: 'I',
      },
      {
        seconds: 57.1,
        chord: 'IV',
      },
      {
        seconds: 59.41,
        chord: 'I',
      },
      {
        seconds: 61.7,
        chord: 'V',
      },
    ],
    endSeconds: 63.97,
    section: '',
  },
  {
    name: 'MMMBop',
    artist: 'Hanson',
    key: 'A',
    mode: 1,
    videoId: 'NHozn0YXAeE',
    chords: [
      {
        seconds: 54.81,
        chord: 'I',
      },
      {
        seconds: 57.1,
        chord: 'IV',
      },
      {
        seconds: 59.41,
        chord: 'I',
      },
      {
        seconds: 61.7,
        chord: 'V',
      },
    ],
    endSeconds: 63.97,
    section: '',
  },
  {
    name: 'Goodbye Earl',
    artist: 'The Chicks',
    key: 'C',
    mode: 1,
    videoId: 'Gw7gNf_9njs',
    chords: [
      {
        seconds: 32.02,
        chord: 'I',
      },
      {
        seconds: 33.9,
        chord: 'IV',
      },
      {
        seconds: 35.89,
        chord: 'I',
      },
      {
        seconds: 37.85,
        chord: 'V',
      },
    ],
    endSeconds: 39.78,
    section: '',
  },
  {
    name: 'Try Everything',
    artist: 'Shakira',
    key: 'Db',
    mode: 1,
    videoId: 'c6rP-YP4c5I',
    chords: [
      {
        seconds: 0.33,
        chord: 'I',
      },
      {
        seconds: 2.69,
        chord: 'IV',
      },
      {
        seconds: 4.8,
        chord: 'I',
      },
      {
        seconds: 6.89,
        chord: 'V',
      },
    ],
    endSeconds: 8.84,
    section: '',
  },
  {
    name: 'Killing in the Name',
    artist: 'Rage Against the Machine',
    key: 'D',
    mode: 3,
    videoId: 'JYJ6QJqy92s',
    chords: [
      {
        seconds: 17.64,
        chord: 'i',
      },
      {
        seconds: 18.39,
        chord: 'bII',
      },
      {
        seconds: 19.25,
        chord: 'i',
      },
      {
        seconds: 20.21,
        chord: 'bII',
      },
    ],
    endSeconds: 21.14,
    section: '',
  },
  {
    name: 'Points of Authority',
    artist: 'Linkin Park',
    key: 'Eb',
    mode: 3,
    videoId: 'yoCD5wZEgo4',
    chords: [
      {
        seconds: 50.43,
        chord: 'i',
      },
      {
        seconds: 52.88,
        chord: 'bII',
      },
      {
        seconds: 55.4,
        chord: 'i',
      },
      {
        seconds: 57.9,
        chord: 'bII',
      },
    ],
    endSeconds: 60.45,
    section: '',
  },
  {
    name: 'How You Like That',
    artist: 'Blackpink',
    key: 'Eb',
    mode: 3,
    videoId: 'ioNng23DkIM',
    chords: [
      {
        seconds: 2.64,
        chord: 'i',
      },
      {
        seconds: 3.32,
        chord: 'bII',
      },
      {
        seconds: 4.29,
        chord: 'i',
      },
      {
        seconds: 5.21,
        chord: 'bII',
      },
    ],
    endSeconds: 6.09,
    section: '',
  },
  {
    name: 'Remember Tomorrow',
    artist: 'Iron Maiden',
    key: 'E',
    mode: 3,
    videoId: 'C5OkO-Tg2uk',
    chords: [
      {
        seconds: 19.71,
        chord: 'i',
      },
      {
        seconds: 24.67,
        chord: 'bII',
      },
      {
        seconds: 27.02,
        chord: 'i',
      },
      {
        seconds: 34.48,
        chord: 'bII',
      },
    ],
    endSeconds: 36.93,
    section: '',
  },
  {
    key: 'G',
    mode: 3,
    videoId: 'qlv3ZzFd_xg',
    name: 'Hunter',
    artist: 'Björk',
    chords: [
      {
        seconds: 28.12,
        chord: 'i',
      },
      {
        seconds: 31.12,
        chord: 'bII',
      },
      {
        seconds: 34.05,
        chord: 'i',
      },
      {
        seconds: 37.14,
        chord: 'bII',
      },
    ],
    endSeconds: 40.09,
  },
  {
    key: 'A',
    mode: 3,
    videoId: 'bcCQw4iv7uM',
    name: 'Like a Pen',
    artist: 'The Knife',
    chords: [
      {
        seconds: 51.87,
        chord: 'i',
      },
      {
        seconds: 53.76,
        chord: 'bII',
      },
      {
        seconds: 57.55,
        chord: 'i',
      },
      {
        seconds: 61.41,
        chord: 'bII',
      },
    ],
    endSeconds: 65.32,
  },
  {
    key: 'Eb',
    mode: 3,
    videoId: 'rRZdai5UPjE',
    name: 'Mysterons',
    artist: 'Portishead',
    chords: [
      {
        seconds: 69.9,
        chord: 'i',
      },
      {
        seconds: 72.7,
        chord: 'bII',
      },
      {
        seconds: 75.63,
        chord: 'i',
      },
      {
        seconds: 78.44,
        chord: 'bII',
      },
    ],
    endSeconds: 81.39,
  },
  {
    key: 'F',
    mode: 3,
    videoId: 'oPQ3o14ksaM',
    name: 'Get Busy',
    artist: 'Sean Paul',
    chords: [
      {
        seconds: 3,
        chord: 'i',
      },
      {
        seconds: 4.78,
        chord: 'bII',
      },
      {
        seconds: 5.42,
        chord: 'i',
      },
      {
        seconds: 7.12,
        chord: 'bII',
      },
    ],
    endSeconds: 7.81,
  },
  {
    key: 'G',
    mode: 3,
    videoId: 'A8RDBD7D7QE',
    name: 'Dead Right Now',
    artist: 'Lil Nas X',
    chords: [
      {
        seconds: 53.28,
        chord: 'i',
      },
      {
        seconds: 57.04,
        chord: 'bII',
      },
      {
        seconds: 60.67,
        chord: 'i',
      },
      {
        seconds: 64.5,
        chord: 'bII',
      },
    ],
    endSeconds: 68.11,
  },
  {
    key: 'G',
    mode: 3,
    videoId: 'jHYFgP4Btrc',
    name: 'Good Stuff',
    artist: 'Kelis',
    chords: [
      {
        seconds: 62.16,
        chord: 'i',
      },
      {
        seconds: 64.55,
        chord: 'bII',
      },
      {
        seconds: 66.98,
        chord: 'i',
      },
      {
        seconds: 69.39,
        chord: 'bII',
      },
    ],
    endSeconds: 71.83,
  },
  {
    key: 'E',
    mode: 1,
    videoId: 'R_rUYuFtNO4',
    name: 'Red',
    artist: 'Taylor Swift',
    chords: [
      {
        seconds: 38.5,
        chord: 'IV',
      },
      {
        seconds: 40.4,
        chord: 'I',
      },
      {
        seconds: 42.3,
        chord: 'V',
      },
    ],
    endSeconds: 46.15,
  },
  {
    key: 'D',
    mode: 1,
    videoId: 'V_A20lBsBMM',
    name: 'Stoned at the Nail Salon',
    artist: 'Lorde',
    chords: [
      {
        seconds: 48.57,
        chord: 'IV',
      },
      {
        seconds: 50.47,
        chord: 'I',
      },
      {
        seconds: 52.42,
        chord: 'V',
      },
    ],
    endSeconds: 56.06,
  },
  {
    key: 'Eb',
    mode: 1,
    videoId: 'k0QWX2M7W7M',
    name: 'Boys Will Be Boys',
    artist: 'Dua Lipa',
    chords: [
      {
        seconds: 63.15,
        chord: 'IV',
      },
      {
        seconds: 65.13,
        chord: 'I',
      },
      {
        seconds: 66.97,
        chord: 'V',
      },
    ],
    endSeconds: 70.91,
  },
  {
    key: 'Eb',
    mode: 1,
    videoId: 'XoFJbeBXuCc',
    name: "I'm Outta Here!",
    artist: 'Shania Twain',
    chords: [
      {
        seconds: 91.27,
        chord: 'IV',
      },
      {
        seconds: 93.2,
        chord: 'I',
      },
      {
        seconds: 95.07,
        chord: 'V',
      },
    ],
    endSeconds: 99.04,
  },
  {
    key: 'G',
    mode: 1,
    videoId: 'agrXgrAgQ0U',
    name: "Big Girls Don't Cry",
    artist: 'Fergie',
    chords: [
      {
        seconds: 74.37,
        chord: 'IV',
      },
      {
        seconds: 76.31,
        chord: 'I',
      },
      {
        seconds: 78.51,
        chord: 'V',
      },
    ],
    endSeconds: 82.72,
  },
  {
    key: 'F',
    mode: 1,
    videoId: '79fzeNUqQbQ',
    name: 'Like A Prayer',
    artist: 'Madonna',
    chords: [
      {
        seconds: 84.57,
        chord: 'IV',
      },
      {
        seconds: 86.74,
        chord: 'I',
      },
      {
        seconds: 88.8,
        chord: 'V',
      },
    ],
    endSeconds: 92.53,
  },
  {
    name: 'On My Way',
    artist: 'Phil Collins',
    key: 'C',
    mode: 1,
    videoId: 'vsE0KtttoBs',
    chords: [
      {
        seconds: 9.53,
        chord: 'I',
      },
      {
        seconds: 11.76,
        chord: 'I7/b7',
      },
      {
        seconds: 13.99,
        chord: 'vi7',
      },
      {
        seconds: 16.34,
        chord: 'V',
      },
    ],
    endSeconds: 18.8,
    section: 'Intro',
  },
  {
    name: 'Perry The Platypus',
    artist: 'Phineas And Ferb',
    key: 'G',
    mode: 6,
    videoId: 'AsYREFwxYFI',
    chords: [
      {
        seconds: 20.77,
        chord: 'i',
      },
      {
        seconds: 22.18,
        chord: 'i#5',
      },
      {
        seconds: 23.69,
        chord: 'i6',
      },
      {
        seconds: 25.18,
        chord: 'i#5',
      },
    ],
    endSeconds: 26.61,
  },
  {
    name: 'Perry The Platypus',
    artist: 'Phineas And Ferb',
    key: 'G',
    mode: 6,
    videoId: 'AsYREFwxYFI',
    chords: [
      {
        seconds: 26.65,
        chord: 'i',
      },
      {
        seconds: 28,
        chord: 'i#5',
      },
      {
        seconds: 29.54,
        chord: 'V',
      },
    ],
    endSeconds: 32.51,
  },
  {
    name: 'Perry The Platypus',
    artist: 'Phineas And Ferb',
    key: 'G',
    mode: 6,
    videoId: 'AsYREFwxYFI',
    chords: [
      {
        seconds: 32.59,
        chord: 'iv',
      },
      {
        seconds: 35.53,
        chord: 'i',
      },
      {
        seconds: 38.43,
        chord: 'iv',
      },
      {
        chord: 'V',
        seconds: 41.57,
      },
    ],
    endSeconds: 45.46,
  },
  {
    name: "Driver's License",
    artist: 'Olivia Rodrigo ',
    key: 'Bb',
    mode: 1,
    videoId: 'ZmDBbnmKpqQ',
    chords: [
      {
        seconds: 58.8,
        chord: 'IV',
      },
      {
        seconds: 65.51,
        chord: 'I',
      },
      {
        seconds: 68.82,
        chord: 'IV',
      },
      {
        seconds: 75.42,
        chord: 'I',
      },
    ],
    endSeconds: 78.68,
  },
  {
    name: "Driver's License",
    artist: 'Olivia Rodrigo ',
    key: 'Bb',
    mode: 1,
    videoId: 'ZmDBbnmKpqQ',
    chords: [
      {
        seconds: 78.84,
        chord: 'vi',
      },
      {
        seconds: 79.63,
        chord: 'V',
      },
      {
        seconds: 80.49,
        chord: 'I',
      },
      {
        seconds: 81.32,
        chord: 'I/3',
      },
      {
        chord: 'IV',
        seconds: 82.26,
      },
    ],
    endSeconds: 85.41,
  },
  {
    name: "Driver's License",
    artist: 'Olivia Rodrigo ',
    key: 'Bb',
    mode: 1,
    videoId: 'ZmDBbnmKpqQ',
    chords: [
      {
        seconds: 85.48,
        chord: 'ii',
      },
      {
        seconds: 87.21,
        chord: 'V',
      },
      {
        seconds: 88.77,
        chord: 'I',
      },
    ],
    endSeconds: 90.82,
  },
  {
    name: 'Welcome To The Black Parade',
    artist: 'Chemical Romance',
    key: 'G',
    mode: 1,
    videoId: 'RRKJiM9Njr8',
    chords: [
      {
        seconds: 51.23,
        chord: 'I',
      },
      {
        seconds: 52.78,
        chord: 'V/7',
      },
      {
        seconds: 54.36,
        chord: 'vi',
      },
      {
        seconds: 55.95,
        chord: 'I/5',
      },
      {
        chord: 'IV',
        seconds: 57.58,
      },
      {
        chord: 'iii',
        seconds: 59.16,
      },
      {
        chord: 'ii',
        seconds: 60.75,
      },
      {
        chord: 'V',
        seconds: 62.44,
      },
    ],
    endSeconds: 64.07,
  },
  {
    name: 'A whiter shade of pale',
    artist: 'Procol Harum',
    key: 'G',
    mode: 1,
    videoId: '_BADDeIQWVQ',
    chords: [
      {
        seconds: 26.46,
        chord: 'I',
      },
      {
        seconds: 28.22,
        chord: 'iii/7',
      },
      {
        seconds: 29.85,
        chord: 'vi',
      },
      {
        seconds: 31.48,
        chord: 'I/5',
      },
      {
        chord: 'IV',
        seconds: 33.06,
      },
      {
        chord: 'vi/3',
        seconds: 34.76,
      },
      {
        chord: 'ii',
        seconds: 36.49,
      },
      {
        chord: 'IV/1',
        seconds: 38.09,
      },
    ],
    endSeconds: 39.76,
  },
  {
    name: 'Changes',
    artist: 'David Bowie',
    key: 'C',
    mode: 1,
    videoId: '4BgF7Y3q-as',
    chords: [
      {
        seconds: 56.16,
        chord: 'I',
      },
      {
        seconds: 57.08,
        chord: 'iii/7',
      },
      {
        seconds: 58.31,
        chord: 'vi',
      },
      {
        seconds: 59.27,
        chord: 'I/5',
      },
      {
        chord: 'IV',
        seconds: 60.39,
      },
      {
        chord: 'vi/3',
        seconds: 61.47,
      },
      {
        chord: 'II',
        seconds: 62.51,
      },
      {
        chord: 'V',
        seconds: 63.53,
      },
    ],
    endSeconds: 64.6,
  },
  {
    name: 'Piano Man',
    artist: 'Billy Joel',
    key: 'C',
    mode: 1,
    videoId: 'gxEPV4kolz0',
    chords: [
      {
        seconds: 30.98,
        chord: 'I',
      },
      {
        seconds: 31.96,
        chord: 'V/7',
      },
      {
        seconds: 32.94,
        chord: 'IV/6',
      },
      {
        seconds: 33.95,
        chord: 'I/5',
      },
      {
        chord: 'IVmaj7',
        seconds: 35.18,
      },
      {
        chord: 'I/3',
        seconds: 36.12,
      },
      {
        chord: 'II7',
        seconds: 37.13,
      },
      {
        chord: 'V',
        seconds: 38.22,
      },
    ],
    endSeconds: 39.21,
  },
  {
    name: 'Better Together',
    artist: 'Jack Johnson',
    key: 'F',
    mode: 1,
    videoId: 'RSsTx2TBrww',
    chords: [
      {
        seconds: 8.44,
        chord: 'I',
      },
      {
        seconds: 9.54,
        chord: 'Imaj7/7',
      },
      {
        seconds: 10.58,
        chord: 'vi',
      },
      {
        seconds: 11.66,
        chord: 'V',
      },
      {
        chord: 'IV',
        seconds: 12.8,
      },
      {
        chord: 'IVmaj7/3',
        seconds: 13.79,
      },
      {
        chord: 'ii',
        seconds: 14.89,
      },
      {
        chord: 'V',
        seconds: 15.96,
      },
    ],
    endSeconds: 17.09,
  },
  {
    name: 'Say Yes',
    artist: 'Elliot Smith',
    key: 'F',
    mode: 1,
    videoId: 'IdroEbyrB3s',
    chords: [
      {
        seconds: 16.75,
        chord: 'I',
      },
      {
        seconds: 18.22,
        chord: 'iii/7',
      },
      {
        seconds: 19.82,
        chord: 'vi',
      },
      {
        seconds: 21.39,
        chord: 'V',
      },
      {
        chord: 'IV',
        seconds: 22.89,
      },
      {
        chord: 'vi7/3',
        seconds: 24.47,
      },
      {
        chord: 'II7',
        seconds: 26.02,
      },
    ],
    endSeconds: 29.24,
  },
  {
    name: 'I Want You Back',
    artist: 'The Jackson 5',
    key: 'Ab',
    mode: 1,
    videoId: 'ZDhCVN31kCs',
    chords: [
      {
        seconds: 49.62,
        chord: 'I',
      },
      {
        seconds: 50.26,
        chord: 'Imaj7/7',
      },
      {
        seconds: 50.86,
        chord: 'vi7',
      },
      {
        seconds: 51.4,
        chord: 'I/5',
      },
      {
        chord: 'IV',
        seconds: 52.05,
      },
      {
        chord: 'IVmaj7/3',
        seconds: 52.66,
      },
      {
        chord: 'ii7',
        seconds: 53.23,
      },
      {
        seconds: 53.86,
        chord: 'V11',
      },
    ],
    endSeconds: 54.46,
  },
  {
    name: 'Paradise',
    artist: 'Coldplay',
    key: 'F',
    mode: 1,
    videoId: '1G4isv_Fylg',
    chords: [
      {
        seconds: 168.17,
        chord: 'IV',
      },
      {
        seconds: 169.82,
        chord: 'I',
      },
      {
        seconds: 171.54,
        chord: 'V',
      },
    ],
    endSeconds: 174.92,
  },
  {
    name: 'Paradise',
    artist: 'Coldplay',
    key: 'F',
    mode: 1,
    videoId: '1G4isv_Fylg',
    chords: [
      {
        seconds: 181.94,
        chord: 'ii',
      },
      {
        seconds: 183.36,
        chord: 'IV',
      },
      {
        seconds: 185.22,
        chord: 'I',
      },
      {
        chord: 'V/7',
        seconds: 186.57,
      },
    ],
    endSeconds: 188.61,
  },
  {
    name: 'Paradise',
    artist: 'Coldplay',
    key: 'F',
    mode: 1,
    videoId: '1G4isv_Fylg',
    chords: [
      {
        seconds: 13.78,
        chord: 'ii',
      },
      {
        seconds: 15.05,
        chord: 'IV',
      },
      {
        seconds: 16.85,
        chord: 'I',
      },
      {
        chord: 'V/7',
        seconds: 18.29,
      },
    ],
    endSeconds: 20.37,
  },
  {
    name: 'Paradise',
    artist: 'Coldplay',
    key: 'F',
    mode: 1,
    videoId: '1G4isv_Fylg',
    chords: [
      {
        seconds: 20.42,
        chord: 'ii',
      },
      {
        seconds: 21.79,
        chord: 'IV',
      },
      {
        seconds: 23.72,
        chord: 'I',
      },
      {
        chord: 'V',
        seconds: 25.1,
      },
    ],
    endSeconds: 27.35,
  },
  {
    name: 'Migraine',
    artist: 'Twenty One Pilots',
    key: 'C',
    mode: 1,
    videoId: 'Bs92ejAGLdw',
    chords: [
      {
        seconds: 38.56,
        chord: 'vi',
      },
      {
        seconds: 41.4,
        chord: 'I',
      },
      {
        chord: 'V',
        seconds: 43.43,
      },
    ],
    endSeconds: 44.14,
  },
  {
    name: 'Migraine',
    artist: 'Twenty One Pilots',
    key: 'C',
    mode: 1,
    videoId: 'Bs92ejAGLdw',
    chords: [
      {
        seconds: 77.12,
        chord: 'IV',
      },
      {
        seconds: 78.53,
        chord: 'I',
      },
      {
        chord: 'V',
        seconds: 79.93,
      },
    ],
    endSeconds: 82.7,
  },
  {
    name: 'Some Ngiths',
    artist: 'Fun',
    key: 'C',
    mode: 1,
    videoId: 'qQkBeOisNM0',
    chords: [
      {
        seconds: 89.78,
        chord: 'IV',
      },
      {
        seconds: 90.79,
        chord: 'I',
      },
      {
        chord: 'IV',
        seconds: 91.95,
      },
      {
        chord: 'I',
        seconds: 93.13,
      },
      {
        chord: 'vi',
        seconds: 94.2,
      },
      {
        chord: 'V',
        seconds: 96.41,
      },
    ],
    endSeconds: 98.69,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 10.18,
        chord: 'Imaj7',
      },
      {
        seconds: 12.95,
        chord: 'vi',
      },
      {
        seconds: 15.57,
        chord: 'Imaj7',
      },
      {
        seconds: 18.18,
        chord: 'vi',
      },
    ],
    endSeconds: 20.67,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 20.82,
        chord: 'Imaj7',
      },
      {
        seconds: 23.34,
        chord: 'vi',
      },
      {
        seconds: 25.92,
        chord: 'Imaj7',
      },
      {
        seconds: 28.52,
        chord: 'vi',
      },
    ],
    endSeconds: 31.04,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 31.09,
        chord: 'ii',
      },
      {
        seconds: 33.71,
        chord: 'V',
      },
      {
        seconds: 36.22,
        chord: 'ii',
      },
      {
        seconds: 38.88,
        chord: 'V',
      },
    ],
    endSeconds: 41.23,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 41.44,
        chord: 'v',
      },
      {
        seconds: 42.74,
        chord: 'I',
      },
      {
        seconds: 44.04,
        chord: 'IVmaj7',
      },
      {
        seconds: 46.63,
        chord: 'ii',
      },
      {
        chord: 'V',
        seconds: 47.96,
      },
      {
        chord: 'Imaj7',
        seconds: 49.2,
      },
    ],
    endSeconds: 51.76,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 51.9,
        chord: 'v',
      },
      {
        seconds: 53.09,
        chord: 'I',
      },
      {
        seconds: 54.39,
        chord: 'IVmaj7',
      },
      {
        seconds: 57.02,
        chord: 'ii',
      },
      {
        chord: 'V',
        seconds: 59.55,
      },
    ],
    endSeconds: 62.47,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'Gb',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 83.64,
        chord: 'v',
      },
      {
        seconds: 84.92,
        chord: 'I',
      },
      {
        seconds: 86.2,
        chord: 'IVmaj7',
      },
      {
        seconds: 88.82,
        chord: 'i',
      },
      {
        chord: 'bVII',
        seconds: 90.2,
      },
      {
        chord: 'III',
        seconds: 91.49,
      },
    ],
    endSeconds: 93.99,
  },
  {
    name: 'Familiar',
    artist: 'Rebeca Sugar',
    key: 'G',
    mode: 1,
    videoId: 'butnuhBwQ0A',
    chords: [
      {
        seconds: 94.03,
        chord: 'ii7',
      },
      {
        seconds: 95.34,
        chord: 'V',
      },
      {
        seconds: 96.67,
        chord: 'Imaj7',
      },
      {
        seconds: 99.23,
        chord: 'IV7',
      },
      {
        chord: 'bVII7',
        seconds: 101.86,
      },
      {
        chord: 'VI7',
        seconds: 103.16,
      },
    ],
    endSeconds: 104.52,
  },
  {
    name: 'Sweet Sacrifice ',
    artist: 'Evanescence',
    key: 'F#',
    mode: 6,
    videoId: 'XBYhQnjyrWo',
    chords: [
      {
        seconds: 13.51,
        chord: 'i',
      },
      {
        seconds: 18.3,
        chord: 'bVI',
      },
      {
        seconds: 20.72,
        chord: 'V',
      },
    ],
    endSeconds: 23.17,
  },
  {
    name: 'We are Number One',
    artist: 'Lazy Town',
    key: 'F',
    mode: 6,
    videoId: 'PfYnvDL0Qcw',
    chords: [
      {
        seconds: 34.25,
        chord: 'i',
      },
      {
        seconds: 37.03,
        chord: 'bVI',
      },
      {
        seconds: 38.47,
        chord: 'V',
      },
    ],
    endSeconds: 39.92,
  },
  {
    name: 'Seven Nation Army',
    artist: 'The White Stripes',
    key: 'E',
    mode: 6,
    videoId: '0J2QdDbelmY',
    chords: [
      {
        seconds: 53.65,
        chord: 'i',
      },
      {
        seconds: 55.54,
        chord: 'bVI',
      },
      {
        seconds: 56.53,
        chord: 'V',
      },
    ],
    endSeconds: 57.51,
  },
  {
    name: 'Havana',
    artist: 'Camila Cabella',
    key: 'G',
    mode: 6,
    videoId: 'HCjNJDNzw8Y',
    chords: [
      {
        seconds: 28.16,
        chord: 'i',
      },
      {
        seconds: 29.32,
        chord: 'bVI',
      },
      {
        seconds: 30.16,
        chord: 'V',
      },
    ],
    endSeconds: 32.63,
  },
  {
    name: 'Toxicity',
    artist: 'System of a Down',
    key: 'G',
    mode: 6,
    videoId: 'iywaBOMvYLI',
    chords: [
      {
        seconds: 13.09,
        chord: 'i',
      },
      {
        seconds: 16.13,
        chord: 'bVI',
      },
      {
        seconds: 17.28,
        chord: 'V',
      },
    ],
    endSeconds: 18.82,
  },
  {
    name: 'Sweet Dream',
    artist: 'Eurythmics',
    key: 'C',
    mode: 6,
    videoId: 'qeMFqkcPYcg',
    chords: [
      {
        seconds: 7.69,
        chord: 'i',
      },
      {
        seconds: 9.54,
        chord: 'bVI',
      },
      {
        seconds: 10.46,
        chord: 'V',
      },
    ],
    endSeconds: 11.43,
  },
  {
    name: 'Hate',
    artist: 'Cat Power',
    key: 'A',
    mode: 6,
    videoId: 'I0DmLhpbLZY',
    chords: [
      {
        seconds: 19.43,
        chord: 'i',
      },
      {
        seconds: 21.8,
        chord: 'bVI',
      },
      {
        seconds: 22.97,
        chord: 'V',
      },
    ],
    endSeconds: 24.2,
  },
  {
    name: "Why'd You Lie to Me",
    artist: 'Anastacia',
    key: 'A',
    mode: 6,
    videoId: 'gJPcABsojlU',
    chords: [
      {
        seconds: 9.57,
        chord: 'i',
      },
      {
        seconds: 12.01,
        chord: 'bVI',
      },
      {
        seconds: 13.4,
        chord: 'V',
      },
    ],
    endSeconds: 14.45,
  },
  {
    name: 'History Song',
    artist: 'The Good The Bad, & The Queen',
    key: 'A',
    mode: 6,
    videoId: 'kDh1BZouKps',
    chords: [
      {
        seconds: 11.82,
        chord: 'i',
      },
      {
        seconds: 13.29,
        chord: 'bVI',
      },
      {
        seconds: 14.01,
        chord: 'V',
      },
    ],
    endSeconds: 14.8,
  },
  {
    name: 'Everybody',
    artist: 'Backstreet Boys',
    key: 'Bb',
    mode: 6,
    videoId: '6M6samPEMpM',
    chords: [
      {
        seconds: 159.84,
        chord: 'i',
      },
      {
        seconds: 162,
        chord: 'bVI',
      },
      {
        seconds: 162.86,
        chord: 'V',
      },
    ],
    endSeconds: 164.31,
  },
  {
    name: 'Smooth',
    artist: 'Santana',
    key: 'A',
    mode: 6,
    videoId: '6Whgn_iE5uc',
    chords: [
      {
        seconds: 25.25,
        chord: 'i',
      },
      {
        seconds: 26.24,
        chord: 'bVI',
      },
      {
        seconds: 27.05,
        chord: 'V',
      },
    ],
    endSeconds: 28.21,
  },
  {
    name: 'Viva La Vida',
    artist: 'Coldplay',
    key: 'Ab',
    mode: 1,
    videoId: 'dvgZkm1xWPE',
    chords: [
      {
        seconds: 0.2,
        chord: 'IV',
      },
      {
        seconds: 2.07,
        chord: 'V',
      },
      {
        seconds: 3.94,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 5.37,
      },
    ],
    endSeconds: 7.34,
  },
  {
    name: 'Somewhere Else',
    artist: 'Razorlight',
    key: 'D',
    mode: 1,
    videoId: 'Iun3RtbCE6A',
    chords: [
      {
        seconds: 15.73,
        chord: 'IV',
      },
      {
        seconds: 17.18,
        chord: 'V',
      },
      {
        seconds: 18.65,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 20.2,
      },
    ],
    endSeconds: 21.7,
  },
  {
    name: 'I Want to Hold Your Hand',
    artist: 'The Beatles',
    key: 'Gb',
    mode: 1,
    videoId: 'jenWdylTtzs',
    chords: [
      {
        seconds: 22.6,
        chord: 'IV',
      },
      {
        seconds: 23.48,
        chord: 'V',
      },
      {
        seconds: 24.43,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 25.36,
      },
    ],
    endSeconds: 26.19,
  },
  {
    name: 'Feliz Navidad',
    artist: 'Jose Felicano',
    key: 'D',
    mode: 1,
    videoId: 'N8NcQzMQN_U',
    chords: [
      {
        seconds: 39.97,
        chord: 'IV',
      },
      {
        seconds: 41.58,
        chord: 'V',
      },
      {
        seconds: 43.25,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 44.88,
      },
    ],
    endSeconds: 46.54,
  },
  {
    name: 'Rude',
    artist: 'MAGIC!',
    key: 'Db',
    mode: 1,
    videoId: 'PIh2xe4jnpk',
    chords: [
      {
        seconds: 41.11,
        chord: 'IV',
      },
      {
        seconds: 42.8,
        chord: 'V',
      },
      {
        seconds: 44.44,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 45.97,
      },
    ],
    endSeconds: 47.71,
  },
  {
    name: "Danny's Song",
    artist: 'Kenny Loggins',
    key: 'D',
    mode: 1,
    videoId: '322_GED6Ccs',
    chords: [
      {
        seconds: 28.83,
        chord: 'IV',
      },
      {
        seconds: 30.32,
        chord: 'V',
      },
      {
        seconds: 31.73,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 33.31,
      },
    ],
    endSeconds: 34.7,
  },
  {
    name: 'Collar Full',
    artist: 'Panic! At The Disco',
    key: 'D',
    mode: 1,
    videoId: 'yZAIEAG6Vgk',
    chords: [
      {
        seconds: 50.91,
        chord: 'IV',
      },
      {
        seconds: 52.2,
        chord: 'V',
      },
      {
        seconds: 53.64,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 55.05,
      },
    ],
    endSeconds: 56.44,
  },
  {
    name: 'Trade Mistakes',
    artist: 'Panic! At The Disco',
    key: 'Eb',
    mode: 1,
    videoId: 'sWutvUNc-f8',
    chords: [
      {
        seconds: 26.14,
        chord: 'IV',
      },
      {
        seconds: 27.94,
        chord: 'V',
      },
      {
        seconds: 29.64,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 31.59,
      },
    ],
    endSeconds: 33.49,
  },
  {
    name: "Don't Dream It's Over",
    artist: 'Crowded House',
    key: 'Eb',
    mode: 1,
    videoId: 'J9gKyRmic20',
    chords: [
      {
        seconds: 46.86,
        chord: 'IV',
      },
      {
        seconds: 48.28,
        chord: 'V',
      },
      {
        seconds: 49.67,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 51.19,
      },
    ],
    endSeconds: 52.64,
  },
  {
    name: 'The Man',
    artist: 'Taylor Swift',
    key: 'C',
    mode: 1,
    videoId: 'AqAJLh9wuZ0',
    chords: [
      {
        seconds: 32.75,
        chord: 'IV',
      },
      {
        seconds: 34.92,
        chord: 'V',
      },
      {
        seconds: 37.11,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 39.3,
      },
    ],
    endSeconds: 41.48,
  },
  {
    name: "I'm Not Gonna Teach Your Boyfriend How to Dance With You",
    artist: 'Black Kids',
    key: 'C',
    mode: 1,
    videoId: 'rOV6I4fYnvQ',
    chords: [
      {
        seconds: 23.47,
        chord: 'IV',
      },
      {
        seconds: 25.17,
        chord: 'V',
      },
      {
        seconds: 27.05,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 28.97,
      },
    ],
    endSeconds: 30.97,
  },
  {
    name: 'Walking in Memphis',
    artist: 'Marc Cohn',
    key: 'C',
    mode: 1,
    videoId: 'PgRafRp-P-o',
    chords: [
      {
        seconds: 36.67,
        chord: 'IV',
      },
      {
        seconds: 37.69,
        chord: 'V',
      },
      {
        seconds: 38.56,
        chord: 'I',
      },
      {
        chord: 'vi',
        seconds: 39.39,
      },
    ],
    endSeconds: 40.33,
  },
  {
    name: 'Cheerleader',
    artist: 'OMI ',
    key: 'E',
    mode: 1,
    videoId: 'I_NVUZNsh2E',
    chords: [
      {
        seconds: 31.01,
        chord: 'I',
      },
      {
        seconds: 32.17,
        chord: 'IV',
      },
      {
        seconds: 33.38,
        chord: 'V',
      },
      {
        seconds: 34.54,
        chord: 'IV',
      },
    ],
    endSeconds: 35.73,
  },
  {
    name: 'L.I.F.E.G.O.E.S.O.N.',
    artist: 'Noah And The Whale',
    key: 'E',
    mode: 1,
    videoId: 'mCHzicKq3W4',
    chords: [
      {
        seconds: 42.02,
        chord: 'I',
      },
      {
        seconds: 43.46,
        chord: 'IV',
      },
      {
        seconds: 45.01,
        chord: 'V',
      },
      {
        seconds: 46.28,
        chord: 'IV',
      },
    ],
    endSeconds: 47.77,
  },
  {
    name: 'Summer Nights',
    artist: 'Grease',
    key: 'D',
    mode: 1,
    videoId: '6WIW20iaLcE',
    chords: [
      {
        seconds: 8.03,
        chord: 'I',
      },
      {
        seconds: 9.04,
        chord: 'IV',
      },
      {
        seconds: 10.03,
        chord: 'V',
      },
      {
        seconds: 11.03,
        chord: 'IV',
      },
    ],
    endSeconds: 11.97,
  },
  {
    name: 'Hang On Sloopy',
    artist: 'The McCoys',
    key: 'G',
    mode: 1,
    videoId: 'Nuw8GJbqx94',
    chords: [
      {
        seconds: 8.03,
        chord: 'I',
      },
      {
        seconds: 9.36,
        chord: 'IV',
      },
      {
        seconds: 10.37,
        chord: 'V',
      },
      {
        seconds: 11.5,
        chord: 'IV',
      },
    ],
    endSeconds: 12.52,
  },
  {
    name: 'Ana Ng',
    artist: 'They Might Be Giants',
    key: 'G',
    mode: 1,
    videoId: 'MEjutUbgpH8',
    chords: [
      {
        seconds: 47.47,
        chord: 'I',
      },
      {
        seconds: 48.36,
        chord: 'IV',
      },
      {
        seconds: 49.25,
        chord: 'V',
      },
      {
        seconds: 50.11,
        chord: 'IV',
      },
    ],
    endSeconds: 51.07,
  },
  {
    name: 'Hey Julie',
    artist: 'Fountain of Wayne',
    key: 'G',
    mode: 1,
    videoId: 'NpxYtIrJ-6I',
    chords: [
      {
        seconds: 27.96,
        chord: 'I',
      },
      {
        seconds: 28.76,
        chord: 'IV',
      },
      {
        seconds: 29.65,
        chord: 'V',
      },
      {
        seconds: 30.42,
        chord: 'IV',
      },
    ],
    endSeconds: 31.25,
  },
  {
    name: 'Wild Thing',
    artist: 'The Troggs',
    key: 'A',
    mode: 1,
    videoId: 'gSWInYFVksg',
    chords: [
      {
        seconds: 7.83,
        chord: 'I',
      },
      {
        seconds: 8.76,
        chord: 'IV',
      },
      {
        seconds: 9.94,
        chord: 'V',
      },
      {
        seconds: 11.13,
        chord: 'IV',
      },
    ],
    endSeconds: 12.34,
  },
  {
    name: 'Walking On Sunshine',
    artist: 'Katrina & The Waves',
    key: 'Eb',
    mode: 1,
    videoId: 'iPUmE-tne5U',
    chords: [
      {
        seconds: 18.6,
        chord: 'I',
      },
      {
        seconds: 19.61,
        chord: 'IV',
      },
      {
        seconds: 20.76,
        chord: 'V',
      },
      {
        seconds: 21.8,
        chord: 'IV',
      },
    ],
    endSeconds: 22.98,
  },
  {
    name: 'Lucky',
    artist: 'Radio Head',
    key: 'E',
    mode: 2,
    videoId: 'FsyqsnY7dRA',
    chords: [
      {
        seconds: 68.34,
        chord: 'i',
      },
      {
        seconds: 71.9,
        chord: 'IV',
      },
    ],
    endSeconds: 75.59,
  },
  {
    name: 'Apache',
    artist: 'The Shadows',
    key: 'E',
    mode: 2,
    videoId: '-ss22jmrs_E',
    chords: [
      {
        seconds: 11.02,
        chord: 'i',
      },
      {
        seconds: 12.5,
        chord: 'IV',
      },
      {
        chord: 'i',
        seconds: 14.29,
      },
    ],
    endSeconds: 17.81,
  },
  {
    name: 'No Quarter',
    artist: 'Led Zepelin',
    key: 'C#',
    mode: 2,
    videoId: '_BZLM2j8p5E',
    chords: [
      {
        seconds: 62.15,
        chord: 'i',
      },
      {
        seconds: 66.21,
        chord: 'IV',
      },
      {
        chord: 'i',
        seconds: 68.9,
      },
    ],
    endSeconds: 72.31,
  },
  {
    name: 'The Strokes',
    artist: 'Reptilia',
    key: 'B',
    mode: 2,
    videoId: 'b8-tXG8KrWs',
    chords: [
      {
        seconds: 13.57,
        chord: 'i',
      },
      {
        seconds: 16.84,
        chord: 'IV',
      },
      {
        chord: 'i',
        seconds: 19.85,
      },
      {
        seconds: 22.87,
        chord: 'IV',
      },
    ],
    endSeconds: 25.92,
  },
  {
    name: 'Evil Ways',
    artist: 'Santana',
    key: 'G',
    mode: 2,
    videoId: 'gVPUAntzOl4',
    chords: [
      {
        seconds: 18.52,
        chord: 'i7',
      },
      {
        seconds: 19.47,
        chord: 'IV',
      },
      {
        chord: 'i7',
        seconds: 20.45,
      },
      {
        seconds: 21.55,
        chord: 'IV',
      },
    ],
    endSeconds: 22.63,
  },
  {
    name: 'Laser Gun',
    artist: 'M83',
    key: 'A',
    mode: 2,
    videoId: 'eISdgDJMFnA',
    chords: [
      {
        seconds: 10.36,
        chord: 'i7',
      },
      {
        seconds: 12.89,
        chord: 'IV',
      },
      {
        chord: 'i7',
        seconds: 15.44,
      },
      {
        seconds: 18.06,
        chord: 'IV',
      },
    ],
    endSeconds: 20.53,
  },
  {
    name: 'I Wish',
    artist: 'Stevie Wonder',
    key: 'Eb',
    mode: 2,
    videoId: 'B6cqrjlqjuM',
    chords: [
      {
        seconds: 18.11,
        chord: 'i7',
      },
      {
        seconds: 19.26,
        chord: 'IV7',
      },
      {
        chord: 'i7',
        seconds: 20.39,
      },
      {
        seconds: 21.5,
        chord: 'IV7',
      },
    ],
    endSeconds: 22.57,
  },
  {
    name: 'Flash Light',
    artist: 'Parliament',
    key: 'C',
    mode: 2,
    videoId: '0wBqWb43y6I',
    chords: [
      {
        seconds: 27.59,
        chord: 'i7',
      },
      {
        seconds: 29.83,
        chord: 'IV9',
      },
      {
        chord: 'i7',
        seconds: 32.11,
      },
      {
        seconds: 34.43,
        chord: 'IV9',
      },
    ],
    endSeconds: 36.55,
  },
  {
    name: 'Good Times',
    artist: 'Chic',
    key: 'E',
    mode: 2,
    videoId: '51r5f5OdIY0',
    chords: [
      {
        seconds: 18.69,
        chord: 'i7',
      },
      {
        seconds: 23.01,
        chord: 'IVsus',
      },
      {
        chord: 'IV6',
        seconds: 25.24,
      },
    ],
    endSeconds: 27.49,
  },
  {
    name: 'Canon in D',
    artist: 'Pachelbel',
    key: 'D',
    mode: 1,
    videoId: 'NlprozGcs80',
    chords: [
      {
        seconds: 139.8,
        chord: 'I',
      },
      {
        seconds: 141.38,
        chord: 'V',
      },
      {
        seconds: 142.97,
        chord: 'vi',
      },
      {
        seconds: 144.46,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 146.13,
      },
      {
        chord: 'I',
        seconds: 147.65,
      },
      {
        chord: 'IV',
        seconds: 149.1,
      },
      {
        chord: 'V',
        seconds: 150.91,
      },
    ],
    endSeconds: 152.5,
  },
  {
    name: 'All Together Now',
    artist: 'The Farm',
    key: 'D',
    mode: 1,
    videoId: 'iRgtzZ-mOQo',
    chords: [
      {
        seconds: 85.97,
        chord: 'I',
      },
      {
        seconds: 87.98,
        chord: 'V',
      },
      {
        seconds: 90.05,
        chord: 'vi',
      },
      {
        seconds: 92.23,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 94.34,
      },
      {
        chord: 'I',
        seconds: 96.36,
      },
      {
        chord: 'IV',
        seconds: 98.83,
      },
      {
        chord: 'V',
        seconds: 100.94,
      },
    ],
    endSeconds: 103.01,
  },
  {
    name: 'Ladies and Gentlemen We Are Floating in Space',
    artist: 'Spiritualized',
    key: 'D',
    mode: 1,
    videoId: 'iB7E1D_3Na4',
    chords: [
      {
        seconds: 60.46,
        chord: 'I',
      },
      {
        seconds: 62.14,
        chord: 'V',
      },
      {
        seconds: 63.94,
        chord: 'vi',
      },
      {
        seconds: 65.69,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 67.46,
      },
      {
        chord: 'I',
        seconds: 69.29,
      },
      {
        chord: 'IV',
        seconds: 71.07,
      },
      {
        chord: 'V',
        seconds: 72.87,
      },
    ],
    endSeconds: 74.76,
  },
  {
    name: 'Eyes of the World',
    artist: 'Fleetwood Mac',
    key: 'Bb',
    mode: 1,
    videoId: '-W9pfefHa9I',
    chords: [
      {
        seconds: 1.89,
        chord: 'I',
      },
      {
        seconds: 3.08,
        chord: 'V',
      },
      {
        seconds: 4.72,
        chord: 'vi',
      },
      {
        seconds: 6.33,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 7.94,
      },
      {
        chord: 'I',
        seconds: 9.5,
      },
      {
        chord: 'IV',
        seconds: 11.06,
      },
      {
        chord: 'V',
        seconds: 12.51,
      },
    ],
    endSeconds: 14.11,
  },
  {
    name: 'Memories',
    artist: 'Maroon 5',
    key: 'B',
    mode: 1,
    videoId: 'SlPhMPnQ58k',
    chords: [
      {
        seconds: 10.86,
        chord: 'I',
      },
      {
        seconds: 12.04,
        chord: 'V',
      },
      {
        seconds: 13.44,
        chord: 'vi',
      },
      {
        seconds: 14.64,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 16.02,
      },
      {
        chord: 'I',
        seconds: 17.33,
      },
      {
        chord: 'IV',
        seconds: 18.71,
      },
      {
        chord: 'V',
        seconds: 19.97,
      },
    ],
    endSeconds: 21.31,
  },
  {
    name: 'Step',
    artist: 'Vampire Weekend',
    key: 'Bb',
    mode: 1,
    videoId: '_mDxcDjg9P4',
    chords: [
      {
        seconds: 61.74,
        chord: 'I',
      },
      {
        seconds: 63.18,
        chord: 'V',
      },
      {
        seconds: 64.79,
        chord: 'vi',
      },
      {
        seconds: 66.29,
        chord: 'iii/5',
      },
      {
        chord: 'IV',
        seconds: 67.87,
      },
      {
        chord: 'I',
        seconds: 69.42,
      },
      {
        chord: 'IV',
        seconds: 70.87,
      },
      {
        chord: 'V',
        seconds: 72.41,
      },
    ],
    endSeconds: 73.99,
  },
  {
    name: 'Hook',
    artist: 'Blues Traveler',
    key: 'A',
    mode: 1,
    videoId: 'pdz5kCaCRFM',
    chords: [
      {
        seconds: 58.03,
        chord: 'I',
      },
      {
        seconds: 59.35,
        chord: 'V',
      },
      {
        seconds: 60.83,
        chord: 'vi',
      },
      {
        seconds: 62.19,
        chord: 'III',
      },
      {
        chord: 'IV',
        seconds: 63.68,
      },
      {
        chord: 'I',
        seconds: 65.06,
      },
      {
        chord: 'IV',
        seconds: 66.5,
      },
      {
        chord: 'V',
        seconds: 67.87,
      },
    ],
    endSeconds: 69.52,
  },
  {
    name: "Don't Look Back in Anger",
    artist: 'Oasis',
    key: 'Db',
    mode: 1,
    videoId: 'cmpRLQZkTb8',
    chords: [
      {
        seconds: 70.66,
        chord: 'I',
      },
      {
        seconds: 72.11,
        chord: 'V',
      },
      {
        seconds: 73.56,
        chord: 'vi',
      },
      {
        seconds: 74.88,
        chord: 'III',
      },
      {
        chord: 'IV',
        seconds: 76.45,
      },
      {
        chord: 'V',
        seconds: 77.84,
      },
      {
        chord: 'I',
        seconds: 79.25,
      },
      {
        chord: 'vi',
        seconds: 80.97,
      },
      {
        chord: 'V',
        seconds: 81.65,
      },
    ],
    endSeconds: 82.4,
  },
  {
    name: 'Rain and Tears',
    artist: "Aphrodite's Child",
    key: 'Bb',
    mode: 1,
    videoId: '2I7QG12ojg0',
    chords: [
      {
        seconds: 27.55,
        chord: 'I',
      },
      {
        seconds: 29.02,
        chord: 'V/7',
      },
      {
        seconds: 30.55,
        chord: 'vi',
      },
      {
        seconds: 32.32,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 33.98,
      },
      {
        chord: 'I',
        seconds: 35.62,
      },
      {
        chord: 'IV',
        seconds: 37.32,
      },
      {
        chord: 'V',
        seconds: 38.84,
      },
    ],
    endSeconds: 40.62,
  },
  {
    name: 'Rain and Tears',
    artist: "Aphrodite's Child",
    key: 'Bb',
    mode: 1,
    videoId: '2I7QG12ojg0',
    chords: [
      {
        seconds: 40.54,
        chord: 'I',
      },
      {
        seconds: 42.19,
        chord: 'V/7',
      },
      {
        seconds: 43.74,
        chord: 'vi',
      },
      {
        seconds: 45.33,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 47.16,
      },
      {
        chord: 'I',
        seconds: 48.68,
      },
      {
        chord: 'ii',
        seconds: 50.33,
      },
      {
        chord: 'V',
        seconds: 51.21,
      },
      {
        chord: 'I',
        seconds: 52.08,
      },
    ],
    endSeconds: 53.06,
  },
  {
    name: 'Go West',
    artist: 'Pet Shop Boys',
    key: 'C',
    mode: 1,
    videoId: 'LNBjMRvOB5M',
    chords: [
      {
        seconds: 66.81,
        chord: 'I',
      },
      {
        seconds: 68.63,
        chord: 'V',
      },
      {
        seconds: 70.52,
        chord: 'vi',
      },
      {
        seconds: 72.6,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 74.56,
      },
      {
        chord: 'I',
        seconds: 76.49,
      },
      {
        chord: 'ii',
        seconds: 78.49,
      },
      {
        chord: 'V',
        seconds: 80.43,
      },
    ],
    endSeconds: 82.43,
  },
  {
    name: 'Basket Case',
    artist: 'Green Day',
    key: 'Eb',
    mode: 1,
    videoId: 'NUTGr5t3MoY',
    chords: [
      {
        seconds: 64.1,
        chord: 'I',
      },
      {
        seconds: 65.52,
        chord: 'V',
      },
      {
        seconds: 66.94,
        chord: 'vi',
      },
      {
        seconds: 68.22,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 69.56,
      },
      {
        chord: 'I',
        seconds: 70.81,
      },
      {
        chord: 'V',
        seconds: 72.3,
      },
    ],
    endSeconds: 75.25,
  },
  {
    name: 'The Luckiest',
    artist: 'Ben Folds',
    key: 'D',
    mode: 1,
    videoId: 'zcBqmN62wtw',
    chords: [
      {
        seconds: 90.04,
        chord: 'I',
      },
      {
        seconds: 92.06,
        chord: 'V',
      },
      {
        seconds: 94.05,
        chord: 'vi',
      },
      {
        seconds: 95.94,
        chord: 'iii',
      },
      {
        chord: 'IV',
        seconds: 98,
      },
      {
        chord: 'Vsus',
        seconds: 100.08,
      },
      {
        chord: 'V',
        seconds: 101.21,
      },
      {
        chord: 'I',
        seconds: 102.38,
      },
      {
        chord: 'V',
        seconds: 104.62,
      },
    ],
    endSeconds: 107.12,
  },
  {
    name: 'Spicks and Specks',
    artist: 'Bee Gees',
    key: 'G',
    mode: 1,
    videoId: 'WpK7ZmRaeys',
    chords: [
      {
        seconds: 35.63,
        chord: 'I',
      },
      {
        seconds: 37.52,
        chord: 'V7',
      },
      {
        seconds: 39.47,
        chord: 'vi',
      },
      {
        seconds: 41.39,
        chord: 'III',
      },
      {
        chord: 'IV',
        seconds: 43.27,
      },
      {
        chord: 'I',
        seconds: 45.25,
      },
      {
        chord: 'V7',
        seconds: 47.23,
      },
      {
        chord: 'I',
        seconds: 49.13,
      },
    ],
    endSeconds: 50.25,
  },
];
