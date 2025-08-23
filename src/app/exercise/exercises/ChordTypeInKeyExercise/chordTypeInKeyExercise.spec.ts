import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import { chordTypeExercise } from './chordTypeInKeyExercise';

describe(chordTypeExercise.name, () => {
  exerciseSmokeTest(chordTypeExercise);
});
