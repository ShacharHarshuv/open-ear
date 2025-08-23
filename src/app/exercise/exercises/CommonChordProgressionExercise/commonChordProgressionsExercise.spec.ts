import Exercise from '../../exercise-logic';
import { toGetter } from '../../utility';
import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import { commonChordProgressionExercise } from './commonChordProgressionsExercise';

describe(commonChordProgressionExercise.name, () => {
  exerciseSmokeTest(commonChordProgressionExercise);

  describe('getAllAnswers', function () {
    it('should contain only chords from the selected progressions', () => {
      expect(
        Exercise.flatAnswerList(
          toGetter(
            commonChordProgressionExercise.logic({
              ...commonChordProgressionExercise.settingsConfig.defaults,
              includedProgressions: ['I IV V I'],
            }).answerList,
          )(),
        ),
      ).toEqual(jasmine.arrayWithExactContents(['I', 'IV', 'V']));
    });
  });
});
