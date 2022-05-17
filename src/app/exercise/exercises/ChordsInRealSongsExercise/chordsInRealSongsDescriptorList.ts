import { NoteType } from '../../utility/music/notes/NoteType';
import { RomanNumeralChord } from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';

export interface ProgressionInSongFromYouTubeDescriptor {
  key: NoteType,
  mode: 'MAJOR' | 'MINOR', // will determinate the cadence to play
  videoId: string;
  name?: string;
  artist?: string;
  section?: string;
  chords: {
    seconds: number,
    chord: RomanNumeralChord,
  }[];
  endSeconds: number,
}

export const chordsInRealSongsDescriptorList: ReadonlyArray<Readonly<ProgressionInSongFromYouTubeDescriptor>> = [
  {
    key: 'D',
    mode: 'MAJOR',
    videoId: 'Bg59q4puhmg',
    name: 'Girlfriend',
    artist: 'Avril Lavigne',
    chords: [
      {
        seconds: 36,
        chord: 'I',
      },
      {
        seconds: 39,
        chord: 'V',
      },
      {
        seconds: 42,
        chord: 'vi',
      },
      {
        seconds: 45,
        chord: 'IV',
      },
    ],
    endSeconds: 48,
  },
  {
    key: 'G',
    mode: 'MAJOR',
    videoId: '2AJ4i4S_fP8',
    name: `It's your love`,
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
    'key': 'B',
    'mode': 'MAJOR',
    'videoId': '1cCBqY2B7lI',
    'name': 'Confusion and Frustration in Modern Times',
    'artist': 'Sum 41',
    'chords': [
      {
        'chord': 'vi',
        'seconds': 0,
      },
      {
        'chord': 'IV',
        'seconds': 2.17,
      },
      {
        'chord': 'I',
        'seconds': 4.44,
      },
      {
        'chord': 'V',
        'seconds': 6.41,
      },
      {
        'chord': 'vi',
        'seconds': 8.28,
      },
      {
        'chord': 'IV',
        'seconds': 10.34,
      },
      {
        'chord': 'I',
        'seconds': 12.41,
      },
      {
        'chord': 'V',
        'seconds': 14.48,
      },
      {
        'chord': 'IV',
        'seconds': 16.55,
      },
    ],
    'endSeconds': 18.62,
  },
  {
    'key': 'B',
    'mode': 'MAJOR',
    'videoId': '1cCBqY2B7lI',
    'name': 'Confusion and Frustration in Modern Times',
    'artist': 'Sum 41',
    'chords': [
      {
        'chord': 'I',
        'seconds': 21.92,
      },
      {
        'chord': 'IV',
        'seconds': 22.65,
      },
      {
        'chord': 'vi',
        'seconds': 23.76,
      },
      {
        'chord': 'IV',
        'seconds': 24.64,
      },
      {
        'chord': 'I',
        'seconds': 25.76,
      },
      {
        'chord': 'IV',
        'seconds': 26.81,
      },
      {
        'chord': 'V',
        'seconds': 27.83,
      },
    ],
    'endSeconds': 29.81,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "1cCBqY2B7lI",
    "name": "Confusion and Frustration in Modern Times",
    "artist": "Sum 41",
    "chords": [
      {
        "chord": "I",
        "seconds": 29.81,
      },
      {
        "chord": "vi",
        "seconds": 31.84,
      },
      {
        "chord": "IV",
        "seconds": 32.97,
      },
      {
        "chord": "I",
        "seconds": 34.00,
      },
      {
        "chord": "vi",
        "seconds": 35.93,
      },
      {
        "chord": "IV",
        "seconds": 36.99,
      },
    ],
    "endSeconds": 39.28,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "1cCBqY2B7lI",
    "name": "Confusion and Frustration in Modern Times",
    "artist": "Sum 41",
    "chords": [
      {
        "chord": "vi",
        "seconds": 38.05,
      },
      {
        "chord": "IV",
        "seconds": 39.16,
      },
      {
        "chord": "I",
        "seconds": 40.10,
      },
      {
        "chord": "V",
        "seconds": 41.06,
      },
    ],
    "endSeconds": 42.24,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "1cCBqY2B7lI",
    "name": "Confusion and Frustration in Modern Times",
    "artist": "Sum 41",
    "chords": [
      {
        "chord": "I",
        "seconds": 52.34,
      },
      {
        "chord": "V",
        "seconds": 53.34,
      },
      {
        "chord": "vi",
        "seconds": 54.2,
      },
      {
        "chord": "IV",
        "seconds": 55.25,
      },
    ],
    "endSeconds": 56.56,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "dZX6Q-Bj_xg",
    "name": "Passion Pit Take A Walk",
    "artist": "MilkMan",
    "chords": [
      {
        "chord": "ii",
        "seconds": 37.76,
      },
      {
        "chord": "IV",
        "seconds": 39.81,
      },
      {
        "chord": "vi",
        "seconds": 42.37,
      },
      {
        "chord": "V",
        "seconds": 44.42,
      },
    ],
    "endSeconds": 47.5,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "dZX6Q-Bj_xg",
    "name": "Passion Pit Take A Walk",
    "artist": "MilkMan",
    "chords": [
      {
        "chord": "ii",
        "seconds": 47.3,
      },
      {
        "chord": "IV",
        "seconds": 49.3,
      },
      {
        "chord": "vi",
        "seconds": 51.5,
      },
      {
        "chord": "V",
        "seconds": 53.8,
      },
    ],
    "endSeconds": 55.3,
  },
  {
    "key": "B",
    "mode": "MAJOR",
    "videoId": "dZX6Q-Bj_xg",
    "name": "Passion Pit Take A Walk",
    "artist": "MilkMan",
    "chords": [
      {
        "chord": "IV",
        "seconds": 94.77,
      },
      {
        "chord": "I",
        "seconds": 97.03,
      },
      {
        "chord": "V",
        "seconds": 99.3,
      },
      {
        "chord": "vi",
        "seconds": 101.56,
      },
    ],
    "endSeconds": 104,
  },
  {
    "key": "Db",
    "mode": "MAJOR",
    "videoId": "CvBfHwUxHIk",
    "name": "Umbrella",
    "artist": "Rihanna",
    "chords": [
      {
        "chord": "IV",
        "seconds": 57,
      },
      {
        "chord": "I",
        "seconds": 58.8,
      },
      {
        "chord": "V",
        "seconds": 61.5,
      },
      {
        "chord": "vi",
        "seconds": 64.2,
      },
    ],
    "endSeconds": 67.5,
  },
  {
    "key": "F",
    "mode": "MINOR",
    "videoId": "hTWKbfoikeg",
    "name": "Smells Like Teen Spirit",
    "artist": "",
    "chords": [
      {
        "chord": "i",
        "seconds": 26,
      },
      {
        "chord": "iv",
        "seconds": 27.03,
      },
      {
        "chord": "♭III",
        "seconds": 28.07,
      },
      {
        "chord": "♭VI",
        "seconds": 29.1,
      },
      {
        "chord": "i",
        "seconds": 30.14,
      },
      {
        "chord": "iv",
        "seconds": 31.17,
      },
      {
        "chord": "♭III",
        "seconds": 32.21,
      },
      {
        "chord": "♭VI",
        "seconds": 33.24,
      },
    ],
    "endSeconds": 34.28,
  },
  {
    "key": "F",
    "mode": "MINOR",
    "videoId": "hTWKbfoikeg",
    "name": "Smells Like Teen Spirit",
    "artist": "Nirvana",
    "chords": [
      {
        "chord": "i",
        "seconds": 59.07,
      },
      {
        "chord": "iv",
        "seconds": 59.96,
      },
      {
        "chord": "♭III",
        "seconds": 60.96,
      },
      {
        "chord": "♭VI",
        "seconds": 61.97,
      },
      {
        "chord": "i",
        "seconds": 62.98,
      },
      {
        "chord": "iv",
        "seconds": 63.99,
      },
      {
        "chord": "♭III",
        "seconds": 65.06,
      },
      {
        "chord": "♭VI",
        "seconds": 66.03,
      },
    ],
    "endSeconds": 67.28,
  },
  {
    "key": "F#",
    "mode": "MINOR",
    "videoId": "Zi_XLOBDo_Y",
    "name": "Billie Jean",
    "artist": "Michael Jackson",
    "chords": [
      {
        "chord": "♭VI",
        "seconds": 71.08,
      },
      {
        "chord": "i",
        "seconds": 72.94,
      },
      {
        "chord": "♭VI",
        "seconds": 75.02,
      },
      {
        "chord": "i",
        "seconds": 76.99,
      },
      {
        "chord": "♭VI",
        "seconds": 79.16,
      },
      {
        "chord": "i",
        "seconds": 81.20,
      },
      {
        "chord": "♭VI",
        "seconds": 83.2,
      },
      {
        "chord": "V",
        "seconds": 85.19,
      },
    ],
    "endSeconds": 87.59,
  },
  {
    "key": "Db",
    "mode": "MAJOR",
    "videoId": "1w7OgIMMRc4",
    "name": "Sweet Child O' Mine",
    "artist": "Guns N' Roses",
    chords: [
      {
        seconds: 31,
        chord: 'I',
      },
      {
        seconds: 34.5,
        chord: '♭VII',
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
    "key": "Db",
    "mode": "MAJOR",
    "videoId": "1w7OgIMMRc4",
    "name": "Sweet Child O' Mine",
    "artist": "Guns N' Roses",
    chords: [
      {
        seconds: 61,
        chord: 'V',
      },
      {
        seconds: 63,
        chord: '♭VII',
      },
      {
        seconds: 65,
        chord: 'I',
      },
    ],
    endSeconds: 69,
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "QDYfEBY9NM4",
    "name": "Let It Be",
    "artist": "The Beatles",
    "chords": [
      {
        "chord": "I",
        "seconds": 64.66,
      },
      {
        "chord": "V",
        "seconds": 66.37,
      },
      {
        "chord": "vi",
        "seconds": 68.06,
      },
      {
        "chord": "IV",
        "seconds": 69.62,
      },
    ],
    "endSeconds": 71.35,
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "9OQBDdNHmXo",
    "name": "All Too Well",
    "artist": "Taylor Swift",
    "chords": [
      {
        "chord": "I",
        "seconds": 51.67,
      },
      {
        "chord": "V",
        "seconds": 54.09,
      },
      {
        "chord": "vi",
        "seconds": 56.68,
      },
      {
        "chord": "IV",
        "seconds": 59.41,
      },
    ],
    "endSeconds": 61.87,
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "hnK6CoUZZFc",
    "name": "All Too Well",
    "artist": "Taylor Swift",
    "chords": [
      {
        "chord": "I",
        "seconds": 98.04,
      },
      {
        "chord": "V",
        "seconds": 100.62,
      },
      {
        "chord": "vi",
        "seconds": 103.15,
      },
      {
        "chord": "IV",
        "seconds": 105.74,
      },
    ],
    "endSeconds": 108.31,
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "hLQl3WQQoQ0",
    "name": "Someone Like You",
    "artist": "Adele",
    "chords": [
      {
        "chord": "I",
        "seconds": 73.7,
      },
      {
        "chord": "V",
        "seconds": 75.51,
      },
      {
        "chord": "vi",
        "seconds": 77.33,
      },
      {
        "chord": "IV",
        "seconds": 79.15,
      },
    ],
    "endSeconds": 80.97,
  },
  {
    "key": "E",
    "mode": "MAJOR",
    "videoId": "1k8craCGpgs",
    "name": "Don't Stop Believing",
    "artist": "Journey",
    "chords": [
      {
        "chord": "I",
        "seconds": 17.36,
      },
      {
        "chord": "V",
        "seconds": 19.12,
      },
      {
        "chord": "vi",
        "seconds": 21.39,
      },
      {
        "chord": "IV",
        "seconds": 23.16,
      },
    ],
    "endSeconds": 25.43,
  },
  {
    "key": "F",
    "mode": "MAJOR",
    "videoId": "aF4CWCXirZ8",
    "name": "Can You Feel The Love Tonight",
    "artist": "Elton John",
    "chords": [
      {
        "chord": "I",
        "seconds": 66.11,
      },
      {
        "chord": "V",
        "seconds": 67.69,
      },
      {
        "chord": "vi",
        "seconds": 69.27,
      },
      {
        "chord": "IV",
        "seconds": 70.85,
      },
    ],
    "endSeconds": 72.43,
  },
  {
    "key": "F#",
    "mode": "MAJOR",
    "videoId": "i8dh9gDzmz8",
    "name": "When I Come Around",
    "artist": "Green Day",
    "chords": [
      {
        "chord": "I",
        "seconds": 15.06,
      },
      {
        "chord": "V",
        "seconds": 15.92,
      },
      {
        "chord": "vi",
        "seconds": 17.16,
      },
      {
        "chord": "IV",
        "seconds": 18.06,
      },
    ],
    "endSeconds": 20.01,
  },
  {
    "key": "Ab",
    "mode": "MAJOR",
    "videoId": "moSFlvxnbgk",
    "name": "Let It Go",
    "artist": "Robert and Kristen Anderson-Lopez",
    "chords": [
      {
        "chord": "I",
        "seconds": 60.49,
      },
      {
        "chord": "V",
        "seconds": 62.24,
      },
      {
        "chord": "vi",
        "seconds": 64.07,
      },
      {
        "chord": "IV",
        "seconds": 65.84,
      },
    ],
    "endSeconds": 67.58,
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "kXYiU_JCYtU",
    "name": "Numb",
    "artist": "Linkin Park",
    "chords": [
      {
        "chord": "vi",
        "seconds": 21.7,
      },
      {
        "chord": "IV",
        "seconds": 23.88,
      },
      {
        "chord": "I",
        "seconds": 26.06,
      },
      {
        "chord": "V",
        "seconds": 28.24,
      },
    ],
    "endSeconds": 30.42,
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "fe4EK4HSPkI",
    "name": "Kids",
    "artist": "MGMT",
    "chords": [
      {
        "chord": "vi",
        "seconds": 86.34,
      },
      {
        "chord": "IV",
        "seconds": 88.04,
      },
      {
        "chord": "I",
        "seconds": 89.89,
      },
      {
        "chord": "V",
        "seconds": 91.89,
      },
    ],
    "endSeconds": 94.15,
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "FTQbiNvZqaY",
    "name": "Africa",
    "artist": "Toto",
    "chords": [
      {
        "chord": "vi",
        "seconds": 69.32,
      },
      {
        "chord": "IV",
        "seconds": 70.60,
      },
      {
        "chord": "I",
        "seconds": 71.92,
      },
      {
        "chord": "V",
        "seconds": 73.22,
      },
    ],
    "endSeconds": 74.43,
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "NPBCbTZWnq0",
    "name": "River flows in you",
    "artist": "Yiruma",
    "chords": [
      {
        "chord": "vi",
        "seconds": 53.03,
      },
      {
        "chord": "IV",
        "seconds": 54.59,
      },
      {
        "chord": "I",
        "seconds": 56.28,
      },
      {
        "chord": "V",
        "seconds": 57.87,
      },
    ],
    "endSeconds": 60.04,
  },
  {
    "key": "F",
    "mode": "MAJOR",
    "videoId": "5NPBIwQyPWE",
    "name": "Complicated",
    "artist": "Avril Lavigne",
    "chords": [
      {
        "chord": "vi",
        "seconds": 69.83,
      },
      {
        "chord": "IV",
        "seconds": 70.98,
      },
      {
        "chord": "I",
        "seconds": 72.60,
      },
      {
        "chord": "V",
        "seconds": 74.06,
      },
    ],
    "endSeconds": 75.99,
  },
  {
    "key": "F",
    "mode": "MAJOR",
    "videoId": "SR6iYWJxHqs",
    "name": "Grenade",
    "artist": "Bruno Mars",
    "chords": [
      {
        "chord": "vi",
        "seconds": 39.43,
      },
      {
        "chord": "IV",
        "seconds": 40.49,
      },
      {
        "chord": "I",
        "seconds": 41.56,
      },
      {
        "chord": "V",
        "seconds": 42.61,
      },
    ],
    "endSeconds": 43.61,
  },
  {
    key: 'Ab',
    mode: 'MAJOR',
    videoId: '7I0vkKy504U',
    name: 'San Francisco',
    artist: 'Scott McKenzie',
    chords: [
      {
        "chord": "vi",
        "seconds": 6,
      },
      {
        "chord": "IV",
        "seconds": 8.11,
      },
      {
        "chord": "I",
        "seconds": 10.28,
      },
      {
        "chord": "V",
        "seconds": 12.32,
      },
    ],
    endSeconds: 14.46,
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "dTa2Bzlbjv0",
    "name": "Save Tonight",
    "artist": "Eagle Eye Cherry",
    "chords": [
      {
        "chord": "vi",
        "seconds": 48.17,
      },
      {
        "chord": "IV",
        "seconds": 49.17,
      },
      {
        "chord": "I",
        "seconds": 50.17,
      },
      {
        "chord": "V",
        "seconds": 51.13,
      },
    ],
    "endSeconds": 52.17,
  },
  {
    "key": "G#",
    "mode": "MINOR",
    "videoId": "ZKvhxapM5zo",
    "name": "Hit The Road Jack",
    "artist": "Ray Charles",
    "chords": [
      {
        "chord": "i",
        "seconds": 9.7,
      },
      {
        "chord": "♭VII",
        "seconds": 10.49,
      },
      {
        "chord": "♭VI",
        "seconds": 11.09,
      },
      {
        "chord": "V",
        "seconds": 11.78,
      },
    ],
    "endSeconds": 12.78,
  },
  {
    "key": "D#",
    "mode": "MINOR",
    "videoId": "gO071XuztZA",
    "name": "Good Vibrations",
    "artist": "Beach Boys",
    "chords": [
      {
        "chord": "i",
        "seconds": 0.72,
      },
      {
        "chord": "♭VII",
        "seconds": 3.86,
      },
      {
        "chord": "♭VI",
        "seconds": 6.99,
      },
      {
        "chord": "V",
        "seconds": 10.13,
      },
    ],
    "endSeconds": 13.27,
  },
  {
    "key": "A",
    "mode": "MINOR",
    "videoId": "Vyc8lezaa9g",
    "name": "Citizen Erased",
    "artist": "Muse",
    "chords": [
      {
        "chord": "i",
        "seconds": 471.1,
      },
      {
        "chord": "♭VII",
        "seconds": 473.44,
      },
      {
        "chord": "♭VI",
        "seconds": 475.89,
      },
      {
        "chord": "V",
        "seconds": 478.51,
      },
    ],
    "endSeconds": 481.07,
  },
  {
    "key": "A",
    "mode": "MINOR",
    "videoId": "Vyc8lezaa9g",
    "name": "Summer in the City",
    "artist": "Quincy Jones",
    "chords": [
      {
        "chord": "i",
        "seconds": 481.70,
      },
      {
        "chord": "♭VII",
        "seconds": 482.54,
      },
      {
        "chord": "♭VI",
        "seconds": 484,
      },
      {
        "chord": "V",
        "seconds": 485.53,
      },
    ],
    "endSeconds": 487,
  },
  {
    "key": "F#",
    "mode": "MINOR",
    "videoId": "OTvhWVTwRnM",
    "name": "Happy together",
    "artist": "The Turtles",
    "chords": [
      {
        "chord": "i",
        "seconds": 16.96,
      },
      {
        "chord": "♭VII",
        "seconds": 20.66,
      },
      {
        "chord": "♭VI",
        "seconds": 24.69,
      },
      {
        "chord": "V",
        "seconds": 28.56,
      },
    ],
    "endSeconds": 32.86,
  },
  {
    "key": "F",
    "mode": "MINOR",
    "videoId": "0S13mP_pfEc",
    "name": "Runaway",
    "artist": "Del Shannon",
    "chords": [
      {
        "chord": "i",
        "seconds": 6.96,
      },
      {
        "chord": "♭VII",
        "seconds": 9.82,
      },
      {
        "chord": "♭VI",
        "seconds": 12.94,
      },
      {
        "chord": "V",
        "seconds": 16.07,
      },
    ],
    "endSeconds": 19.35,
  },
  {
    "key": "C",
    "mode": "MINOR",
    "videoId": "rYEDA3JcQqw",
    "name": "Rolling In The Deep",
    "artist": "Adele",
    "chords": [
      {
        "chord": "i",
        "seconds": 59.6,
      },
      {
        "chord": "♭VII",
        "seconds": 61.89,
      },
      {
        "chord": "♭VI",
        "seconds": 64.17,
      },
      {
        "chord": "♭VII",
        "seconds": 67.6,
      },
    ],
    "endSeconds": 68.74,
  },
  {
    "key": "C",
    "mode": "MINOR",
    "videoId": "TLV4_xaYynY",
    "name": "All Along The Watchtower",
    "artist": "Jimi Handrix",
    "chords": [
      {
        "chord": "i",
        "seconds": 18.72,
      },
      {
        "chord": "♭VII",
        "seconds": 19.8,
      },
      {
        "chord": "♭VI",
        "seconds": 20.61,
      },
      {
        "chord": "♭VII",
        "seconds": 22.23,
      },
    ],
    "endSeconds": 23.04,
  },
  {
    "key": "A",
    "mode": "MINOR",
    "videoId": "iXQUu5Dti4g",
    "name": "Stairway to Heaven",
    "artist": "Led Zeppelin",
    "chords": [
      {
        "chord": "i",
        "seconds": 404,
      },
      {
        "chord": "♭VII",
        "seconds": 405.15,
      },
      {
        "chord": "♭VI",
        "seconds": 406.42,
      },
      {
        "chord": "♭VII",
        "seconds": 408.49,
      },
      {
        "chord": "i",
        "seconds": 408.74,
      },
    ],
    "endSeconds": 410,
  },
  {
    "key": "C",
    "mode": "MINOR",
    "videoId": "WNIPqafd4As",
    "name": "My Heart Will Go On",
    "artist": "Celin Deon",
    "chords": [
      {
        "chord": "i",
        "seconds": 214.68,
      },
      {
        "chord": "♭VII",
        "seconds": 217.1,
      },
      {
        "chord": "♭VI",
        "seconds": 219.53,
      },
      {
        "chord": "♭VII",
        "seconds": 221.95,
      },
    ],
    "endSeconds": 224.38,
  },
  {
    "key": "D",
    "mode": "MINOR",
    "videoId": "8UVNT4wvIGY",
    "name": "Somebody That I Used To Know",
    "artist": "Gotye",
    "chords": [
      {
        "chord": "i",
        "seconds": 93.09,
      },
      {
        "chord": "♭VII",
        "seconds": 94.03,
      },
      {
        "chord": "♭VI",
        "seconds": 94.97,
      },
      {
        "chord": "♭VII",
        "seconds": 95.9,
      },
    ],
    "endSeconds": 96.84,
  },
  {
    key: "E",
    mode: "MAJOR",
    videoId: "tbU3zdAgiX8",
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
    endSeconds: 8.4
  },
  {
    "key": "A",
    "mode": "MAJOR",
    "videoId": "3JWTaaS7LdU",
    "name": "I Will Always Love You",
    "artist": "Whitney Houston",
    "chords": [
      {
        "chord": "I",
        "seconds": 107.5
      },
      {
        "chord": "vi",
        "seconds": 109.26
      },
      {
        "chord": "IV",
        "seconds": 111.03
      },
      {
        "chord": "V",
        "seconds": 112.79
      }
    ],
    "endSeconds": 114.55
  },
  {
    "key": "G",
    "mode": "MAJOR",
    "videoId": "xw0EozkBWuI",
    "name": "Crocodile Rock",
    "artist": "Elton John",
    "section": "Bridge",
    "chords": [
      {
        "chord": "I",
        "seconds": 131.83
      },
      {
        "chord": "vi",
        "seconds": 134.79
      },
      {
        "chord": "IV",
        "seconds": 137.96
      },
      {
        "chord": "V",
        "seconds": 141.17
      }
    ],
    "endSeconds": 144.37
  },
  {
    "key": "G#",
    "mode": "MAJOR",
    "videoId": "VJcGi4-n_Yw",
    "name": "Earth Angle",
    "artist": "The Penguins",
    "chords": [
      {
        "chord": "I",
        "seconds": 13
      },
      {
        "chord": "vi",
        "seconds": 14.54
      },
      {
        "chord": "IV",
        "seconds": 16.06
      },
      {
        "chord": "V",
        "seconds": 17.69
      }
    ],
    "endSeconds": 19.32
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "vdvnOH060Qg",
    "name": "Happiness is a Warm Gun",
    "artist": "The Beatles",
    "chords": [
      {
        "chord": "I",
        "seconds": 94.93
      },
      {
        "chord": "vi",
        "seconds": 96.13
      },
      {
        "chord": "IV",
        "seconds": 97.67
      },
      {
        "chord": "V",
        "seconds": 99.28
      },
    ],
    "endSeconds": 100.94
  },
  {
    "key": "Db",
    "mode": "MAJOR",
    "videoId": "JMcNzjzw63I",
    "name": "Jesus of Suburbia",
    "artist": "Green Day",
    "chords": [
      {
        "chord": "I",
        "seconds": 0
      },
      {
        "chord": "vi",
        "seconds": 3.3
      },
      {
        "chord": "IV",
        "seconds": 6.72
      },
      {
        "chord": "V",
        "seconds": 10
      },
    ],
    "endSeconds":13.42
  },
  {
    "key": "Eb",
    "mode": "MAJOR",
    "videoId": "kffacxfA7G4",
    "name": "Baby",
    "artist": "Justin Bieber",
    "chords": [
      {
        "chord": "I",
        "seconds": 15.51
      },
      {
        "chord": "vi",
        "seconds": 19.12
      },
      {
        "chord": "IV",
        "seconds": 22.78
      },
      {
        "chord": "V",
        "seconds": 26.52
      }
    ],
    "endSeconds": 30.14
  },
  {
    "key": "G",
    "mode": "MAJOR",
    "videoId": "CZXLLMbJdZ4",
    "name": "There she goes",
    "artist": "The La's",
    "chords": [
      {
        "chord": "I",
        "seconds": 16.9
      },
      {
        "chord": "V",
        "seconds": 17.84
      },
      {
        "chord": "IV",
        "seconds": 18.78
      },
    ],
    "endSeconds": 20.65
  },
  {
    "key": "F#",
    "mode": "MAJOR",
    "videoId": "VZt7J0iaUD0",
    "name": "New Project",
    "artist": "Suzanne Vega",
    "chords": [
      {
        "chord": "I",
        "seconds": 25.65
      },
      {
        "chord": "V",
        "seconds": 27.53
      },
      {
        "chord": "IV",
        "seconds": 29.4
      },
      {
        "chord": "V",
        "seconds": 31.28
      },
    ],
    "endSeconds": 33.15
  },
  {
    "key": "F",
    "mode": "MAJOR",
    "videoId": "N5EnGwXV_Pg",
    "name": "your body is a wonderland",
    "artist": "",
    "chords": [
      {
        "chord": "I",
        "seconds": 79.37
      },
      {
        "chord": "V",
        "seconds": 80.65
      },
      {
        "chord": "IV",
        "seconds": 81.93
      },
      {
        "chord": "V",
        "seconds": 83.2
      },
    ],
    "endSeconds": 84.48
  },
  // todo: need to figure out the timing here, it's a bit tricky
  // {
  //   "key": "G",
  //   "mode": "MAJOR",
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
    "key": "A",
    "mode": "MAJOR",
    "videoId": "NHozn0YXAeE",
    "name": "MMMBop",
    "artist": "Hanson",
    "chords": [
      {
        "chord": "I",
        "seconds": 18.12
      },
      {
        "chord": "V",
        "seconds": 19.33
      },
      {
        "chord": "IV",
        "seconds": 20.43
      },
      {
        "chord": "V",
        "seconds": 21.56
      },
    ],
    "endSeconds": 22.61
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "9Ht5RZpzPqw",
    "name": "All The Small Things",
    "artist": "Blink 182",
    "chords": [
      {
        "chord": "I",
        "seconds": 16.88
      },
      {
        "chord": "V",
        "seconds": 18.48
      },
      {
        "chord": "IV",
        "seconds": 20.08
      },
      {
        "chord": "V",
        "seconds": 21.68
      },
    ],
    "endSeconds": 23.28
  },
  {
    "key": "E",
    "mode": "MAJOR",
    "videoId": "j2F4INQFjEI",
    "name": "Heaven is a Place on Earth",
    "artist": "Belinda Carlisle",
    "chords": [
      {
        "chord": "I",
        "seconds": 37.9
      },
      {
        "chord": "V",
        "seconds": 39.77
      },
      {
        "chord": "IV",
        "seconds": 41.77
      },
      {
        "chord": "V",
        "seconds": 43.61
      },
    ],
    "endSeconds": 45.6
  },
  {
    "key": "Ab",
    "mode": "MAJOR",
    "videoId": "YQHsXMglC9A",
    "name": "Hello",
    "artist": "Adele",
    "chords": [
      {
        "chord": "vi",
        "seconds": 233.16
      },
      {
        "chord": "IV",
        "seconds": 234.3
      },
      {
        "chord": "I",
        "seconds": 236.2
      },
      {
        "chord": "V",
        "seconds": 237.34
      }
    ],
    "endSeconds": 239.24
  },
  {
    "key": "F",
    "mode": "MAJOR",
    "videoId": "A_MjCqQoLLA",
    "name": "Hey Jude",
    "artist": "The Beatles",
    "section": "Outro",
    "chords": [
      {
        "chord": "I",
        "seconds": 258.76
      },
      {
        "chord": "♭VII",
        "seconds": 261.92
      },
      {
        "chord": "IV",
        "seconds": 265.08
      },
      {
        "chord": "I",
        "seconds": 268.24
      }
    ],
    "endSeconds": 272.02
  },
  {
    "key": "E",
    "mode": "MAJOR",
    "videoId": "GgnClrx8N2k",
    "name": "Sympathy for the Devil",
    "artist": "The Rolling Stones",
    "chords": [
      {
        "chord": "I",
        "seconds": 21.2
      },
      {
        "chord": "♭VII",
        "seconds": 23.23
      },
      {
        "chord": "IV",
        "seconds": 25.31
      },
      {
        "chord": "I",
        "seconds": 27.26
      }
    ],
    "endSeconds": 29
  },
  {
    "key": "D",
    "mode": "MAJOR",
    "videoId": "nlcIKh6sBtc",
    "name": "Royals",
    "artist": "Lorde",
    "chords": [
      {
        "chord": "I",
        "seconds": 56.59
      },
      {
        "chord": "♭VII",
        "seconds": 62.12
      },
      {
        "chord": "IV",
        "seconds": 64.84
      },
    ],
    "endSeconds": 67.71
  },
  {
    "key": "C",
    "mode": "MAJOR",
    "videoId": "j8h-Ltha_9w",
    "name": "Freedom",
    "artist": "George Michael",
    "chords": [
      {
        "chord": "I",
        "seconds": 136.17
      },
      {
        "chord": "♭VII",
        "seconds": 138.78
      },
      {
        "chord": "IV",
        "seconds": 141.35
      },
      {
        "chord": "I",
        "seconds": 143.98
      },
    ],
    "endSeconds": 146.9
  },
  {
    "key": "D",
    "mode": "MAJOR",
    "videoId": "ye5BuYf8q4o",
    "name": "Sweet Home Alabama",
    "artist": "Lynyrd Skynyrd",
    "chords": [
      {
        "chord": "I",
        "seconds": 70.43
      },
      {
        "chord": "♭VII",
        "seconds": 71.74
      },
      {
        "chord": "IV",
        "seconds": 72.93
      },
    ],
    "endSeconds": 75.37
  },
  {
    name: 'Wonderfall',
    artist: 'Oasis',
    key: 'F#',
    mode: 'MINOR',
    videoId: '6hzrDeceEKc',
    chords: [
      {
        chord: 'i',
        seconds: 65.76,
      },
      {
        chord: '♭III',
        seconds: 67.11,
      },
      {
        chord: '♭VII',
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
    mode: 'MINOR',
    videoId: 'Soa3gO7tL-c',
    chords: [
      {
        chord: 'i',
        seconds: 54.6,
      },
      {
        chord: '♭III',
        seconds: 56.1,
      },
      {
        chord: '♭VII',
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
    mode: 'MINOR',
    videoId: '4N3N1MlvVc4',
    chords: [
      {
        chord: 'i',
        seconds: 17.42,
      },
      {
        chord: '♭III',
        seconds: 20.12,
      },
      {
        chord: '♭VII',
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
    name: 'D\'You Know What I Mean?',
    artist: 'Oasis',
    key: 'B',
    mode: 'MINOR',
    videoId: 'jyJU2136ym4',
    chords: [
      {
        chord: 'i',
        seconds: 76.13,
      },
      {
        chord: '♭III',
        seconds: 77.5,
      },
      {
        chord: '♭VII',
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
    mode: 'MINOR',
    videoId: 'SDTZ7iX4vTQ',
    chords: [
      {
        chord: 'i',
        seconds: 75.52,
      },
      {
        chord: '♭III',
        seconds: 77.37,
      },
      {
        chord: '♭VII',
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
    mode: 'MINOR',
    videoId: 'ktvTqknDobU',
    chords: [
      {
        chord: 'i',
        seconds: 89.6,
      },
      {
        chord: '♭III',
        seconds: 91.04,
      },
      {
        chord: '♭VII',
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
    mode: 'MINOR',
    videoId: 'm2Kcv-Pmwkg',
    chords: [
      {
        chord: 'i',
        seconds: 69.4,
      },
      {
        chord: '♭III',
        seconds: 71.05,
      },
      {
        chord: '♭VII',
        seconds: 72.61,
      },
      {
        chord: 'IV',
        seconds: 74.18,
      },
      {
        chord: 'i',
        seconds: 75.79,
      }
    ],
    endSeconds: 77.52,
  },
  {
    name: 'Can\'t Stop',
    artist: 'Radiohead',
    key: 'E',
    mode: 'MINOR',
    videoId: '8DyziWtkfBw',
    chords: [
      {
        chord: 'i',
        seconds: 34.22,
      },
      {
        chord: '♭VII',
        seconds: 36.29,
      },
      {
        chord: 'v',
        seconds: 38.9,
      },
      {
        chord: '♭VI',
        seconds: 41.52,
      },
    ],
    endSeconds: 44.1,
  },
  {
    name: 'Attention',
    artist: 'Charlie Puth',
    mode: 'MINOR',
    videoId: 'nfs8NYg7yQM',
    key: 'Eb',
    chords: [
      {
        chord: 'i',
        seconds: 106,
      },
      {
        chord: '♭VII',
        seconds: 108.31,
      },
      {
        chord: 'v',
        seconds: 110.61,
      },
      {
        chord: '♭VI',
        seconds: 113.05,
      },
    ],
    endSeconds: 115.42 ,
  },
  {
    name: 'Sweet Dreams',
    artist: 'Beyoncé',
    mode: 'MINOR',
    videoId: 'JlxByc0-V40',
    key: 'Eb',
    chords: [
      {
        chord: 'i',
        seconds: 73.55,
      },
      {
        chord: '♭VII',
        seconds: 75.42,
      },
      {
        chord: 'v',
        seconds: 77.33,
      },
      {
        chord: '♭VI',
        seconds: 79.36,
      },
    ],
    endSeconds: 81.27 ,
  },
  {
    name: 'Can\'t Hold Us',
    artist: 'Macklemore & Ryan Lewis ',
    mode: 'MINOR',
    videoId: '2zNSgSzhBfM',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 165,
      },
      {
        chord: '♭VII',
        seconds: 166.46,
      },
      {
        chord: 'v',
        seconds: 168.1,
      },
      {
        chord: '♭VI',
        seconds: 169.74,
      },
    ],
    endSeconds: 171.31,
  },
  {
    name: 'Hello',
    artist: 'Adele',
    mode: 'MINOR',
    videoId: 'YQHsXMglC9A',
    section: 'Pre-Chorus',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 130,
      },
      {
        chord: '♭VII',
        seconds: 130.79,
      },
      {
        chord: 'v',
        seconds: 132.56,
      },
      {
        chord: '♭VI',
        seconds: 133.69,
      },
      {
        chord: 'i',
        seconds: 135.72,
      },
      {
        chord: '♭VII',
        seconds: 136.79,
      },
      {
        chord: '♭VI',
        seconds: 138.1,
      },
    ],
    endSeconds: 141.85,
  },
  {
    name: 'Someone New',
    artist: 'Hozier',
    mode: 'MINOR',
    videoId: 'bPJSsAr2iu0',
    key: 'E',
    chords: [
      {
        chord: 'i',
        seconds: 55,
      },
      {
        chord: '♭VII',
        seconds: 56.32,
      },
      {
        chord: 'v',
        seconds: 57.58,
      },
      {
        chord: '♭VI',
        seconds: 58.77,
      },
    ],
    endSeconds: 60.12,
  },
  {
    name: 'The Zephyr Song',
    artist: 'Red Hot Chilli Peppers',
    mode: 'MINOR',
    videoId: '0fcRa5Z6LmU',
    key: 'A',
    chords: [
      {
        chord: 'i',
        seconds: 17,
      },
      {
        chord: '♭VII',
        seconds: 18.82,
      },
      {
        chord: 'v',
        seconds: 20.86,
      },
      {
        chord: '♭VI',
        seconds: 22.88,
      },
    ],
    endSeconds: 25.03,
  },
  {
    name: 'Who\'s that Girl',
    artist: 'Eurythmics',
    mode: 'MINOR',
    videoId: '-5iDKWV6Chg',
    key: 'A',
    chords: [
      {
        chord: 'i',
        seconds: 68,
      },
      {
        chord: '♭VII',
        seconds: 69.54,
      },
      {
        chord: 'v',
        seconds: 71.49,
      },
      {
        chord: '♭VI',
        seconds: 73.52,
      },
      {
        chord: '♭VII',
        seconds: 74.48,
      },
    ],
    endSeconds: 75.5,
  },
  {
    name: 'SOS',
    artist: 'ABBA',
    mode: 'MAJOR',
    videoId: 'cvChjHcABPA',
    key: 'A',
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
    mode: 'MAJOR',
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
    mode: 'MAJOR',
    videoId: 'L_jWHffIx5E',
    key: 'F#',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'zhS3YP04Fjk',
    key: 'E',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'xGytDsqkQY8',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'kTHNpusq654',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'ZAn3JdtSrnY',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    videoId: '2EwViQxSJJQ',
    key: 'F',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'n3nPiBai66M',
    key: 'A',
    chords:  [
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
    name: 'I\'m Like A Bird',
    artist: 'Nelly Furtado',
    mode: 'MAJOR',
    videoId: 'roPQ_M3yJTA',
    key: 'Bb',
    chords:  [
      {
        chord: 'I',
        seconds: 55.3,
      },
      {
        chord: 'V',
        seconds: 57.88,
      },
      {
        chord: 'ii',
        seconds: 60.63,
      },
      {
        chord: 'IV',
        seconds: 63.31,
      },
    ],
    endSeconds: 65.95,
  },
  {
    name: 'Scott Street',
    artist: 'Pheobe Bridgers',
    mode: 'MAJOR',
    videoId: 'BBBxzmyeNdw',
    key: 'Bb',
    chords:  [
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
    name: 'What\'s my age again?',
    artist: 'blink-182',
    mode: 'MAJOR',
    videoId: 'K7l5ZeVVoCA',
    key: 'F#',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'k9olaIio3l8',
    key: 'F',
    chords:  [
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
    mode: 'MAJOR',
    videoId: 'YnopHCL1Jk8',
    key: 'C',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'Soa3gO7tL-c',
    key: 'Ab',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'ckM51xoTC2U',
    key: 'A',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'KWZGAExj-es',
    key: 'A',
    chords:  [
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
    name: 'Big Girls Don\'t Cry',
    artist: 'Fergie',
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'agrXgrAgQ0U',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'RBumgq5yVrA',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'QcIy9NiNbmo',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'XPBwXKgDTdE',
    key: 'G',
    chords:  [
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
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'WA4iX5D9Z64',
    key: 'G',
    chords:  [
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
    ],
    endSeconds: 48.41,
  },
  {
    name: 'Misery Business',
    artist: 'Paramore',
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'aCyGvGEtOwc',
    key: 'Ab',
    chords:   [
      {
        chord: 'IV',
        seconds: 36.92,
      },
      {
        chord: 'I',
        seconds: 38.12,
      },
      {
        chord: 'V',
        seconds: 39.55,
      },
      {
        chord: 'vi',
        seconds: 40.93,
      },
      {
        chord: 'V',
        seconds: 41.59,
      },
    ],
    endSeconds: 42.42,
  },
  {
    name: 'Good 4 u',
    artist: 'Olivia Rodrigo',
    mode: 'MAJOR',
    section: 'Chorus',
    videoId: 'gNi_6U5Pm_o',
    key: 'Ab',
    chords:   [
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
    mode: 'MAJOR',
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords:   [
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
    endSeconds: 56.83
  },
  {
    name: 'Drive By',
    artist: 'Train',
    mode: 'MAJOR',
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords:   [
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
    endSeconds: 63.89
  },
  {
    name: 'Drive By',
    artist: 'Train',
    mode: 'MAJOR',
    videoId: 'oxqnFJ3lp5k',
    key: 'E',
    chords:   [
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
    endSeconds: 24.54
  },
  {
    name: 'Half Of My Heart',
    artist: 'John Mayer',
    mode: 'MAJOR',
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
    endSeconds: 57.73
  },
  {
    name: 'Castle Of Glass',
    artist: 'Linkin Park',
    mode: 'MAJOR',
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
    endSeconds: 135.13
  },
  {
    name: 'Alejandro',
    artist: 'Lady Gaga',
    mode: 'MAJOR',
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
    endSeconds: 187.1
  },
]
