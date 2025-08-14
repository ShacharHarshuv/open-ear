import { toGetter } from 'src/app/shared/ts-utility';
import {
  AnswerList,
  SettingsControlDescriptor,
  filterIncludedAnswers,
  flatAnswerList,
  isMultiAnswerCell,
} from '../../../exercise-logic';

export type IncludedAnswersSettings<GAnswer extends string> = {
  readonly includedAnswers: GAnswer[];
};

type ExternalOf<F> = F extends (e: infer E) => any ? E : {};

export function useIncludedAnswers<
  F extends AnswerList<string> | ((e: any) => AnswerList<string>),
>(
  config: { fullAnswerList: F; name?: string } & (F extends (e: any) => any
    ? { defaultExternalSettings: ExternalOf<F> }
    : {}),
) {
  type ExternalSettings = ExternalOf<F>;
  type Answer = F extends (e: any) => AnswerList<infer A>
    ? A
    : F extends AnswerList<infer A>
      ? A
      : never;

  const getFullAnswerList = toGetter(config.fullAnswerList) as (
    settings: ExternalSettings,
  ) => AnswerList<Answer>;

  const defaultExternalSettings =
    'defaultExternalSettings' in config
      ? config.defaultExternalSettings
      : ({} as ExternalSettings);

  const settingDescriptor: SettingsControlDescriptor<
    IncludedAnswersSettings<Answer> & ExternalSettings
  > = {
    key: 'includedAnswers',
    descriptor: (settings: ExternalSettings) => ({
      controlType: 'included-answers',
      label: 'Included ' + (config?.name ?? 'Options'),
      answerList: getFullAnswerList(settings),
    }),
    info: (() => {
      const hasNestedAnswers = (() => {
        const fullAnswerList = getFullAnswerList(defaultExternalSettings);
        if (Array.isArray(fullAnswerList)) {
          return false;
        }

        for (const row of fullAnswerList.rows) {
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

  const defaults: IncludedAnswersSettings<Answer> = {
    includedAnswers: flatAnswerList<Answer>(
      getFullAnswerList(defaultExternalSettings),
    ),
  };

  return {
    defaults,
    settingDescriptor,
    answerList: (
      settings: IncludedAnswersSettings<Answer> & ExternalSettings,
    ) =>
      filterIncludedAnswers(
        getFullAnswerList(settings),
        settings.includedAnswers,
      ),
  };
}
