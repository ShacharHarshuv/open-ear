import { Exercise } from '../../../Exercise';

export type NumberOfSegmentsSetting = {
  numberOfSegments: number;
};

// todo: name space like so
// namespace CadenceTypeSetting {
//   const descriptor = (name: string) => ...
// }
export const numberOfSegmentsControlDescriptorList = (name: string): Exercise.SettingsControlDescriptor<NumberOfSegmentsSetting>[] => ([
  {
    key: 'numberOfSegments',
    descriptor: {
      controlType: 'slider',
      label: `Number of ${name}`,
      min: 1,
      max: 8,
      step: 1,
    },
  }
]);
