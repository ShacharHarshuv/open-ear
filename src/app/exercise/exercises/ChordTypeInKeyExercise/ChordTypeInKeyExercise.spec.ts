import { Exercise } from '../../Exercise';
import { ChordTypeInKeyExercise } from './ChordTypeInKeyExercise';

describe('ChordTypeInKeyExercise', () => {
  let exercise: Exercise.Exercise;

  beforeEach(() => {
    exercise = new ChordTypeInKeyExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
