import { Exercise } from '../../Exercise';
import { ChordsInRealSongsExercise } from './ChordsInRealSongsExercise';

describe('ChordsInRealSongsExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new ChordsInRealSongsExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
