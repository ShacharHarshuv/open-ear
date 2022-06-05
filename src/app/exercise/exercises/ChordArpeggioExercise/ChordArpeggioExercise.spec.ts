import { Exercise } from '../../Exercise';
import { ChordArpeggioExercise } from './ChordArpeggioExercise';

describe('ChordArpeggioExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new ChordArpeggioExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
