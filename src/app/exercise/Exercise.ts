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

  interface BaseQuestion<GAnswer extends string, GSegment extends { rightAnswer: GAnswer }> {
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
    // use to display some info about the question to the user (for example, a key)
    info?: string | {
      beforeCorrectAnswer: string;
      afterCorrectAnswer: string;
    },
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
    displayLabel?: string;
    playOnClick?: StaticOrGetter<PartToPlay | null, [Question<GAnswer>]>,
    space?: number; // 1 (Default) means all cells takes the same space
  }

  export interface AnswersLayout<GAnswer extends string = string> {
    /**
     * Null means an empty space
     * */
    rows: ((Answer<GAnswer> | null | AnswerConfig<GAnswer>)[] | string)[];
  }

  export interface NormalizedAnswerLayout<GAnswer extends string = string> extends Required<AnswersLayout<GAnswer>> {
    rows: (Required<AnswerConfig<GAnswer>>[] | string)[];
  }

  export function normalizedAnswerList<GAnswer extends string = string>(answerList: AnswerList<GAnswer>): NormalizedAnswerLayout<GAnswer> {
    const answerLayout: AnswersLayout<GAnswer> = Array.isArray(answerList) ? {
      rows: [answerList],
    } : answerList;

    return {
      rows: answerLayout.rows.map(row => {
        if (typeof row === 'string') {
          return row;
        } else {
          return row.map(answerConfig => normalizeAnswerConfig(answerConfig));
        }
      }),
    }
  }

  export function normalizeAnswerConfig<GAnswer extends string = string>(cell: Answer<GAnswer> | null | AnswerConfig<GAnswer>): Required<AnswerConfig<GAnswer>> {
    if (!cell || typeof cell !== 'object') {
      return {
        answer: cell,
        displayLabel: cell ?? '',
        space: 1,
        playOnClick: null,
      };
    }

    return {
      space: cell.space ?? 1,
      answer: cell.answer,
      displayLabel: cell.displayLabel ?? cell.answer ?? '',
      playOnClick: cell.playOnClick ?? null,
    };
  }

  // consider making this an input for a class, as it seems like it has many "methods"
  export type AnswerList<GAnswer extends string = string> =
    (Answer<GAnswer> | AnswerConfig<GAnswer>)[]
    | AnswersLayout<GAnswer>;

  export function flatAnswerList<GAnswer extends string>(answerList: AnswerList<GAnswer>): GAnswer[] {
    return Array.from(getAnswerListIterator(answerList))
      .map((answerConfig): GAnswer | null => answerConfig.answer)
      .filter(isValueTruthy);
  }

  export function filterIncludedAnswers<GAnswer extends string>(allAnswerList: Exercise.AnswerList<GAnswer>, includedAnswersList: GAnswer[]) {
    const normalizedAnswerLayout: NormalizedAnswerLayout<GAnswer> = normalizedAnswerList(allAnswerList);

    return {
      rows: normalizedAnswerLayout.rows.map((row: Required<AnswerConfig<GAnswer>>[]): Required<AnswerConfig<GAnswer>>[] => _.map(row, answerLayoutCellConfig => answerLayoutCellConfig.answer && includedAnswersList.includes(answerLayoutCellConfig.answer) ? answerLayoutCellConfig : {
        ...answerLayoutCellConfig,
        answer: null, // In the future it's possible we'll want to configure a button to be disabled instead of hidden in this case
      })),
    }
  }

  export function* getAnswerListIterator<GAnswer extends string>(answerList: AnswerList<GAnswer>): Generator<Required<AnswerConfig<GAnswer>>> {
    if (Array.isArray(answerList)) {
      for (let cell of answerList) {
        const normalizedAnswerConfig = normalizeAnswerConfig(cell);
        if (normalizedAnswerConfig.answer) {
          yield normalizedAnswerConfig;
        }
      }
    } else {
      for (let row of answerList.rows) {
        if (typeof row === 'string') {
          continue;
        }
        for (let cell of row) {
          const normalizedAnswerConfig = normalizeAnswerConfig(cell);
          if (normalizedAnswerConfig.answer) {
            yield normalizedAnswerConfig;
          }
        }
      }
    }
  }

  export function mapAnswerList<GInputAnswer extends string = string, GOutputAnswer extends string = GInputAnswer>(answerList: Exercise.AnswerList<GInputAnswer>, callback: (answerConfig: AnswerConfig<GInputAnswer>) => AnswerConfig<GOutputAnswer>): Exercise.AnswerList<GOutputAnswer> {
    function mapAnswerCellList(answerCellList: (Answer<GInputAnswer> | AnswerConfig<GInputAnswer>)[]): (Answer<GOutputAnswer> | AnswerConfig<GOutputAnswer>)[];
    function mapAnswerCellList(answerCellList: (Answer<GInputAnswer> | AnswerConfig<GInputAnswer> | null)[]): (Answer<GOutputAnswer> | AnswerConfig<GOutputAnswer> | null)[];
    function mapAnswerCellList(answerCellList: (Answer<GInputAnswer> | AnswerConfig<GInputAnswer> | null)[]): (Answer<GOutputAnswer> | AnswerConfig<GOutputAnswer> | null)[] {
      return _.map(answerCellList, answerCell => {
        if (!answerCell) {
          return null;
        } else if (typeof answerCell === 'string') {
          return callback({
            answer: answerCell,
          })
        } else {
          return callback(answerCell);
        }
      });
    }

    if (typeof answerList === 'object') {
      return {
        rows: (answerList as AnswersLayout<GInputAnswer>).rows.map(row => typeof row === 'string' ? row : mapAnswerCellList(row)),
      }
    } else {
      return mapAnswerCellList(answerList);
    }
  }

  export function addViewLabelToAnswerList<GAnswer extends string>(answerList: Exercise.AnswerList<GAnswer>, getAnswerViewLabel: (answer: GAnswer) => string): AnswerList<GAnswer> {
    return mapAnswerList(answerList, answerConfig => answerConfig.answer ? {
      ...answerConfig,
      displayLabel: getAnswerViewLabel(answerConfig.answer),
    } : answerConfig);
  }

  export interface BaseSettingsControlDescriptor {
    controlType: string;
    label: string;
  }

  export interface SliderControlDescriptor extends BaseSettingsControlDescriptor {
    controlType: 'slider';
    min: number;
    max: number;
    step: number;
  }

  export interface SelectControlDescriptor<GValue extends string | number = string | number> extends BaseSettingsControlDescriptor {
    controlType: 'select',
    options: {
      label: string;
      value: GValue,
    }[],
  }

  export interface ListSelectControlDescriptor<GValue = string | number> extends BaseSettingsControlDescriptor {
    controlType: 'list-select';
    allOptions: {
      label: string,
      value: GValue,
    }[];
  }

  export interface CheckboxControlDescriptor extends BaseSettingsControlDescriptor {
    controlType: 'checkbox',
  }

  export interface IncludedAnswersControlDescriptor<GAnswer extends string = string> extends BaseSettingsControlDescriptor {
    controlType: 'included-answers',
    answerList: AnswerList<GAnswer>;
  }

  export type SettingValueType = number | string | boolean | (string | number)[];

  export type Settings = { [key: string]: SettingValueType };

  export type ControlDescriptor = SliderControlDescriptor | SelectControlDescriptor | ListSelectControlDescriptor | IncludedAnswersControlDescriptor | CheckboxControlDescriptor;

  /***
   * Usage of GKey is necessary here to avoid this issue: https://github.com/microsoft/TypeScript/issues/41595
   * */
  export type SettingsControlDescriptor<GSettings extends Settings = Settings, GKey extends keyof GSettings = keyof GSettings> = /*GKey extends string ?*/
    ({
      key: GKey
      getter?: undefined,
      onChange?: undefined,
    } | {
      key?: undefined,
      getter: (currentSettings: GSettings) => any,
      onChange: (newValue: any, prevValue: any, currentSetting: GSettings) => Partial<GSettings>,
    }) & {
    descriptor: /*GSettings[GKey] extends number ? SliderControlDescriptor | SelectControlDescriptor<GSettings[GKey]>
     : GSettings[GKey] extends Array<any> ? ListSelectControlDescriptor
     : SelectControlDescriptor<GSettings[GKey]>*/ StaticOrGetter<ControlDescriptor, [GSettings]>,
    show?: (settings: GSettings) => boolean;
    info?: string; // can contain html
    isDisabled?: (settings: GSettings, currentValue: any) => boolean;
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
    readonly blackListPlatform?: Platforms;

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question<GAnswer>;

    getSettingsDescriptor?(): SettingsControlDescriptor<GSettings>[];

    updateSettings?(settings: GSettings): void;

    getCurrentSettings?(): GSettings;

    onDestroy?(): void;
  }

  export class ExerciseError extends Error {
  }
}
