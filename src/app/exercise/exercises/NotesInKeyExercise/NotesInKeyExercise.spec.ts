import { Exercise } from '../../Exercise';
import { NotesInKeyExercise } from './NotesInKeyExercise';

describe('NotesInKeyExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new NotesInKeyExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
