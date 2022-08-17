import {
  ChordTypeInKeySettings,
  chordTypeExercise,
} from './ChordTypeInKeyExercise';
import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise.spec';

describe(chordTypeExercise.name, () => {
  const context = testExercise<ChordTypeInKeySettings>({
    getExercise: () => chordTypeExercise(),
    settingDescriptorList: [
      'Included Types',
      'Diatonic',
      'Included Chords (Advanced)',
      ...expectedVoicingSettings,
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
