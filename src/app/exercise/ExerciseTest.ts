import Exercise from './exercise-logic';

export namespace ExerciseTest {
  export function answerListContaining<GAnswer extends string>(
    answerList: ReadonlyArray<GAnswer>
  ): jasmine.AsymmetricMatcher<Exercise.AnswerList<GAnswer>> {
    return {
      asymmetricMatch(
        other: Exercise.AnswerList<GAnswer>,
        customTesters: ReadonlyArray<jasmine.CustomEqualityTester>
      ): boolean {
        return jasmine
          .arrayWithExactContents(answerList)
          .asymmetricMatch(Exercise.flatAnswerList(other), customTesters);
      },
    };
  }
}
