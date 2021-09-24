import { Exercise } from '../../Exercise';
import { BaseExercise } from './BaseExercise';
import AnswerList = Exercise.AnswerList;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import ListSelectControlDescriptor = Exercise.ListSelectControlDescriptor;
import * as _ from 'lodash';

export type BaseCommonSettingsExerciseSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

export abstract class BaseCommonSettingsExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings> {
  private _allAnswersList: AnswerList<GAnswer> = this._getAllAnswersList();
  readonly settingsDescriptor = this._getSettingsDescriptor();
  protected _settings: GSettings = {
    includedAnswers: Exercise.flatAnswerList(this._allAnswersList),
  } as GSettings; // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property

  getAnswerList(): AnswerList<GAnswer> {
    const includedAnswersList: GAnswer[] = this._settings.includedAnswers;
    if (Array.isArray(this._allAnswersList)) {
      return _.filter(this._allAnswersList, (answer => includedAnswersList.includes(answer)));
    }

    return {
      rows: this._allAnswersList.rows.map((row: GAnswer[]) => _.filter(row, answer => includedAnswersList.includes(answer)))
    }
  }

  protected abstract _getAllAnswersList(): AnswerList<GAnswer>;

  protected _getSettingsDescriptor(): SettingsControlDescriptor<GSettings>[] {
    const includedAnswersDescriptor: ListSelectControlDescriptor<GAnswer> = {
      controlType: 'LIST_SELECT',
      label: 'Included Options',
      allOptions: Exercise.flatAnswerList(this._allAnswersList).map(answer => ({
        value: answer,
        label: answer,
      })),
    }
    const settingsDescriptorList: SettingsControlDescriptor<BaseCommonSettingsExerciseSettings<GAnswer>>[] = [
      {
        key: 'includedAnswers',
        descriptor: includedAnswersDescriptor,
      }
    ];
    // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property
    return settingsDescriptorList as SettingsControlDescriptor<GSettings>[];
  }
}
