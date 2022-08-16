import {
  ChordTypeInKeySettings,
  chordTypeExercise,
} from './ChordTypeInKeyExercise';
import { testExercise } from '../testing-utility/test-exercise.spec';

describe(chordTypeExercise.name, () => {
  const context = testExercise<ChordTypeInKeySettings>({
    getExercise: () => chordTypeExercise(),
    settingDescriptorList: [
      'Included Types',
      'Diatonic',
      'Included Chords (Advanced)',
      'Voice Leading',
      'Include Bass',
      'Included Positions (top voices)',
      'Number of chords',
    ],
    defaultSettings: {
      includeBass: true,
      includedRomanNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
      numberOfSegments: 1,
      includedPositions: [0, 1, 2],
      voiceLeading: 'CORRECT',
      cadenceType: 'I IV V I',
    },
  })
})
