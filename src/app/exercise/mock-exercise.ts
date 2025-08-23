import {
  NoteEvent,
  PartToPlay,
  PlayerService,
} from '../services/player.service';
import { Exercise, ExerciseSettings, Question } from './exercise-logic';
import MatchableArgs = jasmine.MatchableArgs;

export const mockQuestion: Question<string> = {
  segments: [
    {
      rightAnswer: 'Answer 1',
      partToPlay: 'C4',
    },
    {
      rightAnswer: 'Answer 2',
      partToPlay: 'D4',
    },
  ],
  cadence: 'E4',
};

export const mockExercise: Exercise<string, ExerciseSettings> = {
  explanation: 'This is my exercise explanation',
  id: 'mockExerciseId',
  name: 'mockExerciseName',
  summary: 'mockExerciseSummary',
  settingsConfig: {
    defaults: {},
    controls: [],
  },
  logic: () => ({
    answerList: [],
    getQuestion(): Question<string> {
      return mockQuestion;
    },
  }),
};

export const cadenceToPlayExpectation: MatchableArgs<
  PlayerService['playMultipleParts']
>[0][] = [
  // cadence
  jasmine.objectContaining<PartToPlay>({
    partOrTime: [
      jasmine.objectContaining<NoteEvent>({
        notes: ['E4'],
        duration: '4n',
      }),
    ],
  }),
  jasmine.objectContaining<PartToPlay>({
    // this can be optional, need to make the test more relaxed
    partOrTime: 100,
  }),
];

export const questionToPlayExpectation: MatchableArgs<
  PlayerService['playMultipleParts']
>[0][] = [
  // first segment
  jasmine.objectContaining<PartToPlay>({
    partOrTime: [
      jasmine.objectContaining({
        notes: ['C4'],
        duration: '4n',
      }),
    ],
  }),
  //second segment
  jasmine.objectContaining<PartToPlay>({
    partOrTime: [
      jasmine.objectContaining({
        notes: ['D4'],
        duration: '4n',
      }),
    ],
  }),
];
