import { Platforms } from '@ionic/core/dist/types/utils/platform';
import * as _ from 'lodash';
import { StaticOrGetter, toGetter } from '../../../../shared/ts-utility';
import Exercise, { Question } from '../../../exercise-logic';
import { SettingsParams } from '../settings/SettingsParams';
import AnswerList = Exercise.AnswerList;
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

export type CreateExerciseParams<
  GAnswer extends string,
  GSettings extends Exercise.Settings,
> = {
  readonly id: string;
  readonly summary: string;
  readonly name: string;
  readonly explanation?: ExerciseExplanationContent;
  readonly answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>;
  readonly getQuestion: (
    settings: GSettings,
    questionsToExclude?: string[],
  ) => Exercise.Question<GAnswer>;
  readonly getIsQuestionValid?: (
    settings: GSettings,
    question: Exercise.Question<GAnswer>,
  ) => boolean;
  readonly getQuestionById?: (
    settings: GSettings,
    id: string,
  ) => Exercise.Question<GAnswer> | undefined;
  readonly blackListPlatform?: Platforms;
} & SettingsParams<GSettings>;

export function createExercise<
  GAnswer extends string,
  GSettings extends Exercise.Settings,
>(
  params: CreateExerciseParams<GAnswer, GSettings>,
): Exercise.Exercise<GAnswer, GSettings> {
  const settings: GSettings = params.defaultSettings;
  return {
    id: params.id,
    summary: params.summary,
    name: params.name,
    explanation: params.explanation,
    blackListPlatform: params.blackListPlatform,
    getSettingsDescriptor: () =>
      params.settingsDescriptors
        ? toGetter(params.settingsDescriptors)(settings)
        : [],
    updateSettings: (_settings: GSettings): void => {
      for (let key in _settings) {
        settings[key] = _.isNil(_settings[key])
          ? _settings[key]
          : _settings[key];
      }
    },
    getCurrentSettings: (): GSettings => {
      return settings;
    },
    getAnswerList: (): AnswerList<GAnswer> => {
      return toGetter(params.answerList)(settings);
    },
    getQuestion: (questionsToExclude?: string[]) =>
      params.getQuestion(settings, questionsToExclude),
    getIsQuestionValid: params.getIsQuestionValid
      ? (question: Question<GAnswer>) =>
          params.getIsQuestionValid!(settings, question)
      : undefined,
    getQuestionById: params.getQuestionById
      ? (id: string) => params.getQuestionById!(settings, id)
      : undefined,
  };
}
