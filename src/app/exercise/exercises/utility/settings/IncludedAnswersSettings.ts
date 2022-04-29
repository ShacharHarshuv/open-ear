import { Exercise } from '../../../Exercise';
import { BaseCommonSettingsExerciseSettings } from '../base exercises/BaseCommonSettingsExercise';
import { BaseExercise } from '../base exercises/BaseExercise';
import { Constructor } from '../../../../shared/ts-utility';

export type IncludedAnswersSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

export function IncludedAnswersSetting<GAnswer extends string>(params: {
  default: GAnswer[],
  allAnswersList: Exercise.AnswerList<GAnswer>,
}) {
  if (params.default.length < 2) {
    throw new Error(`Must provide at least 2 answers selected by default`);
  }

  return function <GConstructor extends Constructor<BaseExercise<GAnswer, IncludedAnswersSettings<GAnswer>>>>(BaseExercise: GConstructor) {
    // @ts-ignore
    return class HasIncludedAnswersSettings extends BaseExercise {
      constructor() {
        super();
      }

      protected override _getDefaultSettings(): IncludedAnswersSettings<GAnswer> {
        return {
          ...super._getDefaultSettings(),
          includedAnswers: params.default,
        };
      }

      // setting the setting's descriptor
      protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<IncludedAnswersSettings<GAnswer>>[] {
        const includedAnswersDescriptor: Exercise.IncludedAnswersControlDescriptor<GAnswer> = {
          controlType: 'INCLUDED_ANSWERS',
          label: 'Included Options',
          answerList: params.allAnswersList,
        }
        const settingsDescriptorList: Exercise.SettingsControlDescriptor<BaseCommonSettingsExerciseSettings<GAnswer>>[] = [
          {
            key: 'includedAnswers',
            descriptor: includedAnswersDescriptor,
          }
        ];

        return [
          ...super._getSettingsDescriptor(),
          ...settingsDescriptorList
        ]
      }

      getAnswerList(): Exercise.AnswerList<GAnswer> {
        return Exercise.filterIncludedAnswers(params.allAnswersList, this._settings.includedAnswers);
      }
    }
  }
}
