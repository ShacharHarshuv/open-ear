import { testExercise } from '../testing-utility/test-exercise.spec';
import { notesInKeyExercise } from './notesInKeyExercise';
import { expectedTonalExerciseSettingsDescriptors } from '../utility/exerciseAttributes/tonalExercise.spec';

describe(notesInKeyExercise.name, () => {
  const context = testExercise({
    getExercise: notesInKeyExercise,
    settingDescriptorList: [
      ...expectedTonalExerciseSettingsDescriptors,
      'Included Scale Degrees',
      'Display',
      'Range',
      'Number of notes',
      'Play Resolution',
    ]
  })
})
