import { Exercise } from '../../../Exercise';
import * as _ from 'lodash';
import {
  StaticOrGetter,
  toGetter,
} from '../../../../shared/ts-utility';
import { SettingsParams } from '../settings/SettingsParams';
import { Platforms } from '@ionic/core/dist/types/utils/platform';
import AnswerList = Exercise.AnswerList;
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

export type CreateExerciseParams<GAnswer extends string, GSettings extends Exercise.Settings> = {
  readonly id: string,
  readonly summary: string,
  readonly name: string,
  readonly explanation?: ExerciseExplanationContent,
  readonly answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>,
  readonly getQuestion: (settings: GSettings) => Exercise.Question<GAnswer>,
  readonly blackListPlatform?: Platforms,
} & SettingsParams<GSettings>;

export function createExercise<GAnswer extends string, GSettings extends Exercise.Settings>(params: CreateExerciseParams<GAnswer, GSettings>): Exercise.Exercise<GAnswer, GSettings> {
  const settings: GSettings = params.defaultSettings;
  return {
    id: params.id,
    summary: params.summary,
    name: params.name,
    explanation: params.explanation,
    blackListPlatform: params.blackListPlatform,
    getSettingsDescriptor: () => params.settingsDescriptors ? toGetter(params.settingsDescriptors)(settings) : [],
    updateSettings: (_settings: GSettings): void => {
      for (let key in _settings) {
        settings[key] = _.isNil(_settings[key]) ? _settings[key] : _settings[key];
      }
    },
    getCurrentSettings: (): GSettings => {
      return settings;
    },
    getAnswerList: (): AnswerList<GAnswer> => {
      return toGetter(params.answerList)(settings);
    },
    getQuestion: () => params.getQuestion(settings),
  }
}
