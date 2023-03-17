import Exercise from '../../../Exercise';
import { withSettings } from './withSettings';

export type NumberOfSegmentsSetting = {
  numberOfSegments: number;
};

export const numberOfSegmentsControlDescriptorList = (
  name: string
): Exercise.SettingsControlDescriptor<NumberOfSegmentsSetting>[] => [
  {
    key: 'numberOfSegments',
    descriptor: {
      controlType: 'slider',
      label: `Number of ${name}`,
      min: 1,
      max: 8,
      step: 1,
    },
  },
];

export const numberOfSegmentsSettings = (name: string) =>
  withSettings({
    settingsDescriptors: numberOfSegmentsControlDescriptorList(name),
    defaultSettings: {
      numberOfSegments: 1,
    },
  });
