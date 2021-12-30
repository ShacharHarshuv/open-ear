import {
  Exercise,
} from '../../Exercise';
import AnswerList = Exercise.AnswerList;
import SettingValueType = Exercise.SettingValueType;
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;
import * as _ from 'lodash';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export abstract class BaseExercise<GAnswer extends string = string, GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }> implements Exercise.IExercise<GAnswer, GSettings> {
  private _settingsChangeSubject = new ReplaySubject<GSettings>(1);

  protected _destroy$ = new Subject();
  /**
   * Implementor should implement the desired default settings
   * */
  protected abstract _settings: GSettings;
  protected _settingsChange: Observable<GSettings> = this._settingsChangeSubject.asObservable();

  abstract readonly id: string;
  abstract readonly summary: string;
  abstract readonly name: string;
  abstract readonly explanation: ExerciseExplanationContent;

  abstract getAnswerList(): AnswerList<GAnswer>;

  abstract getQuestion(): Exercise.Question<GAnswer>;

  updateSettings(settings: GSettings): void {
    for (let key in this._settings) {
      this._settings[key] = _.isNil(settings[key]) ? this._settings[key] : settings[key];
    }

    this._settingsChangeSubject.next(settings);
  }

  getCurrentSettings(): GSettings {
    return this._settings;
  }

  onDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
