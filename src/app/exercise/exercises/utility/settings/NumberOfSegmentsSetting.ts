import { Exercise } from '../../../Exercise';

export type NumberOfSegmentsSetting = {
  numberOfSegments: number;
};

export const numberOfSegmentsControlDescriptorList = (name: string): Exercise.SettingsControlDescriptor<NumberOfSegmentsSetting>[] => ([
  {
    key: 'numberOfSegments',
    descriptor: {
      controlType: 'SLIDER',
      label: `Number of ${name}`,
      min: 1,
      max: 8,
      step: 1,
    },
  }
]);
