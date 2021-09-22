import { NoteEvent } from '../services/player.service';
import { NoteNumberOrName } from './utility/music/notes/NoteNumberOrName';
import { OneOrMany } from '../shared/ts-utility/toArray';
import { Note } from 'tone/Tone/core/type/NoteUnits';

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

  export interface ListSelectControlDescriptor<GOption = string> extends BaseSettingsControlDescriptor {
    controlType: 'LIST_SELECT';
    allOptions: GOption[];
  }

  export type SettingValueType = number | string | boolean | string[];

  export type SettingsControlDescriptor<GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }, GKey extends keyof GSettings = keyof GSettings> = {
    key: keyof GSettings,
    descriptor: GSettings[GKey] extends number ? SliderControlDescriptor :
      GSettings[GKey] extends Array<string> ? ListSelectControlDescriptor : never;
  }

  export interface IExercise<GAnswer extends string = string, GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }> {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly settingsDescriptor?: SettingsControlDescriptor<GSettings>[];

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question<GAnswer>;

    updateSettings?(settings: GSettings): void;

    getCurrentSettings?(): GSettings;
  }
}
