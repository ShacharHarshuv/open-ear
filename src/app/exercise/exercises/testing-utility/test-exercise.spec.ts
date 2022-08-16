import { Exercise } from '../../Exercise';
import { toGetter } from '../../../shared/ts-utility';
import Expected = jasmine.Expected;
import { ExerciseTest } from '../../ExerciseTest';

export function testExercise<GSettings extends Exercise.Settings>(p: {
  readonly getExercise: () => Exercise.Exercise,
  readonly settingDescriptorList: (string | Expected<Exercise.SettingsControlDescriptor>)[],
  readonly defaultSettings?: Readonly<GSettings>,
  readonly defaultAnswers?: ReadonlyArray<string>,
}): {
  readonly exercise: Exercise.Exercise;
} {
  let exercise: Exercise.Exercise;

  beforeEach(() => {
    exercise = p.getExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  });

  it('getAnswerList should return a truthy value', () => {
    expect(exercise.getAnswerList()).toBeTruthy();
  });

  it('should have the right settings', () => {
    const settingsDescriptorList = exercise.getSettingsDescriptor?.()?.map(descriptor => ({
      ...descriptor,
      descriptor: toGetter(descriptor.descriptor)(exercise.getCurrentSettings?.()!),
    }));
    const expected = p.settingDescriptorList.map((expected) => {
      if (typeof expected === 'string') {
        return jasmine.objectContaining<Exercise.SettingsControlDescriptor>({
          descriptor: jasmine.objectContaining({
            label: expected,
          }),
        });
      }

      return expected;
    })
    // @ts-ignore
    expect(settingsDescriptorList).toEqual(expected);
  })

  // todo: consider making this required
  if (p.defaultSettings) {
    it('should have the correct default settings', () => {
      const currentSettings = exercise.getCurrentSettings?.();
      expect(currentSettings).toEqual(p.defaultSettings);
    });
  }

  if (p.defaultAnswers) {
    it('should have the correct default answers', () => {
      expect(exercise.getAnswerList()).toEqual(ExerciseTest.answerListContaining(p.defaultAnswers!))
    })
  }

  return {
    get exercise() {
      return exercise;
    },
  }
}
