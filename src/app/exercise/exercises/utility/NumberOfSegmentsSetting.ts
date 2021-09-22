import { Exercise } from '../../Exercise';

export type NumberOfSegmentsSetting = {
  numberOfSegments: number;
};

export const numberOfSegmentsControlDescriptorList: Exercise.SettingsControlDescriptor<NumberOfSegmentsSetting>[] = [
  {
    key: 'numberOfSegments',
    descriptor: {
      controlType: 'SLIDER',
      label: 'Number of chords',
      min: 1,
      max: 8,
      step: 1,
    },
  }
];
