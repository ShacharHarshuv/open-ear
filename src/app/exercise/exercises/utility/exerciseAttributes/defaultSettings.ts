import Exercise from '../../../exercise-logic';
import { SettingsParams } from '../settings/SettingsParams';

export function defaultSettings<Settings extends Exercise.Settings>(
  defaultSettings: Settings
): Pick<SettingsParams<Settings>, 'defaultSettings'> {
  return {
    defaultSettings,
  };
}
