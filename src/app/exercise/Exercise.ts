import { NoteEvent } from '../services/player.service';
import {
  OneOrMany,
  isValueTruthy,
  StaticOrGetter,
} from '../shared/ts-utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import * as _ from 'lodash';
import { Type } from '@angular/core';
import { Platforms } from '@ionic/core/dist/types/utils/platform';

type PartToPlay = NoteEvent[] | OneOrMany<Note>;

export namespace Exercise {

  interface BaseQuestion<GAnswer extends string, GSegment extends {rightAnswer: GAnswer}> {
    type?: string, // default: 'notes'
    /**
     * Use more than one segment for serial exercises
     * Example: in a melodic dictation each note is a segment, it has its own answer
     * */
    segments: GSegment[],
    /**
     * To be played to give the listener a context of the part,
     * Then the part can be played separately or with the cadence
     * */
    cadence?: PartToPlay;
    afterCorrectAnswer?: {
      partToPlay: NoteEvent[],
      answerToHighlight?: GAnswer,
    }[];
  }

  export interface NotesQuestion<GAnswer extends string = string> extends BaseQuestion<GAnswer, {
    rightAnswer: GAnswer;
    partToPlay: PartToPlay;
  }> {
    type?: 'notes',
  }

  export interface YouTubeQuestion<GAnswer extends string = string> extends BaseQuestion<GAnswer, {
    rightAnswer: GAnswer,
    seconds: number,
  }> {
    type: 'youtube',
    videoId: string,
    endSeconds: number,
  }

  export type Question<GAnswer extends string = string> = NotesQuestion<GAnswer> | YouTubeQuestion<GAnswer>;

  export type Answer<GAnswer extends string = string> = GAnswer;

  export interface AnswerConfig<GAnswer extends string> {
    answer: Answer<GAnswer> | null;
    playOnClick?: StaticOrGetter<PartToPlay | null, [Question<GAnswer>]>,
    space?: number; // 1 (Default) means all cells takes the same space
  }

  export interface AnswersLayout<GAnswer extends string = string> {
    /**
     * Null means an empty space
     * */
    rows: (Answer<GAnswer> | null | AnswerConfig<GAnswer>)[][];
  }

  export interface NormalizedAnswerLayout<GAnswer extends string = string> extends Required<AnswersLayout<GAnswer>> {
    rows: Required<AnswerConfig<GAnswer>>[][];
  }

  export function normalizedAnswerList<GAnswer extends string = string>(answerList: AnswerList<GAnswer>): NormalizedAnswerLayout<GAnswer> {
    const answerLayout: AnswersLayout<GAnswer> = Array.isArray(answerList) ? {
      rows: [answerList],
    } : answerList;

    return {
      rows: answerLayout.rows.map(row => row.map(answerConfig => normalizeAnswerConfig(answerConfig))),
    }
  }

  export function normalizeAnswerConfig<GAnswer extends string = string>(cell: Answer<GAnswer> | null | AnswerConfig<GAnswer>): Required<AnswerConfig<GAnswer>> {
    if (!cell || typeof cell !== 'object') {
      return {
        answer: cell,
        space: 1,
        playOnClick: null,
      };
    }

    return {
      space: cell.space ?? 1,
      answer: cell.answer,
      playOnClick: cell.playOnClick ?? null,
    };
  }

  export type AnswerList<GAnswer extends string = string> =
    (Answer<GAnswer> | AnswerConfig<GAnswer>)[]
    | AnswersLayout<GAnswer>;

  export function flatAnswerList<GAnswer extends string>(answerList: AnswerList<GAnswer>): GAnswer[] {
    if (Array.isArray(answerList)) {
      return answerList.map((answerOrAnswerConfig): GAnswer | null => {
        if (typeof answerOrAnswerConfig === 'object') {
          return answerOrAnswerConfig.answer;
        } else {
          return answerOrAnswerConfig;
        }
      }).filter(isValueTruthy);
    } else {
      return _.flatMap<GAnswer | null | undefined>(answerList.rows.map(row => row.map(cellConfig => {
        if (typeof cellConfig === 'object') {
          return cellConfig?.answer;
        } else {
          return cellConfig
        }
      }))).filter(isValueTruthy);
    }
  }

  export function filterIncludedAnswers<GAnswer extends string>(allAnswerList: Exercise.AnswerList<GAnswer>, includedAnswersList: GAnswer[]) {
    const answerLayout: AnswersLayout<GAnswer> = Array.isArray(allAnswerList) ? {
      rows: [ allAnswerList ],
    } : allAnswerList;

    const normalizedAnswerLayout: {
      rows: Required<AnswerConfig<GAnswer>>[][],
    } = {
      rows: answerLayout.rows.map((row): Required<AnswerConfig<GAnswer>>[] => row.map(normalizeAnswerConfig)),
    }

    return {
      rows: normalizedAnswerLayout.rows.map((row: Required<AnswerConfig<GAnswer>>[]): Required<AnswerConfig<GAnswer>>[] => _.map(row, answerLayoutCellConfig => answerLayoutCellConfig.answer && includedAnswersList.includes(answerLayoutCellConfig.answer) ? answerLayoutCellConfig : {
        ...answerLayoutCellConfig,
        answer: null, // In the future it's possible we'll want to configure a button to be disabled instead of hidden in this case
      }))
    }
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

  export interface SelectControlDescriptor<GValue extends string | number = string | number> extends BaseSettingsControlDescriptor {
    controlType: 'SELECT',
    options: {
      label: string;
      value: GValue,
    }[],
  }

  export interface ListSelectControlDescriptor<GValue = string | number> extends BaseSettingsControlDescriptor {
    controlType: 'LIST_SELECT';
    allOptions: {
      label: string,
      value: GValue,
    }[];
  }

  export interface CheckboxControlDescriptor extends BaseSettingsControlDescriptor {
    controlType: 'CHECKBOX',
  }

  export interface IncludedAnswersControlDescriptor<GAnswer extends string = string> extends BaseSettingsControlDescriptor {
    controlType: 'INCLUDED_ANSWERS',
    answerList: AnswerList<GAnswer>;
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
          : SelectControlDescriptor<GSettings[GKey]>*/ SliderControlDescriptor | SelectControlDescriptor | ListSelectControlDescriptor | IncludedAnswersControlDescriptor | CheckboxControlDescriptor,
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
    readonly blackListPlatform?: Platforms;

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question<GAnswer>;

    updateSettings?(settings: GSettings): void;

    getCurrentSettings?(): GSettings;

    getAnswerDisplay?(answer: GAnswer): string;

    onDestroy?(): void;
  }

  export class ExerciseError extends Error {
  }
}
