import {
  ExerciseSettings,
  SettingsControlDescriptor,
} from 'src/app/exercise/exercise-logic';

export type SettingsConfig<GSettings extends ExerciseSettings> = {
  readonly controls: SettingsControlDescriptor<GSettings>[];
  readonly defaults: GSettings;
};
