import { Exercise } from '../../Exercise';
import { BaseExercise } from './BaseExercise';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import ListSelectControlDescriptor = Exercise.ListSelectControlDescriptor;
import normalizeAnswerLayoutCellConfig = Exercise.normalizeAnswerConfig;
import AnswerLayoutCellConfig = Exercise.AnswerConfig;
import AnswersLayout = Exercise.AnswersLayout;

export type BaseCommonSettingsExerciseSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

export abstract class BaseCommonSettingsExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings> {
  protected _allAnswersList: AnswerList<GAnswer> = this._getAllAnswersList();
  readonly settingsDescriptor = this._getSettingsDescriptor();
  protected _settings: GSettings = this._getDefaultSettings();

  getAnswerList(): AnswerList<GAnswer> {
    const includedAnswersList: GAnswer[] = this._settings.includedAnswers;

    const answerLayout: AnswersLayout<GAnswer> = Array.isArray(this._allAnswersList) ? {
      rows: [ this._allAnswersList ],
    } : this._allAnswersList;

    const normalizedAnswerLayout: {
      rows: Required<AnswerLayoutCellConfig<GAnswer>>[][],
    } = {
      rows: answerLayout.rows.map((row): Required<AnswerLayoutCellConfig<GAnswer>>[] => row.map(normalizeAnswerLayoutCellConfig)),
    }

    return {
      rows: normalizedAnswerLayout.rows.map((row: Required<AnswerLayoutCellConfig<GAnswer>>[]): Required<AnswerLayoutCellConfig<GAnswer>>[] => _.map(row, answerLayoutCellConfig => answerLayoutCellConfig.answer && includedAnswersList.includes(answerLayoutCellConfig.answer) ? answerLayoutCellConfig : {
        ...answerLayoutCellConfig,
        answer: null, // In the future it's possible we'll want to configure a button to be disabled instead of hidden in this case
      }))
    }
  }

  protected abstract _getAllAnswersList(): AnswerList<GAnswer>;

  protected _getSettingsDescriptor(): SettingsControlDescriptor<GSettings>[] {
    const includedAnswersDescriptor: ListSelectControlDescriptor<GAnswer> = {
      controlType: 'LIST_SELECT',
      label: 'Included Options',
      allOptions: this._getIncludedAnswersOptions().map(answer => ({
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
