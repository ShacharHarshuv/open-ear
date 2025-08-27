import { Note } from 'tone/Tone/core/type/NoteUnits';
import Exercise from '../../../exercise-logic';
import { expectedKeySelectionSettingsDescriptors } from '../settings/keySelectionSettingsDescriptors.spec';
import { TonalExerciseSettings, useTonalExercise } from './tonalExercise';
import NotesQuestion = Exercise.NotesQuestion;
import AnswerList = Exercise.AnswerList;

export const defaultTonalExerciseSettings: TonalExerciseSettings = {
  key: 'random',
  newKeyEvery: 0,
  drone: false,
};

export const expectedTonalExerciseSettingsDescriptors: string[] = [
  'Cadence Type',
  ...expectedKeySelectionSettingsDescriptors,
  'Drone',
];

describe(useTonalExercise.name, function () {
  describe('getQuestion', () => {
    it('should handle key selection when key is C', () => {
      const tonalExercise = useTonalExercise();
      const questionInC = {
        segments: [
          {
            partToPlay: 'C4' as Note,
            rightAnswer: 'Answer 1',
          },
        ],
      };

      const question = tonalExercise.getQuestion(
        { ...defaultTonalExerciseSettings, key: 'C' },
        questionInC,
      );

      expect(question.key).toBe('C');
      expect(question.info).toBe('1 = C');
      expect(question.segments[0].rightAnswer).toBe('Answer 1');
    });

    it('should include drone when drone setting is enabled', () => {
      const tonalExercise = useTonalExercise();
      const questionInC = {
        segments: [
          {
            partToPlay: 'C4' as Note,
            rightAnswer: 'Answer 1',
          },
        ],
      };

      const question = tonalExercise.getQuestion(
        { ...defaultTonalExerciseSettings, key: 'C', drone: 1 },
        questionInC,
      );

      expect(question.drone).toBeDefined();
      expect(question.drone).not.toBeNull();
    });

    it('should not include drone when drone setting is false', () => {
      const tonalExercise = useTonalExercise();
      const questionInC = {
        segments: [
          {
            partToPlay: 'C4' as Note,
            rightAnswer: 'Answer 1',
          },
        ],
      };

      const question = tonalExercise.getQuestion(
        { ...defaultTonalExerciseSettings, key: 'C', drone: false },
        questionInC,
      );

      expect(question.drone).toBeNull();
    });

    it('should handle random key selection', () => {
      const tonalExercise = useTonalExercise();
      const questionInC = {
        segments: [
          {
            partToPlay: 'C4' as Note,
            rightAnswer: 'Answer 1',
          },
        ],
      };

      const question = tonalExercise.getQuestion(
        { ...defaultTonalExerciseSettings, key: 'random', newKeyEvery: 0 },
        questionInC,
      );

      expect(question.key).toBeDefined();
      expect(question.key).not.toBe('random' as any);
      expect(question.info).toBe(`1 = ${question.key}`);
    });
  });

  describe('answerList', () => {
    it('should handle playOnClick functions', () => {
      const tonalExercise = useTonalExercise();
      const answerListInC: AnswerList<string> = [
        {
          answer: 'Answer 1',
          playOnClick: () => 'C4',
        },
      ];

      const mockQuestion: NotesQuestion = {
        segments: [
          {
            partToPlay: 'C4' as Note,
            rightAnswer: 'Answer 1',
          },
        ],
      };
      tonalExercise.getQuestion(
        {
          ...defaultTonalExerciseSettings,
          key: 'C',
        },
        mockQuestion,
      );
      const answerList = tonalExercise.answerList(answerListInC);

      const result = answerList[0].playOnClick!(mockQuestion);
      expect(result).toBe('C4');
    });

    it('should handle null playOnClick', () => {
      const tonalExercise = useTonalExercise();
      const answerListInC: AnswerList<string> = [
        {
          answer: 'Answer 1',
          playOnClick: null,
        },
      ];

      const answerList = tonalExercise.answerList(answerListInC);
      expect(answerList[0].playOnClick).toBeNull();
    });
  });
});
