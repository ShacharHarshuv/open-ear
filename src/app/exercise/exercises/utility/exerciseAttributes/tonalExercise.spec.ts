import {
  TonalExerciseSettings,
  tonalExercise,
  TonalExerciseParams,
} from './tonalExercise';
import { expectedKeySelectionSettingsDescriptors } from '../settings/keySelectionSettingsDescriptors.spec';
import { ResolvedValueOf } from '../../../../shared/ts-utility';
import { Exercise } from '../../../Exercise';
import { Key } from '../../../utility';
import { noteOfType } from '../../../utility/music/notes/NoteType.spec';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteTypeNumber } from '../../../utility/music/notes/toNoteTypeNumber';
import NotesQuestion = Exercise.NotesQuestion;
import AsymmetricMatcher = jasmine.AsymmetricMatcher;

export const defaultTonalExerciseSettings: TonalExerciseSettings = {
  cadenceType: 'I IV V I',
  key: 'random',
  newKeyEvery: 0,
}

export const expectedTonalExerciseSettingsDescriptors: string[] = [
  'Cadence Type',
  ...expectedKeySelectionSettingsDescriptors,
];

describe(tonalExercise.name, function() {
  const mockSettings: TonalExerciseSettings = {
    cadenceType: 'I IV V I',
    key: 'random',
    newKeyEvery: 0,
  };

  function mockQuestion(note: 'C4' | 'D4'): typeof questionToReturn {
    return {
      segments: [{
        partToPlay: note,
        rightAnswer: note == 'C4' ? 'Answer 1' : 'Answer 2',
      }],
    }
  }

  let exercise: ReturnType<ReturnType<typeof tonalExercise>>;
  let questionToReturn: ResolvedValueOf<TonalExerciseParams<string, {}>['getQuestion']> = mockQuestion('C4');

  beforeEach(() => {
    exercise = tonalExercise()({
      answerList: ['Answer 1', 'Answer 2'],
      getQuestion() {
        return questionToReturn;
      },
    });
  });

  describe('key selection', () => {
    function questionInKey(key: Key): AsymmetricMatcher<NotesQuestion> {
      return {
        asymmetricMatch(question: Exercise.NotesQuestion, customTesters: ReadonlyArray<jasmine.CustomEqualityTester>): boolean {
          return !!question.key && toNoteTypeNumber(question.key) === toNoteTypeNumber(key) &&
            noteOfType(key).asymmetricMatch(question.segments[0].partToPlay as Note, customTesters);
        },
        jasmineToString(): string {
          return 'question in key of ' + key;
        }
      }
    }

    it('key of C', () => {
      function getQuestion() {
        return exercise.getQuestion({
          ...mockSettings,
          key: 'C',
        });
      }
      for (let i = 0; i < 100; i++) {
        expect(getQuestion()).toEqual(questionInKey('C'));
      }
    });

    describe('random key never changing', () => {
      function getQuestion() {
        return exercise.getQuestion({
          ...mockSettings,
          key: 'random',
          newKeyEvery: 0,
        });
      }

      for (let i = 0; i < 10; i++) {
        it(`#${i}`, () => {
          const firstQuestion = getQuestion();
          const key: Key = firstQuestion.key!;
          expect(key).toBeTruthy();
          expect(firstQuestion).toEqual(questionInKey(key));
          for (let i = 1; i < 100; i++) {
            expect(getQuestion()).toEqual(questionInKey(key));
          }
        });
      }
    });

    for (let newKeyEvery of [5, 10]) {
      describe(`random key changing every ${newKeyEvery} questions`, () => {
        function getQuestion() {
          return exercise.getQuestion({
            ...mockSettings,
            key: 'random',
            newKeyEvery,
          });
        }

        for (let i = 0; i < 10; i++) {
          it(`#${i}`, () => {
            const firstQuestion = getQuestion();
            const firstKey: Key = firstQuestion.key!;
            expect(firstKey).toBeTruthy();
            expect(firstQuestion).toEqual(questionInKey(firstKey));
            for (let i = 1; i < newKeyEvery; i++) {
              expect(getQuestion()).toEqual(questionInKey(firstKey));
            }

            const questionWithNewKey = getQuestion();
            const newKey = questionWithNewKey.key!;
            expect(newKey).toBeTruthy();
            expect(newKey).not.toEqual(firstKey);
            for (let i = 1; i < newKeyEvery; i++) {
              expect(getQuestion()).toEqual(questionInKey(newKey));
            }
          });
        }
      })
    }
  });
});
