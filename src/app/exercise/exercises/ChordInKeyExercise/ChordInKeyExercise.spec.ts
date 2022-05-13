import { Exercise } from '../../Exercise';
import { ChordsInKeyExercise } from './ChordsInKeyExercise';

describe('ChordsInKeyExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new ChordsInKeyExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
