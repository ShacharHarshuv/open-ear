import { AdaptiveExercise } from './adaptive-exercise';
import { Exercise } from '../../Exercise';
import { toNoteName } from '../../utility';
import IExercise = Exercise.IExercise;

describe('adaptive exercise', function() {
  let questionIndex: number;
  let baseExercise: IExercise;
  let adaptiveExercise: AdaptiveExercise;

  function generateQuestion(_questionIndex: number): Exercise.Question {
    return {
      segments: [{
        partToPlay: toNoteName(21 + _questionIndex),
        rightAnswer: 'CORRECT',
      }],
    };
  }

  beforeEach(() => {
    questionIndex = 0;
    baseExercise = {
      name: '',
      id: '',
      summary: '',
      getAnswerList(): Exercise.AnswerList<string> {
        return ['CORRECT', 'WRONG'];
      },
      getQuestion(): Exercise.Question<string> {
        return generateQuestion(questionIndex++);
      },
    };
    adaptiveExercise = new AdaptiveExercise(baseExercise);
  });

  function testAdaptiveExercise(questionsAndAnswers: [number, boolean][]): void {
    questionsAndAnswers.forEach(([questionIndex, wasAnswerRight]) => {
      expect(adaptiveExercise.getQuestion()).toEqual(generateQuestion(questionIndex));
      adaptiveExercise.reportAnswerCorrectness(wasAnswerRight);
    });
  }

  function generateTestCases(questionIndexToStart: number, numberOfQuestions: number, answer = true): [number, boolean][] {
    const x: [number, boolean][] = [];
    let index: number = questionIndexToStart;
    while (x.length < numberOfQuestions) {
      x.push([index, true]);
      index++;
    }

    return x;
  }

  it('should return the same answers if all are answered correctly', () => {
    testAdaptiveExercise([
      [0, true],
      [1, true],
      [2, true],
    ]);
  });

  it('should return to answer if answered incorrectly', () => {
    testAdaptiveExercise([
      [0, false], // 0
      [1, true], // 1
      [0, true], // 2
      ...generateTestCases(2, 3),
      [0, true], // 4
      ...generateTestCases(5, 7),
      [0, true], // 11,
      ...generateTestCases(12, 16),
    ]);
  });

  it('should return to answer if answered incorrectly twice', () => {
    testAdaptiveExercise([
      [0, false], // 0
      [1, true], // 1
      [0, true], // 2
      ...generateTestCases(2, 3),
      [0, false], // 4
      [5, true], // 5
      [0, true], // 6,
    ]);
  });

  it('should handle multiple questions to repeat clashing', () => {
    testAdaptiveExercise([
      [0, false], // 0
      [1, true], // 1
      [0, true], // 2
      [2, true],
      [3, false],
      [4, true],
      [0, true], // 4
      [3, true],
      [5, true],
    ]);
  })
});
