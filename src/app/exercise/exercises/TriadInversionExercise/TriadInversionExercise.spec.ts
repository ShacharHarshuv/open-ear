import { triadInversionExercise } from './TriadInversionExercise';
import { Exercise } from '../../Exercise';

describe('TriadInversionExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = triadInversionExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
