import { CommonChordProgressionsExercise } from './CommonChordProgressionsExercise';
import { Exercise } from '../../Exercise';

describe('CommonChordProgressionsExercise', () => {
  let exercise: CommonChordProgressionsExercise;

  beforeEach(() => {
    exercise = new CommonChordProgressionsExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  });

  describe('getAllAnswers', function() {
    it('should contain only chords from the selected progressions', () => {
      exercise.updateSettings({
        ...exercise.getCurrentSettings(),
        includedProgressions: [
          'I IV V I',
        ],
      });
      expect(Exercise.flatAnswerList(exercise.getAnswerList())).toEqual(jasmine.arrayWithExactContents(['I', 'IV', 'V']))
    })
  });
})
