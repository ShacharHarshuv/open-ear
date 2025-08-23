import * as _ from 'lodash';
import { ExerciseTest } from '../../ExerciseTest';
import Exercise from '../../exercise-logic';
import { toGetter } from '../../utility';
import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import {
  IntervalName,
  intervalDescriptorList,
  intervalExercise,
} from './intervalExercise';

describe(intervalExercise.name, () => {
  exerciseSmokeTest(intervalExercise);
  const allIntervals = _.map(intervalDescriptorList, 'name');

  describe('getAnswersList', () => {
    it('should include all intervals by default', () => {
      expect(
        toGetter(
          intervalExercise.logic({
            ...intervalExercise.settingsConfig.defaults,
            includedAnswers: allIntervals,
          }).answerList,
        )(),
      ).toEqual(ExerciseTest.answerListContaining(allIntervals));
    });

    it('should return only the intervals set by the settings', () => {
      const intervals: IntervalName[] = ['Minor 2nd', 'Major 2nd'];
      expect(
        Exercise.flatAnswerList(
          toGetter(
            intervalExercise.logic({
              ...intervalExercise.settingsConfig.defaults,
              includedAnswers: ['Minor 2nd', 'Major 2nd'],
            }).answerList,
          )(),
        ),
      ).toEqual(jasmine.arrayWithExactContents(intervals));
    });
  });

  describe('settings', () => {
    it('should have the "included answers" settings', () => {
      expect(intervalExercise.settingsConfig.controls).toEqual(
        jasmine.arrayContaining([
          jasmine.objectContaining<Exercise.SettingsControlDescriptor>({
            key: 'includedAnswers',
            descriptor: jasmine.objectContaining({
              controlType: 'included-answers',
              answerList: ExerciseTest.answerListContaining(allIntervals),
            }),
          }),
        ]),
      );
    });
  });
});
