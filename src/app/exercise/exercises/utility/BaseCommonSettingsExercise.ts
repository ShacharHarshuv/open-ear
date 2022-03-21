import { Exercise } from '../../Exercise';
import { BaseExercise } from './BaseExercise';
import AnswerList = Exercise.AnswerList;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import IncludedAnswersControlDescriptor = Exercise.IncludedAnswersControlDescriptor;

export type BaseCommonSettingsExerciseSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

export abstract class BaseCommonSettingsExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings> {
  protected _allAnswersList: AnswerList<GAnswer> = this._getAllAnswersList();
  readonly settingsDescriptor = this._getSettingsDescriptor();
  protected _settings: GSettings = this._getDefaultSettings();

  getAnswerList(): AnswerList<GAnswer> {
    return Exercise.filterIncludedAnswers(this._allAnswersList, this._settings.includedAnswers);
  }

  protected abstract _getAllAnswersList(): AnswerList<GAnswer>;

  protected _getSettingsDescriptor(): SettingsControlDescriptor<GSettings>[] {
    const includedAnswersDescriptor: IncludedAnswersControlDescriptor<GAnswer> = {
      controlType: 'INCLUDED_ANSWERS',
      label: 'Included Options',
      answerList: this._allAnswersList,
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

  protected _getDefaultSettings(): GSettings {
    return {
      includedAnswers: this._getDefaultSelectedIncludedAnswers(),
    } as GSettings; // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property
  }

  protected _getDefaultSelectedIncludedAnswers(): GAnswer[] {
    return Exercise.flatAnswerList(this._allAnswersList);
  }

  protected _getIncludedAnswersOptions(): GAnswer[] {
    return Exercise.flatAnswerList(this._allAnswersList);
  }
}
