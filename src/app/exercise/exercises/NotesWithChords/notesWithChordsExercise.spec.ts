import { notesWithChordsExercise } from './notesWithChordsExercise';
import { testExercise } from '../testing-utility/test-exercise.spec';

describe(notesWithChordsExercise.name, () => {
  testExercise({
    getExercise: notesWithChordsExercise,
    settingDescriptorList: [
      'Included Options',
      'Voice Mode',
    ],
  })
})
