import { testExercise } from '../testing-utility/test-exercise.spec';
import { notesInKeyExercise } from './notesInKeyExercise';

describe(notesInKeyExercise.name, () => {
  const context = testExercise({
    getExercise: notesInKeyExercise,
    settingDescriptorList: [
      'Cadence Type',
      'Included Options',
      'Display',
      'Range',
      'Number of notes',
      'Play Resolution',
    ]
  })
})
