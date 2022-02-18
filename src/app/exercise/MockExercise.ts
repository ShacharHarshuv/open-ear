import { Exercise } from './Exercise';
import { IV_V_I_CADENCE_IN_C } from './utility/music/chords';

export class MockExercise implements Exercise.IExercise {
  static instance: Readonly<MockExercise> = new MockExercise();
  static mockQuestion: Exercise.Question<string> = {
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

  readonly explanation: Exercise.ExerciseExplanationContent = 'This is my exercise explanation';
  readonly id: string = 'mockExerciseId';
  readonly name: string = 'mockExerciseName';
  readonly summary: string = 'mockExerciseSummary';

  getAnswerList(): Exercise.AnswerList<string> {
    return [];
  }

  getQuestion(): Exercise.Question<string> {
    return MockExercise.mockQuestion;
  }
}
