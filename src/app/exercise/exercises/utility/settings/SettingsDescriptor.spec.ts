import { SettingsDescriptors } from './SettingsDescriptors';
import { Exercise } from '../../../Exercise';
import { MockExercise } from '../../../MockExercise';

const settingsDescriptor: Exercise.SettingsControlDescriptor = {
  key: 'mockSettingKey',
  descriptor: {
    label: 'MockSettingsLabel',
    controlType: 'select',
    options: [
      {
        label: 'Mock Option One',
        value: 'mockOptionOne',
      },
      {
        label: 'Mock Option Two',
        value: 'mockOptionTwo',
      },
    ],
  },
};

@SettingsDescriptors<Exercise.Settings>({
  ...settingsDescriptor,
  defaultValue: 'mockSettingValue',
})
class TestExercise extends MockExercise {
  get settings() {
    return this._settings;
  }
}

describe('SettingsDescriptor', () => {
  it('should work', () => {
    const exercise = new TestExercise();

    expect(exercise.settings).toEqual({
      mockSettingKey: 'mockSettingValue',
    });

    expect(exercise.settingsDescriptor).toEqual([
      jasmine.objectContaining(settingsDescriptor),
    ])
  });
});
