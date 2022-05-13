import { TriadInversionExercise } from './TriadInversionExercise';
import { Exercise } from '../../Exercise';

describe('TriadInversionExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new TriadInversionExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
