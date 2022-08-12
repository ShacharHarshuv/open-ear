import { NotesInKeyExercise } from './NotesInKeyExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('notesInKeyExercise', () => {
  const context = testExercise({
    getExercise: () => new NotesInKeyExercise(),
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
