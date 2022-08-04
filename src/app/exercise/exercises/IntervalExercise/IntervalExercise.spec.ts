import { Exercise } from '../../Exercise';
import {
  IntervalName,
  IntervalExerciseSettings,
  intervalExercise,
  intervalDescriptorList,
} from './IntervalExercise';
import * as _ from 'lodash';
import { ExerciseTest } from '../../ExerciseTest';

describe('IntervalExercise', () => {
  let exercise: Exercise.IExercise<IntervalName, IntervalExerciseSettings>;
  const allIntervals: IntervalName[] = _.map(intervalDescriptorList, 'name');

  beforeEach(() => {
    exercise = intervalExercise();
  });

  describe('getAnswersList', () => {
    it('should include all intervals by default', () => {
      expect(exercise.getAnswerList()).toEqual(ExerciseTest.answerListContaining(allIntervals))
    });

    it('should return only the intervals set by the settings', () => {
      const intervals: IntervalName[] = ['Minor 2nd', 'Major 2nd'];
      expect(exercise.updateSettings).toBeTruthy();
      exercise.updateSettings?.({
        includedAnswers: ['Minor 2nd', 'Major 2nd'],
      });
      expect(Exercise.flatAnswerList(exercise.getAnswerList())).toEqual(jasmine.arrayWithExactContents(intervals))
    })
  })

  describe('settings', () => {
    it('should have the "included answers" settings', () => {
      expect(exercise.getSettingsDescriptor?.()).toEqual(jasmine.arrayContaining([
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
      expect(exercise.getQuestion()).toBeTruthy();
    })
  })
})
