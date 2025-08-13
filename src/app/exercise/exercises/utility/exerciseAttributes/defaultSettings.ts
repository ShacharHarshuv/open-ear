import Exercise from '../../../exercise-logic';
import { SettingsConfig } from '../../../exercise-logic/settings-config';

export function defaultSettings<Settings extends Exercise.Settings>(
  defaultSettings: Settings,
): Pick<SettingsConfig<Settings>, 'defaultSettings'> {
  return {
    defaults: defaultSettings,
  };
}
