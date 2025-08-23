import { flatAnswerList } from '../../exercise-logic';
import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import { chordInKeyExercise } from './chordsInKeyExercise';

describe(chordInKeyExercise.name, () => {
  exerciseSmokeTest(chordInKeyExercise);

  describe('Every roman numeral selection should work', () => {
    flatAnswerList(allRomanNumeralAnswerList).forEach((romanNumeral) => {
      it(romanNumeral, () => {
        const exerciseLogic = chordInKeyExercise.logic({
          ...chordInKeyExercise.settingsConfig.defaults,
          includedAnswers: [romanNumeral],
        });
        const question = exerciseLogic.getQuestion();
        expect(question.segments[0].rightAnswer).toEqual(romanNumeral);
        // @ts-ignore
        expect(question.segments[0].partToPlay).toBeTruthy();
      });
    });
  });
});
