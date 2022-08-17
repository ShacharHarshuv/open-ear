import { Exercise } from '../../Exercise';
import {
  chordInKeyExercise,
} from './chordsInKeyExercise';
import {
  allRomanNumeralAnswerList,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise.spec';

describe(chordInKeyExercise.name, () => {
  const context = testExercise({
    getExercise: chordInKeyExercise,
    settingDescriptorList: [
      'Cadence Type',
      'Included Roman Numerals',
      ...expectedVoicingSettings,
      'Number of chords',
      'Play Resolution',
    ],
  })

  describe('Every roman numeral selection should work', () => {
    Exercise.flatAnswerList(allRomanNumeralAnswerList).forEach(romanNumeral => {
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
