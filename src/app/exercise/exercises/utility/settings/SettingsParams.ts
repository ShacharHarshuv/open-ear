import { StaticOrGetter } from '../../../../shared/ts-utility';
import Exercise from '../../../exercise-logic';

export type SettingsParams<GSettings extends Exercise.Settings> = {
  readonly settingsDescriptors?: StaticOrGetter<
    Exercise.SettingsControlDescriptor<GSettings>[],
    [GSettings]
  >;
  readonly defaultSettings: GSettings;
};
