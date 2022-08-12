import { Exercise } from '../../Exercise';
import { ChordTypeInKeyExercise } from './ChordTypeInKeyExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('ChordTypeInKeyExercise', () => {
  const context = testExercise({
    getExercise: () => new ChordTypeInKeyExercise(),
    settingDescriptorList: [
      'Included Types',
      'Diatonic',
      'Included Chords (Advanced)',
      'Voice Leading',
      'Include Bass',
      'Included Positions (top voices)',
      'Number of chords',
    ],
  })
})
