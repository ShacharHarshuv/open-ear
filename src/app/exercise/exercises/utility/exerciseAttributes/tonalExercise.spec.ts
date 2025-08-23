import { Note } from 'tone/Tone/core/type/NoteUnits';
import Exercise from '../../../exercise-logic';
import { expectedKeySelectionSettingsDescriptors } from '../settings/keySelectionSettingsDescriptors.spec';
import { TonalExerciseSettings, useTonalExercise } from './tonalExercise';
import NotesQuestion = Exercise.NotesQuestion;
import AnswerList = Exercise.AnswerList;

export const defaultTonalExerciseSettings: TonalExerciseSettings = {
  cadenceType: 'I IV V I',
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
      expect(question.info).toBe('Key: C');
      expect(question.segments[0].rightAnswer).toBe('Answer 1');
    });

    it('should include cadence when playCadence is true', () => {
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

      expect(question.cadence).toBeDefined();
      expect(question.cadence).not.toBeNull();
    });

    it('should not include cadence when playCadence is false', () => {
      const tonalExercise = useTonalExercise({ playCadence: false });
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

      expect(question.cadence).toBeUndefined();
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
      expect(question.info).toBe(`Key: ${question.key}`);
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

  describe('settingsDescriptors', () => {
    it('should include all descriptors by default', () => {
      const tonalExercise = useTonalExercise();
      expect(tonalExercise.settingsDescriptors).toContain(
        jasmine.objectContaining({ key: 'cadenceType' }),
      );
      expect(tonalExercise.settingsDescriptors).toContain(
        jasmine.objectContaining({ key: 'key' }),
      );
      expect(tonalExercise.settingsDescriptors).toContain(
        jasmine.objectContaining({ key: 'drone' }),
      );
    });

    it('should exclude cadenceType when cadenceTypeSelection is false', () => {
      const tonalExercise = useTonalExercise({
        playCadence: false,
        cadenceTypeSelection: false,
      });

      const hasCadenceType = tonalExercise.settingsDescriptors.some(
        (desc) => desc.key === 'cadenceType',
      );
      expect(hasCadenceType).toBeFalse();
    });

    it('should exclude key selection when keySelection is false', () => {
      const tonalExercise = useTonalExercise({ keySelection: false });

      const hasKeySelection = tonalExercise.settingsDescriptors.some(
        (desc) => desc.key === 'key',
      );
      expect(hasKeySelection).toBeFalse();
    });

    it('should exclude drone when droneSelection is false', () => {
      const tonalExercise = useTonalExercise({ droneSelection: false });

      const hasDrone = tonalExercise.settingsDescriptors.some(
        (desc) => desc.key === 'drone',
      );
      expect(hasDrone).toBeFalse();
    });
  });

  describe('defaults', () => {
    it('should return expected default settings', () => {
      const tonalExercise = useTonalExercise();
      expect(tonalExercise.defaults).toEqual({
        cadenceType: 'I IV V I',
        key: 'random',
        newKeyEvery: 10,
        drone: false,
      });
    });
  });
});
