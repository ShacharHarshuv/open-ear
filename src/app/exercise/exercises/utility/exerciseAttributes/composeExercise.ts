import { composeWithMerge } from '../../../../shared/ts-utility/compose';
import { Exercise } from '../../../Exercise';
import {
  StaticOrGetter,
  toGetter,
} from '../../../../shared/ts-utility';

// todo: consider if we can make passing "createExercise" to this, currently we had issues with typing inference
export const composeExercise = composeWithMerge({
  defaultSettings: (value1: Exercise.Settings, value2: Exercise.Settings) => ({
    ...value1,
    ...value2,
  }),
  settingsDescriptors: (
    value1: StaticOrGetter<Exercise.SettingsControlDescriptor<Exercise.Settings>[], [Exercise.Settings]>,
    value2: StaticOrGetter<Exercise.SettingsControlDescriptor<Exercise.Settings>[], [Exercise.Settings]>,
  ) => {
    return (settings) => [
      ...toGetter(value1)(settings),
      ...toGetter(value2)(settings),
    ];
  },
});
