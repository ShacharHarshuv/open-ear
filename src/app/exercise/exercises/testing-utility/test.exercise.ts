import { Exercise } from '../../Exercise';
import Expected = jasmine.Expected;
import { toGetter } from '../../../shared/ts-utility';

export function testExercise(p: {
  getExercise: () => Exercise.Exercise,
  settingDescriptorList: (string | Expected<Exercise.SettingsControlDescriptor>)[],
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

  it('should have the right settings', () => {
    const settingsDescriptorList = exercise.getSettingsDescriptor?.()?.map(descriptor => ({
      ...descriptor,
      descriptor: toGetter(descriptor.descriptor)(exercise.getCurrentSettings?.()!)
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

  return {
    get exercise() {
      return exercise;
    }
  }
}
