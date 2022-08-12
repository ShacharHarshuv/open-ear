import { NotesWithChordsExercise } from './NotesWithChordsExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('NotesWithChordsExercise', () => {
  testExercise({
    getExercise: () => new NotesWithChordsExercise(),
    settingDescriptorList: [
      'Included Options',
      'Voice Mode',
    ],
  })
})
