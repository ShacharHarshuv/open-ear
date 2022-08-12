import { Exercise } from '../../Exercise';
import { ChordsInKeyExercise } from './ChordsInKeyExercise';
import { BaseRomanAnalysisChordProgressionExercise } from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import { testExercise } from '../testing-utility/test.exercise';

describe('chordsInKeyExercise', () => {
  const context = testExercise({
    getExercise: () => new ChordsInKeyExercise(),
    settingDescriptorList: [
      'Cadence Type',
      'Included Options',
      'Voice Leading',
      'Include Bass',
      'Included Positions (top voices)',
      'Number of chords',
      'Play Resolution',
    ],
  })

  describe('Every roman numeral selection should work', () => {
    Exercise.flatAnswerList(BaseRomanAnalysisChordProgressionExercise.allAnswersList).forEach(romanNumeral => {
      it(romanNumeral, () => {
        context.exercise.updateSettings?.({
          ...context.exercise.getCurrentSettings?.(),
          includedAnswers: [romanNumeral],
        });
        const question = context.exercise.getQuestion();
        expect(question.segments[0].rightAnswer).toEqual(romanNumeral);
        // @ts-ignore
        expect(question.segments[0].partToPlay).toBeTruthy();
      });
    });
  })
})
