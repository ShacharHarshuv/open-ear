import { testExercise } from '../testing-utility/test.exercise';
import { notesWithChordsExercise } from './NotesWithChordsExercise';

describe(notesWithChordsExercise.name, () => {
  testExercise({
    getExercise: notesWithChordsExercise,
    settingDescriptorList: [
      'Included Options',
      'Voice Mode',
    ],
  })
})
