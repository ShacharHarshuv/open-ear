import { Signal, computed } from '@angular/core';
import {
  AnswerList,
  SettingsControlDescriptor,
  filterIncludedAnswers,
  flatAnswerList,
  isMultiAnswerCell,
} from '../../../exercise-logic';

// todo: do we even need this type?
export type IncludedAnswersSettings<GAnswer extends string> = {
  readonly includedAnswers: GAnswer[];
};

export function useIncludedAnswers<GAnswer extends string>(config: {
  fullAnswerList: AnswerList<GAnswer>;
  name?: string; // default: 'Options'
}) {
  const settingDescriptor: SettingsControlDescriptor<
    IncludedAnswersSettings<GAnswer>
  > = {
    key: 'includedAnswers',
    descriptor: {
      controlType: 'included-answers',
      label: 'Included ' + (config?.name ?? 'Options'),
      answerList: config.fullAnswerList,
    },
    info: (() => {
      const hasNestedAnswers = (() => {
        if (Array.isArray(config.fullAnswerList)) {
          return false;
        }

        for (const row of config.fullAnswerList.rows) {
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
  };

  const defaults: IncludedAnswersSettings<GAnswer> = {
    includedAnswers: flatAnswerList(config.fullAnswerList),
  };

  return {
    defaults,
    settingDescriptor,
    answerList: (settings: Signal<IncludedAnswersSettings<GAnswer>>) =>
      computed(() =>
        filterIncludedAnswers(
          config.fullAnswerList,
          settings().includedAnswers,
        ),
      ),
  };
}
