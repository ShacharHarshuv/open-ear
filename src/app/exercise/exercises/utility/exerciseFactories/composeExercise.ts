import {
  composeWithMerge,
  ComposableFunction,
  PropertiesMergeConfig,
} from '../../../../shared/ts-utility/compose';
import { createExercise } from './createExercise';
import { SettingsParams } from '../settings/SettingsParams';
import { Exercise } from '../../../Exercise';

// todo: add unit tests
export function composeExercise<Fn1 extends ComposableFunction>(fn1: Fn1);
export function composeExercise<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction>(fn1: Fn1, fn2: Fn2);
export function composeExercise<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, Fn3 extends ComposableFunction>(fn1: Fn1, fn2: Fn2, fn3: Fn3);
export function composeExercise<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, Fn3 extends ComposableFunction, Fn4 extends ComposableFunction>(fn1: Fn1, fn2: Fn2, fn3: Fn3, fn4: Fn4);
export function composeExercise<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, Fn3 extends ComposableFunction, Fn4 extends ComposableFunction, Fn5 extends ComposableFunction>(fn1: Fn1, fn2: Fn2, fn3: Fn3, fn4: Fn4, fn5: Fn5);
export function composeExercise<FnList extends ComposableFunction[]>(...fnList: FnList[]) {
  const mergeFunctions: PropertiesMergeConfig<SettingsParams<Exercise.Settings>> = {
    defaultSettings: (value1: Exercise.Settings, value2: Exercise.Settings) => ({
      ...value1,
      ...value2,
    }),
    settingsDescriptors: (value1: Exercise.SettingsControlDescriptor<Exercise.Settings>[], value2: Exercise.SettingsControlDescriptor<Exercise.Settings>[]) => [
      ...value1,
      ...value2,
    ],
  };

  const compose = composeWithMerge(mergeFunctions);

  return compose(
    // @ts-ignore
    ...fnList,
    createExercise,
  );
}

