import { Exercise } from '../../Exercise';

export type PlayAfterCorrectAnswerSetting = {
  playAfterCorrectAnswer: boolean;
}

export const playAfterCorrectAnswerControlDescriptorList = <GSettings extends PlayAfterCorrectAnswerSetting>(param?: {
  show?: (settings: GSettings) => boolean,
}): Exercise.SettingsControlDescriptor<PlayAfterCorrectAnswerSetting>[] => ([
  {
    key: 'playAfterCorrectAnswer',
    show: param?.show || undefined,
    descriptor: {
      controlType: 'CHECKBOX',
      label: `Play Resolution`,
    },
  }
]);
