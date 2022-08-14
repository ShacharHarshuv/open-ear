import { composeWithMerge } from '../../../../shared/ts-utility/compose';
import { Exercise } from '../../../Exercise';

// todo: add unit tests
// todo: consider if we can make passing "createExercise" to this, currently we had issues with typing inference
export const composeExercise = composeWithMerge({
  defaultSettings: (value1: Exercise.Settings, value2: Exercise.Settings) => ({
    ...value1,
    ...value2,
  }),
  settingsDescriptors: (value1: Exercise.SettingsControlDescriptor<Exercise.Settings>[], value2: Exercise.SettingsControlDescriptor<Exercise.Settings>[]) => {
    return [
      ...value1,
      ...value2,
    ];
  },
});
