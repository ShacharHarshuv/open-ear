import { SettingsControlDescriptor } from 'src/app/exercise/exercise-logic';

export type KeySelectionSettings = {
  key: 'C' | 'random';
  newKeyEvery: number; // 0 means never (i.e. key is randomized once per session)
};

export const keySelectionSettingsDescriptors: SettingsControlDescriptor<KeySelectionSettings>[] =
  [
    {
      key: 'key',
      info: 'C - all questions will be played in the key of C. <br> Random - a new key will be chosen randomly based on "Change key" settings',
      descriptor: {
        controlType: 'select',
        label: 'Key',
        options: [
          {
            value: 'C',
            label: 'C',
          },
          {
            value: 'random',
            label: 'Random',
          },
        ],
      },
    },
    {
      key: 'newKeyEvery',
      show: (settings: KeySelectionSettings) => settings.key === 'random',
      info: 'When to change key. <br> Never - a key is selected only once per session',
      descriptor: {
        controlType: 'select',
        label: 'Change key',
        options: [
          {
            label: 'Never',
            value: 0,
          },
          {
            label: 'Every Question',
            value: 1,
          },
          {
            label: 'Every 5 Questions',
            value: 5,
          },
          {
            label: 'Every 10 Questions',
            value: 10,
          },
          {
            label: 'Every 20 Questions',
            value: 20,
          },
        ],
      },
    },
  ];
