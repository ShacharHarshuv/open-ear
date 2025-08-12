import {
  ExerciseSettings,
  SettingsControlDescriptor,
} from 'src/app/exercise/exercise-logic';

export type SettingsParams<GSettings extends ExerciseSettings> = {
  readonly descriptors: SettingsControlDescriptor<GSettings>[];
  readonly defaults: GSettings;
};
