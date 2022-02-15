import { Exercise } from './Exercise';

export class MockExercise implements Exercise.IExercise {
  readonly explanation: Exercise.ExerciseExplanationContent = 'This is my exercise explanation';
  readonly id: string = 'mockExerciseId';
  readonly name: string = 'mockExerciseName';
  readonly summary: string = 'mockExerciseSummary';

  getAnswerList(): Exercise.AnswerList<string> {
    return [];
  }

  getQuestion(): Exercise.Question<string> {
    return {
      segments: [
        {
          rightAnswer: 'Answer 1',
          partToPlay: 'C4',
        },
      ],
    };
  }

  static instance: Readonly<MockExercise> = new MockExercise();
}
