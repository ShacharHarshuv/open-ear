import { Exercise } from './Exercise';

export namespace ExerciseTest {
  export function answerListContaining<GAnswer extends string>(answerList: GAnswer[]): jasmine.AsymmetricMatcher<Exercise.AnswerList<GAnswer>> {
    return {
      asymmetricMatch(other: Exercise.AnswerList<GAnswer>, customTesters: ReadonlyArray<jasmine.CustomEqualityTester>): boolean {
        return jasmine.arrayWithExactContents(answerList).asymmetricMatch(Exercise.flatAnswerList(other), customTesters);
      }
    }
  }
}
