import Exercise from '../../../exercise-logic';

export type NumberOfSegmentsSetting = {
  numberOfSegments: number;
};

export const useNumberOfSegments = (name: string) => {
  const defaultSettings: NumberOfSegmentsSetting = {
    numberOfSegments: 1,
  };
  const settingsDescriptor: Exercise.SettingsControlDescriptor<NumberOfSegmentsSetting> =
    {
      key: 'numberOfSegments',
      descriptor: {
        controlType: 'slider',
        label: `Number of ${name}`,
        min: 1,
        max: 8,
        step: 1,
      },
    };

  return {
    settingsDescriptor,
    defaults: defaultSettings,
  };
};
