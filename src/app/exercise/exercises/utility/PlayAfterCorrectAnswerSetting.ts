import { Exercise } from '../../Exercise';

export type PlayAfterCorrectAnswerSetting = {
  playAfterCorrectAnswer: boolean;
}

export const playAfterCorrectAnswerControlDescriptorList = (): Exercise.SettingsControlDescriptor<PlayAfterCorrectAnswerSetting>[] => ([
  {
    key: 'playAfterCorrectAnswer',
    descriptor: {
      controlType: 'CHECKBOX',
      label: `Play Resolution`,
    },
  }
]);
