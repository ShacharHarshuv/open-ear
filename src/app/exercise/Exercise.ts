import { NoteEvent } from '../services/player.service';
import { OneOrMany } from '../shared/ts-utility/toArray';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import * as _ from 'lodash';
import {Type} from "@angular/core";

export namespace Exercise {
  export interface Question<GAnswer extends string = string> {
    /**
     * Use more then one segment for serial exercises
     * Example: in a melodic dictation each note is a segment, it has its own answer
     * */
    segments: {
      rightAnswer: GAnswer;
      partToPlay: NoteEvent[] | OneOrMany<Note>;
    }[],
    /**
     * To be played to give the listener a context of the part,
     * Then the part can be played separately or with the cadence
     * */
    cadence?: NoteEvent[] | OneOrMany<Note>;
    afterCorrectAnswer?: {
      partToPlay: NoteEvent[],
      answerToHighlight?: GAnswer,
    }[];
  }

  export type Answer<GAnswer extends string = string> = GAnswer;

  export interface AnswersLayout<GAnswer extends string = string> {
    rows: Answer<GAnswer>[][];
  }

  export type AnswerList<GAnswer extends string = string> = Answer<GAnswer>[] | AnswersLayout<GAnswer>;

  export function flatAnswerList<GAnswer extends string>(answerList: AnswerList<GAnswer>): GAnswer[] {
    return Array.isArray(answerList) ? answerList : _.flatMap(answerList.rows);
  }

  export interface BaseSettingsControlDescriptor {
    controlType: string;
    label: string;
  }

  export interface SliderControlDescriptor extends BaseSettingsControlDescriptor {
    controlType: 'SLIDER';
    min: number;
    max: number;
    step: number;
  }

  export interface SelectControlDescriptor extends BaseSettingsControlDescriptor {
    controlType: 'SELECT',
    options: {
      label: string;
      value: string | number,
    }[],
  }

  export interface ListSelectControlDescriptor<GValue = string | number> extends BaseSettingsControlDescriptor {
    controlType: 'LIST_SELECT';
    allOptions: {
      label: string,
      value: GValue,
    }[];
  }

  export interface CheckboxControlDescriptor extends BaseSettingsControlDescriptor{
    controlType: 'CHECKBOX',
  }

  export type SettingValueType = number | string | boolean | (string | number)[];

  /*
   * adding a dummy redundant condition on GKey to force description of (potentially) union type GKey.
   * Without such description the end result will be never.
   * */
  export type SettingsControlDescriptor<GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }/*, GKey extends keyof GSettings = keyof GSettings*/> = /*GKey extends string ?*/
    {
      key: /*GKey*/ keyof GSettings,
      descriptor: /*GSettings[GKey] extends number ? SliderControlDescriptor | SelectControlDescriptor<GSettings[GKey]>
        : GSettings[GKey] extends Array<any> ? ListSelectControlDescriptor
          : SelectControlDescriptor<GSettings[GKey]>*/ SliderControlDescriptor | SelectControlDescriptor | ListSelectControlDescriptor | CheckboxControlDescriptor,
      show?: (settings: GSettings) => boolean;
    }/* : never*/;

  export type ExerciseExplanationContent = string | Type<any>;

  export interface IExercise<GAnswer extends string = string, GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }> {
    /**
     * Do not change the keys for the same exercise between versions, as it will break the persistent storage
     * */
    readonly id: string;
    readonly name: string;
    readonly summary: string;
    readonly explanation: ExerciseExplanationContent;
    readonly settingsDescriptor?: SettingsControlDescriptor<GSettings>[];

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question<GAnswer>;

    updateSettings?(settings: GSettings): void;

    getCurrentSettings?(): GSettings;
  }
}
