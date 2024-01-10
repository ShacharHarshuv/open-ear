import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedKeySelectionSettingsDescriptors } from '../utility/settings/keySelectionSettingsDescriptors.spec';
import { notesWithChordsExercise } from './notesWithChordsExercise';

describe(notesWithChordsExercise.name, () => {
  testExercise({
    getExercise: notesWithChordsExercise,
    settingDescriptorList: [
      'Included Options',
      ...expectedKeySelectionSettingsDescriptors,
      'Drone',
      'Voice Mode',
      'Harmony Mode',
    ],
  });
});
