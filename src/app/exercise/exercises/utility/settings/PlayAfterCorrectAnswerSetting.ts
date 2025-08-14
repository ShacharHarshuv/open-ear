import Exercise, { ExerciseSettings } from '../../../exercise-logic';

export type PlayAfterCorrectAnswerSetting = {
  playAfterCorrectAnswer: boolean;
};

export const playAfterCorrectAnswerControlDescriptorList = <
  GSettings extends ExerciseSettings = {},
>(param?: {
  show?: (settings: GSettings) => boolean;
}): Exercise.SettingsControlDescriptor<PlayAfterCorrectAnswerSetting>[] => [
  {
    key: 'playAfterCorrectAnswer',
    show: param?.show || undefined,
    info: 'After correct answer was clicked the app will play a short segment of music to enforce your memory. <br>This is recommended for beginners.',
    descriptor: {
      controlType: 'checkbox',
      label: `Play Resolution`,
    },
  },
];
