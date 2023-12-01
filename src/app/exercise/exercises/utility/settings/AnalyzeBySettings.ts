import { Settings } from '../../../exercise-logic';
import { SettingsParams } from './SettingsParams';

export interface AnalyzeBySettings extends Settings {
  tonicForAnalyzing: 'major' | 'original';
}

export const analyzeBySettings: SettingsParams<AnalyzeBySettings> = {
  settingsDescriptors: [
    {
      key: 'tonicForAnalyzing',
      info:
        'Determines how chord progression in different modes are analyzed. <br>' +
        'For example - Am G F G Am can be analyzed in relation to its "True Tonic" tonic in A-Minor: i bVII bVI bVII i, or in its relative "Major Tonic" - vi V IV V vi. Some musicians can find it useful to use the relative major analysis for all modes.',
      descriptor: {
        label: 'Analyze By',
        controlType: 'select',
        options: [
          {
            label: 'Relative Major Tonic',
            value: 'major',
          },
          {
            label: 'True Tonic',
            value: 'original',
          },
        ],
      },
    },
  ],
  defaultSettings: {
    tonicForAnalyzing: 'major',
  },
};
