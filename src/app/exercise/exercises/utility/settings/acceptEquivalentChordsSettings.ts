import { Settings } from '../../../exercise-logic';
import { SettingsParams } from './SettingsParams';

export interface AcceptEquivalentChordSettings extends Settings {
  acceptEquivalentChord: boolean;
}

export const flexibleChordChoiceSettings: SettingsParams<AcceptEquivalentChordSettings> =
  {
    settingsDescriptors: [
      {
        key: 'acceptEquivalentChord',
        info:
          'Accepts simplifies chords when they are harmonically similar, which makes it easier to focus on the core harmonic identity, rather than on subtleties of arrangment. <br>' +
          'For example, Imaj7 = I, vi7 = vi. However, IV7 ≠ IV because IV7 is functionally different than IV. The "real" answer will still appear.',
        descriptor: {
          label: 'Accept Equivalent Chords',
          controlType: 'checkbox',
        },
      },
    ],
    defaultSettings: {
      acceptEquivalentChord: true,
    },
  };
