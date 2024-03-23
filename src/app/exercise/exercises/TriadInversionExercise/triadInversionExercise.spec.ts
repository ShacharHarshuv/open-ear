import { testExercise } from '../testing-utility/test-exercise.spec';
import { triadInversionExercise } from './triadInversionExercise';

describe(triadInversionExercise.name, () => {
  const context = testExercise({
    getExercise: triadInversionExercise,
    settingDescriptorList: [
      'Included Inversions',
      'Arpeggiate Speed',
      'Play Root After Correct Answer',
      'Arpeggio Direction',
    ],
  });
});
