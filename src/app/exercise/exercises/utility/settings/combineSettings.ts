import { SettingsParams } from './SettingsParams';
import { Exercise } from '../../../Exercise';
import * as _ from 'lodash';

export function combineSettings<GSettings1 extends Exercise.Settings>(...settingsParams: [SettingsParams<GSettings1>]): SettingsParams<GSettings1>;
export function combineSettings<GSettings1 extends Exercise.Settings, GSettings2 extends Exercise.Settings>(...settingsParams: [SettingsParams<GSettings1>, SettingsParams<GSettings2>]): SettingsParams<GSettings1 & GSettings2>;
export function combineSettings<GSettings1 extends Exercise.Settings, GSettings2 extends Exercise.Settings, GSettings3 extends Exercise.Settings>(...settingsParams: [SettingsParams<GSettings1>, SettingsParams<GSettings2>, SettingsParams<GSettings3>]): SettingsParams<GSettings1 & GSettings2 & GSettings3>;
export function combineSettings<GSettings extends Exercise.Settings>(...settingsParams: SettingsParams<GSettings>[]): SettingsParams<GSettings> {
  const defaultSettings: GSettings[] = _.map(settingsParams, p => p.defaultSettings);
  return {
    settingsDescriptors: _.flatMap(settingsParams, p => p.settingsDescriptors),
    defaultSettings: _.merge(defaultSettings[0], defaultSettings.splice(0)),
  };
}
