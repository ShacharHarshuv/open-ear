import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedVoicingSettingsDescriptors } from '../utility/exerciseAttributes/chordProgressionExercise.spec';
import { defaultTonalExerciseSettings } from '../utility/exerciseAttributes/tonalExercise.spec';
import {
  ChordTypeInKeySettings,
  chordTypeExercise,
} from './chordTypeInKeyExercise';

describe(chordTypeExercise.name, () => {
  const context = testExercise<ChordTypeInKeySettings>({
    getExercise: () => chordTypeExercise(),
    settingDescriptorList: [
      'Included Types',
      'Diatonic',
      'Included Chords (Advanced)',
      ...expectedVoicingSettingsDescriptors,
      'Number of chords',
    ],
    defaultSettings: {
      includeBass: true,
      includedRomanNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi'],
      numberOfSegments: 1,
      includedPositions: [0, 1, 2],
      voiceLeading: 'CORRECT',
      ...defaultTonalExerciseSettings,
    },
  });
});
