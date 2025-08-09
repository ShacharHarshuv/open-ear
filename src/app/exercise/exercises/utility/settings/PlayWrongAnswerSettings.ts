import { Signal } from '@angular/core';
import {
  ExerciseLogic,
  SettingsControlDescriptor,
} from '../../../exercise-logic';

export type PlayWrongAnswerSettings = { playWrongAnswer: boolean };

export function playWrongAnswerSettings() {
  const settingDescriptor: SettingsControlDescriptor<PlayWrongAnswerSettings> =
    {
      key: 'playWrongAnswer',
      default: true,
      info: 'When you click the wrong answer, it will be played immediately, as if you played the (wrong) note on your instrument.',
      descriptor: {
        controlType: 'checkbox',
        label: 'Play Wrong Answer',
      },
    };

  return {
    settingDescriptor,
    getQuestion: <GAnswer extends string>(
      settings: Signal<PlayWrongAnswerSettings>,
      getQuestion: ExerciseLogic<GAnswer>['getQuestion'],
    ) => {
      const originalQuestion = getQuestion();

      return {
        ...originalQuestion,
        segments: originalQuestion.segments.map((segment) => {
          return {
            ...segment,
            playOnWrong: settings().playWrongAnswer
              ? segment.playOnWrong
              : undefined,
          };
        }),
      };
    },
  };
}
