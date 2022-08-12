import { testExercise } from '../testing-utility/test.exercise';
import { triadInversionExercise } from './triadInversionExercise';

describe('triadInversionExercise', () => {
  const context = testExercise({
    getExercise: triadInversionExercise,
    settingDescriptorList: [
      'Included Options',
      'Arpeggiate Speed',
      'Play Root After Correct Answer',
    ],
  });
})
