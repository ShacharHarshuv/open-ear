import { Exercise } from '../../Exercise';
import { NotesInKeyExercise } from './NotesInKeyExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('NotesInKeyExercise', () => {
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
