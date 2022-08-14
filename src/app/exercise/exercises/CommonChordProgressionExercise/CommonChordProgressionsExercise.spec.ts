import { CommonChordProgressionsExercise } from './CommonChordProgressionsExercise';
import { Exercise } from '../../Exercise';
import { testExercise } from '../testing-utility/test.exercise';

describe(CommonChordProgressionsExercise.name, () => {
  const context = testExercise({
    getExercise: () => new CommonChordProgressionsExercise(),
    settingDescriptorList: [
      'Analyze By',
      'Included Progressions',
    ],
  })

  describe('getAllAnswers', function() {
    it('should contain only chords from the selected progressions', () => {
      context.exercise.updateSettings?.({
        ...context.exercise.getCurrentSettings?.(),
        includedProgressions: [
          'I IV V I',
        ],
      });
      expect(Exercise.flatAnswerList(context.exercise.getAnswerList())).toEqual(jasmine.arrayWithExactContents(['I', 'IV', 'V']))
    })
  });
})
