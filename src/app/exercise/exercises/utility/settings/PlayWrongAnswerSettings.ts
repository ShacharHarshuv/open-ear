import Exercise from '../../../exercise-logic';
import { CreateExerciseParams } from '../exerciseAttributes/createExercise';
import { SettingsParams } from './SettingsParams';

export interface PlayWrongAnswerSettings extends Exercise.Settings {
  playWrongAnswer: boolean;
}

export function playWrongAnswerSettings<GAnswer extends string>() {
  return function (
    params: Pick<
      CreateExerciseParams<GAnswer, Exercise.Settings>,
      'getQuestion'
    >,
  ): SettingsParams<PlayWrongAnswerSettings> &
    Pick<
      CreateExerciseParams<GAnswer, PlayWrongAnswerSettings>,
      'getQuestion'
    > {
    const originalGetQuestion = params.getQuestion;

    return {
      defaultSettings: {
        playWrongAnswer: false,
      },
      settingsDescriptors: () => [
        {
          key: 'playWrongAnswer',
          info: 'When you click the wrong answer, it will be played immediately, as if you played the (wrong) note on your instrument.',
          descriptor: {
            controlType: 'checkbox',
            label: 'Play Wrong Answer',
          },
        },
      ],
      getQuestion: (settings) => {
        const originalQuestion = originalGetQuestion(settings);

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
  };
}
