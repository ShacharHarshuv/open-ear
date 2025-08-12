import { SettingsParams } from './SettingsParams';

export type VoicingSettings = {
  voiceLeading: 'RANDOM' | 'CORRECT';
  includedPositions: (0 | 1 | 2)[];
  includeBass: boolean;
};

export const chordVoicings: SettingsParams<VoicingSettings> = {
  descriptors: [
    {
      key: 'voiceLeading',
      info:
        'Smooth: voices in the chords will move as little as possible (as usually happens in real music) <br>' +
        'Random: each chord will have a random position regardless of the previous chord. Choose this if you want to limit the included positions',
      descriptor: {
        controlType: 'select',
        label: 'Voice Leading',
        options: [
          {
            label: 'Random',
            value: 'RANDOM',
          },
          {
            label: 'Smooth',
            value: 'CORRECT',
          },
        ],
      },
    },
    {
      key: 'includeBass',
      info: 'When turned off, the bass note will not be played',
      descriptor: {
        controlType: 'checkbox',
        label: 'Include Bass',
      },
    },
    {
      key: 'includedPositions' as const,
      info: 'Limit the included top voices positions.',
      show: (settings: VoicingSettings) => settings.voiceLeading === 'RANDOM',
      descriptor: {
        controlType: 'list-select',
        label: 'Included Positions (top voices)',
        allOptions: [
          {
            value: 0,
            label: 'Root Position',
          },
          {
            value: 1,
            label: '1st Inversion',
          },
          {
            value: 2,
            label: '2nd Inversion',
          },
        ],
      },
    },
  ],
  defaults: {
    voiceLeading: 'CORRECT',
    includedPositions: [0, 1, 2],
    includeBass: true,
  },
};
