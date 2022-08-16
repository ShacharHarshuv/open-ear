import { Exercise } from '../../../Exercise';
import {
  Constructor,
  toGetter,
} from '../../../../shared/ts-utility';
import {
  BaseExercise,
  CreateExerciseParams,
} from '../exerciseAttributes/createExercise';
import { SettingsParams } from './SettingsParams';
import filterIncludedAnswers = Exercise.filterIncludedAnswers;
import AnswerList = Exercise.AnswerList;

export type IncludedAnswersSettings<GAnswer extends string> = {
  readonly includedAnswers: GAnswer[];
}

// todo: remove
type IncludedAnswersBaseExercise<GAnswer extends string, GSettings extends IncludedAnswersSettings<GAnswer>> = BaseExercise<GAnswer, GSettings> & {
  getAnswerList(): Exercise.AnswerList<GAnswer>;
}

export function includedAnswersSettings<GAnswer extends string>(config?: {
  defaultSelectedAnswers?: GAnswer[],
  name?: string,
}) {
  return function (
    params: Pick<CreateExerciseParams<GAnswer, Exercise.Settings>, 'answerList'> &
      Partial<Pick<SettingsParams<Exercise.Settings>, 'defaultSettings'>>
  ): SettingsParams<IncludedAnswersSettings<GAnswer>> & Pick<CreateExerciseParams<GAnswer, IncludedAnswersSettings<GAnswer>>, 'answerList'> {
    return {
      defaultSettings: {
        includedAnswers: config?.defaultSelectedAnswers ?? Exercise.flatAnswerList(toGetter(params.answerList)(params.defaultSettings ?? {})),
      },
      settingsDescriptors: (settings) => [
        {
          key: 'includedAnswers',
          descriptor: {
            controlType: 'included-answers',
            label: 'Included ' + (config?.name ?? 'Options'),
            answerList: toGetter(params.answerList)(settings),
          },
        },
      ],
      answerList: (settings: IncludedAnswersSettings<GAnswer>): AnswerList<GAnswer> => {
        return filterIncludedAnswers(toGetter(params.answerList)(settings), settings.includedAnswers);
      },
    }
  }
}

// TODO: remove (decorator)
export function IncludedAnswersSetting<GAnswer extends string, GSettings extends IncludedAnswersSettings<GAnswer>>(params: {
  default: GAnswer[],
}) {
  if (params.default.length < 2) {
    throw new Error(`Must provide at least 2 answers selected by default`);
  }

  return function IncludedAnswersSettingDecorator<GConstructor extends Constructor<IncludedAnswersBaseExercise<GAnswer, GSettings>>>(BaseExercise: GConstructor) {
    // @ts-ignore
    return class HasIncludedAnswersSettings extends BaseExercise {
      constructor() {
        super();
      }

      protected override _getDefaultSettings(): GSettings {
        return {
          ...super._getDefaultSettings(),
          includedAnswers: params.default,
        };
      }

      // setting the setting's descriptor
      override getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
        const includedAnswersDescriptor: Exercise.IncludedAnswersControlDescriptor<GAnswer> = {
          controlType: 'included-answers',
          label: 'Included Options',
          answerList: super.getAnswerList(),
        }
        const settingsDescriptorList: Exercise.SettingsControlDescriptor<GSettings>[] = [
          {
            key: 'includedAnswers',
            descriptor: includedAnswersDescriptor,
          },
        ];

        return [
          ...settingsDescriptorList,
          ...super.getSettingsDescriptor(),
        ];
      }

      getAnswerList(): Exercise.AnswerList<GAnswer> {
        return Exercise.filterIncludedAnswers(super.getAnswerList(), this._settings.includedAnswers);
      }
    }
  }
}
