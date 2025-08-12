import { SettingsParams } from './SettingsParams';

export type AnalyzeBySettings = {
  tonicForAnalyzing: 'major' | 'always-major' | 'original';
};

export const analyzeBy: SettingsParams<AnalyzeBySettings> = {
  descriptors: [
    {
      key: 'tonicForAnalyzing',
      info:
        'Determines how chord progression in different modes are analyzed. <br>' +
        'For example - Am G F G Am can be analyzed in relation to its "True Tonic" tonic in A-Minor: i bVII bVI bVII i, or in its "Relative Major" - vi V IV V vi. Both analysis can be found in music theory resources.<br>' +
        '"Minor -> Relative Major" will only convert Minor, Dorian, and Phrygian modes, so Myxolodian progressions such as I bVII IV will stay as is, which is the recommended mode to practice. <br>' +
        '"Always Relative Major" will always convert ALL modes to the relative major tonic, so Myxolodian progressions such as I bVII IV will be converted to V IV I<br>',
      descriptor: {
        label: 'Analyze By',
        controlType: 'select',
        options: [
          {
            label: 'Minor -> Relative Major',
            value: 'major',
          },
          {
            label: 'Always Relative Major',
            value: 'always-major',
          },
          {
            label: 'True Tonic',
            value: 'original',
          },
        ],
      },
    },
  ],
  defaults: {
    tonicForAnalyzing: 'major',
  },
};
