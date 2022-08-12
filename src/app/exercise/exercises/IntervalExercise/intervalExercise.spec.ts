import {
  IntervalName,
  intervalExercise,
  intervalDescriptorList,
} from './IntervalExercise';
import * as _ from 'lodash';
import { ExerciseTest } from '../../ExerciseTest';
import { testExercise } from '../testing-utility/test.exercise';
import { Exercise } from '../../Exercise';

describe('intervalExercise', () => {
  const context = testExercise({
    getExercise: intervalExercise,
    settingDescriptorList: [
      'Included Options', // todo: consider making it "Included Intervals"
    ],
  })
  const allIntervals: IntervalName[] = _.map(intervalDescriptorList, 'name');

  describe('getAnswersList', () => {
    it('should include all intervals by default', () => {
      expect(context.exercise.getAnswerList()).toEqual(ExerciseTest.answerListContaining(allIntervals))
    });

    it('should return only the intervals set by the settings', () => {
      const intervals: IntervalName[] = ['Minor 2nd', 'Major 2nd'];
      expect(context.exercise.updateSettings).toBeTruthy();
      context.exercise.updateSettings?.({
        includedAnswers: ['Minor 2nd', 'Major 2nd'],
      });
      expect(Exercise.flatAnswerList(context.exercise.getAnswerList())).toEqual(jasmine.arrayWithExactContents(intervals))
    })
  })

  describe('settings', () => {
    it('should have the "included answers" settings', () => {
      expect(context.exercise.getSettingsDescriptor?.()).toEqual(jasmine.arrayContaining([
        jasmine.objectContaining<Exercise.SettingsControlDescriptor>({
          key: 'includedAnswers',
          descriptor: jasmine.objectContaining({
            controlType: 'included-answers',
            answerList: ExerciseTest.answerListContaining(allIntervals),
          }),
        })
      ]))
    });
  });

  describe('getQuestion', () => {
    it('should return truthy value', () => {
      expect(context.exercise.getQuestion()).toBeTruthy();
    })
  })
})
