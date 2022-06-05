import { Exercise } from '../../Exercise';
import { NotesWithChordsExercise } from './NotesWithChordsExercise';

describe('NotesWithChordsExercise', () => {
  let exercise: Exercise.IExercise;

  beforeEach(() => {
    exercise = new NotesWithChordsExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  })
})
