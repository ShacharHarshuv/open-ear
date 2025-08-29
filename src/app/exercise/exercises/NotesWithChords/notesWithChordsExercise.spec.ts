import { flatAnswerList } from '../../exercise-logic';
import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import {
  allNotesWithChordsAnswersList,
  noteWithChordDescriptorMap,
  notesWithChordsExercise,
} from './notesWithChordsExercise';

describe(notesWithChordsExercise.name, () => {
  exerciseSmokeTest(notesWithChordsExercise);

  describe('should have descriptor for all options', () => {
    const options = flatAnswerList(allNotesWithChordsAnswersList);
    options.forEach((option) => {
      it('should have descriptor for ' + option, () => {
        const descriptor = noteWithChordDescriptorMap[option];
        expect(descriptor).toBeDefined();
      });
    });
  });
});
