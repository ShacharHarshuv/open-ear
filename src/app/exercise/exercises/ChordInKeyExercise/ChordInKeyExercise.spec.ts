import { Exercise } from '../../Exercise';
import { ChordsInKeyExercise } from './ChordsInKeyExercise';
import { BaseRomanAnalysisChordProgressionExercise } from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';

describe('ChordsInKeyExercise', () => {
  let exercise: ChordsInKeyExercise;

  beforeEach(() => {
    exercise = new ChordsInKeyExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  });

  describe('Every roman numeral selection should work', () => {
    Exercise.flatAnswerList(BaseRomanAnalysisChordProgressionExercise.allAnswersList).forEach(romanNumeral => {
      it(romanNumeral, () => {
        exercise.updateSettings({
          ...exercise.getCurrentSettings(),
          includedAnswers: [romanNumeral],
        });
        const question = exercise.getQuestion();
        expect(question.segments[0].rightAnswer).toEqual(romanNumeral);
        expect(question.segments[0].partToPlay).toBeTruthy();
      });
    });
  })
})
