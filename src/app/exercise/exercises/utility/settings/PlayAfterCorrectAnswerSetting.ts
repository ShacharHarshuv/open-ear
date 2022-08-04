import { Exercise } from '../../../Exercise';

export type PlayAfterCorrectAnswerSetting = {
  playAfterCorrectAnswer: boolean;
}

// todo: convert to object (not functions) and use directly
// namespace CadenceTypeSetting {
//   const descriptor = (param) => ...
// }
export const playAfterCorrectAnswerControlDescriptorList = <GSettings extends PlayAfterCorrectAnswerSetting>(param?: {
  show?: (settings: GSettings) => boolean,
}): Exercise.SettingsControlDescriptor<PlayAfterCorrectAnswerSetting>[] => ([
  {
    key: 'playAfterCorrectAnswer',
    show: param?.show || undefined,
    info: 'After correct answer was clicked the app will play a short segment of music to enforce your memory. <br>This is recommended for beginners.',
    descriptor: {
      controlType: 'checkbox',
      label: `Play Resolution`,
    },
  }
]);
