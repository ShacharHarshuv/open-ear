import { Exercise } from '../../../Exercise';
import { BaseExercise } from './createExercise';
import AnswerList = Exercise.AnswerList;
import SettingsControlDescriptor = Exercise.SettingsControlDescriptor;
import IncludedAnswersControlDescriptor = Exercise.IncludedAnswersControlDescriptor;

export type BaseCommonSettingsExerciseSettings<GAnswer extends string> = {
  includedAnswers: GAnswer[];
}

// TODO: remove usage of this
export abstract class BaseCommonSettingsExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings> {
  protected _allAnswersList: AnswerList<GAnswer> = this._getAllAnswersList();

  protected constructor() {
    super();
  }

  getAnswerList(): AnswerList<GAnswer> {
    return Exercise.filterIncludedAnswers(this._allAnswersList, this._settings.includedAnswers);
  }

  protected abstract _getAllAnswersList(): AnswerList<GAnswer>;

  override getSettingsDescriptor(): SettingsControlDescriptor<GSettings>[] {
    const includedAnswersDescriptor: IncludedAnswersControlDescriptor<GAnswer> = {
      controlType: 'included-answers',
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

  protected override _getDefaultSettings(): GSettings {
    return {
      includedAnswers: this._getDefaultSelectedIncludedAnswers(),
    } as GSettings; // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property
  }

  protected _getDefaultSelectedIncludedAnswers(): GAnswer[] {
    return /*Exercise.flatAnswerList(this._allAnswersList)*/ []; // todo: do not merge without eliminating this class as it's currently broken
  }

  protected _getIncludedAnswersOptions(): GAnswer[] {
    return Exercise.flatAnswerList(this._allAnswersList);
  }
}
