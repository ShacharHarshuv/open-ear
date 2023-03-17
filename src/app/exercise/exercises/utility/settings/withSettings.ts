import { Exercise } from '../../../Exercise';
import { SettingsParams } from './SettingsParams';

export function withSettings<GSettings extends Exercise.Settings>(
  p: SettingsParams<GSettings>
): ({}) => SettingsParams<GSettings> {
  return function ({}) {
    return p;
  };
}
