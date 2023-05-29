import Exercise from './exercise-logic';
import {
  PlayerService,
  PartToPlay,
  NoteEvent,
} from '../services/player.service';
import { createExercise } from './exercises/utility/exerciseAttributes/createExercise';
import MatchableArgs = jasmine.MatchableArgs;

export namespace MockExercise {
  export const instance = create();

  export const mockQuestion: Exercise.Question<string> = {
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

  export function create(id?: string) {
    return createExercise<string, Exercise.Settings>({
      explanation: 'This is my exercise explanation',
      id: id || 'mockExerciseId',
      name: 'mockExerciseName',
      summary: 'mockExerciseSummary',
      answerList: [],
      getQuestion(): Exercise.Question<string> {
        return mockQuestion;
      },
      settingsDescriptors: [],
      defaultSettings: {},
    });
  }

  /**
   * figure out how to make a more flexible test here
   * For example, there are multiple ways to pass in time
   * (Like a custom matcher?)
   */
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
}
