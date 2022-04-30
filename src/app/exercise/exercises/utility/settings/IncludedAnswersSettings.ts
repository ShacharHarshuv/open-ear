import { Exercise } from '../../../Exercise';
import { BaseCommonSettingsExerciseSettings } from '../base-exercises/BaseCommonSettingsExercise';
import { Constructor } from '../../../../shared/ts-utility';
import { BaseExercise } from '../base-exercises/BaseExercise';

export type IncludedAnswersSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

type IncludedAnswersBaseExercise<GAnswer extends string> = BaseExercise<GAnswer, IncludedAnswersSettings<GAnswer>> & {
  getAnswerList(): Exercise.AnswerList<GAnswer>;
}

export function IncludedAnswersSetting<GAnswer extends string>(params: {
  default: GAnswer[],
}) {
  if (params.default.length < 2) {
    throw new Error(`Must provide at least 2 answers selected by default`);
  }

  return function <GConstructor extends Constructor<IncludedAnswersBaseExercise<GAnswer>>>(BaseExercise: GConstructor) {
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
          answerList: super.getAnswerList(),
        }
        const settingsDescriptorList: Exercise.SettingsControlDescriptor<BaseCommonSettingsExerciseSettings<GAnswer>>[] = [
          {
            key: 'includedAnswers',
            descriptor: includedAnswersDescriptor,
          },
        ];

        return [
          ...super._getSettingsDescriptor(),
          ...settingsDescriptorList,
        ];
      }

      override getAnswerList(): Exercise.AnswerList<GAnswer> {
        return Exercise.filterIncludedAnswers(super.getAnswerList(), this._settings.includedAnswers);
      }
    }
  }
}
