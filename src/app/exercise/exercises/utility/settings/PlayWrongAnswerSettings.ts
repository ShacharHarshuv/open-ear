import {
  ExerciseLogic,
  SettingsControlDescriptor,
} from '../../../exercise-logic';

export type PlayWrongAnswerSettings = { playWrongAnswer: boolean };

export function usePlayWrongAnswer() {
  const settingDescriptor: SettingsControlDescriptor<PlayWrongAnswerSettings> =
    {
      key: 'playWrongAnswer',
      info: 'When you click the wrong answer, it will be played immediately, as if you played the (wrong) note on your instrument.',
      descriptor: {
        controlType: 'checkbox',
        label: 'Play Wrong Answer',
      },
    };

  const defaults: PlayWrongAnswerSettings = {
    playWrongAnswer: true,
  };

  return {
    defaults,
    settingDescriptor,
    getQuestion: <GAnswer extends string>(
      settings: PlayWrongAnswerSettings,
      getQuestion: ExerciseLogic<GAnswer>['getQuestion'],
    ) => {
      const originalQuestion = getQuestion();

      return {
        ...originalQuestion,
        segments: originalQuestion.segments.map((segment) => {
          return {
            ...segment,
            playOnWrong: settings.playWrongAnswer
              ? segment.playOnWrong
              : undefined,
          };
        }),
      };
    },
  };
}
