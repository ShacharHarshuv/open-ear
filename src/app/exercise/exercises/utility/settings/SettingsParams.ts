import { Exercise } from '../../../Exercise';

export type SettingsParams<GSettings extends Exercise.Settings> = {
  readonly settingsDescriptors?: Exercise.SettingsControlDescriptor<GSettings>[];
  readonly defaultSettings: GSettings,
}
