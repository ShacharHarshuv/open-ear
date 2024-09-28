import { toGetter } from '../../../../shared/ts-utility';
import Exercise, { isMultiAnswerCell } from '../../../exercise-logic';
import { CreateExerciseParams } from '../exerciseAttributes/createExercise';
import { SettingsParams } from './SettingsParams';
import filterIncludedAnswers = Exercise.filterIncludedAnswers;
import AnswerList = Exercise.AnswerList;

export type IncludedAnswersSettings<GAnswer extends string> = {
  readonly includedAnswers: GAnswer[];
};

export function includedAnswersSettings<GAnswer extends string>(config?: {
  defaultSelectedAnswers?: GAnswer[];
  name?: string;
}) {
  return function (
    params: Pick<
      CreateExerciseParams<GAnswer, Exercise.Settings>,
      'answerList'
    > &
      Partial<Pick<SettingsParams<Exercise.Settings>, 'defaultSettings'>>,
  ): SettingsParams<IncludedAnswersSettings<GAnswer>> &
    Pick<
      CreateExerciseParams<GAnswer, IncludedAnswersSettings<GAnswer>>,
      'answerList'
    > {
    return {
      defaultSettings: {
        includedAnswers:
          config?.defaultSelectedAnswers ??
          Exercise.flatAnswerList(
            toGetter(params.answerList)(params.defaultSettings ?? {}),
          ),
      },
      settingsDescriptors: (settings) => {
        const answerList = toGetter(params.answerList)(settings);

        return [
          {
            key: 'includedAnswers',
            descriptor: {
              controlType: 'included-answers',
              label: 'Included ' + (config?.name ?? 'Options'),
              answerList,
            },
            info: (() => {
              const hasNestedAnswers = (() => {
                if (Array.isArray(answerList)) {
                  return false;
                }

                for (const row of answerList.rows) {
                  if (Array.isArray(row)) {
                    for (const answerCell of row) {
                      if (isMultiAnswerCell(answerCell)) {
                        return true;
                      }
                    }
                  }
                }

                return false;
              })();

              return hasNestedAnswers
                ? 'Short click on an answer will toggle it. If an answer has a small rectangle at the bottom-right, you can long press it to select more options. When doing the exercise, a single click will select the answer displayed, and a long press and slide will enable you to select inner answers.'
                : 'Click an answer to include/exclude it from the exercise.';
            })(),
          },
        ];
      },
      answerList: (
        settings: IncludedAnswersSettings<GAnswer>,
      ): AnswerList<GAnswer> => {
        return filterIncludedAnswers(
          toGetter(params.answerList)(settings),
          settings.includedAnswers,
        );
      },
    };
  };
}
