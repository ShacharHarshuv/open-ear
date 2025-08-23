import { Exercise } from '../../exercise-logic';
import { toGetter } from '../../utility';
import Expected = jasmine.Expected;

export function exerciseSmokeTest(exercise: Exercise) {
  it('getQuestion should return a truthy value', () => {
    expect(
      exercise.logic(exercise.settingsConfig.defaults).getQuestion(),
    ).toBeTruthy();
  });

  it('getAnswerList should return a truthy value', () => {
    expect(
      toGetter(exercise.logic(exercise.settingsConfig.defaults).answerList)(),
    ).toBeTruthy();
  });
}
