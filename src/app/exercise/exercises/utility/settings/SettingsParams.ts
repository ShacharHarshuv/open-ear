import Exercise from '../../../exercise-logic';
import { StaticOrGetter } from '../../../../shared/ts-utility';

export type SettingsParams<GSettings extends Exercise.Settings> = {
  readonly settingsDescriptors?: StaticOrGetter<
    Exercise.SettingsControlDescriptor<GSettings>[],
    [GSettings]
  >;
  readonly defaultSettings: GSettings;
};
