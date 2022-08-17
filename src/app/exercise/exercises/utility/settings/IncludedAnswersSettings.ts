import { Exercise } from '../../../Exercise';
import { toGetter } from '../../../../shared/ts-utility';
import { CreateExerciseParams } from '../exerciseAttributes/createExercise';
import { SettingsParams } from './SettingsParams';
import filterIncludedAnswers = Exercise.filterIncludedAnswers;
import AnswerList = Exercise.AnswerList;

export type IncludedAnswersSettings<GAnswer extends string> = {
  readonly includedAnswers: GAnswer[];
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
