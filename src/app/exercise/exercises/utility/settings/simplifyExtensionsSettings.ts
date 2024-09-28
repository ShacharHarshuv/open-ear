import { Settings } from '../../../exercise-logic';
import { SettingsParams } from './SettingsParams';

export interface SimplifyExtensionsSettings extends Settings {
  simplifyExtensions: boolean;
}

export const simplifyExtensionsSettings: SettingsParams<SimplifyExtensionsSettings> =
  {
    settingsDescriptors: [
      {
        key: 'simplifyExtensions',
        info:
          'Removes / simplifies chord extensions when they are not necessary for the harmonic understanding of the chord, which makes it easier to focus on the core harmonic progression, rather than on hard to hear subtleties. <br>' +
          'For example, Imaj7 => I, vi7 => vi. However, chords like IV7 will be conserved because they are fundamentally different from IV. Note that 9 and up will not be converted because they have a distinct sound.',
        descriptor: {
          label: 'Simplify Extensions',
          controlType: 'checkbox',
        },
      },
    ],
    defaultSettings: {
      simplifyExtensions: true,
    },
  };
