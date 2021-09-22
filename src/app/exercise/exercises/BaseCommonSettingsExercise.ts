import { Exercise } from '../Exercise';
import { BaseExercise } from './BaseExercise';
import AnswerList = Exercise.AnswerList;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import ListSelectControlDescriptor = Exercise.ListSelectControlDescriptor;

export type BaseCommonSettingsExerciseSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}


export abstract class BaseCommonSettingsExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings>{
  readonly settingsDescriptor = this._getSettingsDescriptor();
  private _allAnswersList: AnswerList<GAnswer> = this._getAllAnswersList();
  protected _settings: GSettings = {
    includedAnswers: Exercise.flatAnswerList(this._allAnswersList),
  } as GSettings; // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property

  getAnswerList(): AnswerList<GAnswer> {
    return this._settings.includedAnswers;
  }

  protected abstract _getAllAnswersList(): AnswerList<GAnswer>;

  private _getSettingsDescriptor(): SettingsControlDescriptor<BaseCommonSettingsExerciseSettings<GAnswer>>[] {
    const includedAnswersDescriptor: ListSelectControlDescriptor<GAnswer> = {
      controlType: 'LIST_SELECT',
      label: 'Included Options',
      allOptions: Exercise.flatAnswerList(this._allAnswersList),
    }
    return [
      {
        key: 'includedAnswers',
        descriptor: includedAnswersDescriptor,
      }
    ]
  }
}
