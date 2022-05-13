import { Exercise } from '../../Exercise';
import { CommonChordProgressionsExercise } from './CommonChordProgressionsExercise';

describe('CommonChordProgressionsExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new CommonChordProgressionsExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
