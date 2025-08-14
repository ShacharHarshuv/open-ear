import { AcceptableChordAnalysisOptions } from 'src/app/exercise/utility/music/harmony/isAcceptableChordAnalysis';
import { SettingsConfig } from '../../../exercise-logic/settings-config';

export type AcceptEquivalentChordSettings = {
  acceptEquivalentChord: boolean;
};

export const flexibleChordChoiceSettings: SettingsConfig<AcceptEquivalentChordSettings> =
  {
    controls: [
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
    defaults: {
      acceptEquivalentChord: true,
    },
  };

export function acceptableChordAnalysisOptions(
  settings: AcceptEquivalentChordSettings,
): AcceptableChordAnalysisOptions {
  return {
    ignoreExtensions: settings.acceptEquivalentChord
      ? 'when-equivalent'
      : false,
    ignoreSharp5: !!settings.acceptEquivalentChord,
    ignoreSuspensions: false,
  };
}
