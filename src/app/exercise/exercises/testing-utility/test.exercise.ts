import { Exercise } from '../../Exercise';

export function testExercise(p: {
  getExercise: () => Exercise.Exercise,
  settingDescriptorKeyList: string[],
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
    const settingsDescriptorList = exercise.getSettingsDescriptor?.();
    const expected = p.settingDescriptorKeyList.map(key => jasmine.objectContaining({key}));
    expect(settingsDescriptorList).toEqual(expected);
  })

  return {
    get exercise() {
      return exercise;
    }
  }
}
