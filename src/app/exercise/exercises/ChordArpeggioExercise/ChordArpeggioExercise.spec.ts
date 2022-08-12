import { ChordArpeggioExercise } from './ChordArpeggioExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('ChordArpeggioExercise', () => {
  const context = testExercise({
    getExercise: () => new ChordArpeggioExercise(),
    settingDescriptorList: [
    ],
  })
})
