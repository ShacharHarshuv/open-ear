import { Note } from 'tone/Tone/core/type/NoteUnits';
import * as _ from 'lodash';
import { Type } from '@angular/core';
import { Platforms } from '@ionic/core/dist/types/utils/platform';
import { NoteEvent } from '../../services/player.service';
import {
  OneOrMany,
  StaticOrGetter,
  isValueTruthy,
} from '../../shared/ts-utility';
import { Key } from '../utility';

type PartToPlay = NoteEvent[] | OneOrMany<Note>;

// TODO(#166): split this file to multiple files

interface BaseQuestion<GAnswer extends string, GSegment> {
  type?: string; // default: 'notes'
  /**
   * Use more than one segment for serial exercises
   * Example: in a melodic dictation each note is a segment, it has its own answer
   * */
  segments: (GSegment & {
    rightAnswer: GAnswer;
    /**
     * See PartToPlay#playAfter
     * */
    playAfter?: number;
  })[];
  /**
   * To be played to give the listener a context of the part,
   * Then the part can be played separately or with the cadence
   * */
  cadence?: PartToPlay;
  // used to enforce cadence playback in case of key change
  key?: Key;
  drone?: Note | null;
  afterCorrectAnswer?: {
    partToPlay: NoteEvent[];
    answerToHighlight?: GAnswer;
  }[];
  // use to display some info about the question to the user (for example, a key)
  info?:
    | string
    | {
        beforeCorrectAnswer: string;
        afterCorrectAnswer: string;
      };
}

export interface NotesQuestion<GAnswer extends string = string>
  extends BaseQuestion<
    GAnswer,
    {
      partToPlay: PartToPlay;
    }
  > {
  type?: 'notes';
}

export interface YouTubeQuestion<GAnswer extends string = string>
  extends BaseQuestion<
    GAnswer,
    {
      seconds: number;
    }
  > {
  type: 'youtube';
  videoId: string;
  endSeconds: number;
}

export type Question<GAnswer extends string = string> =
  | NotesQuestion<GAnswer>
  | YouTubeQuestion<GAnswer>;

export type Answer<GAnswer extends string = string> = GAnswer;

export type AnswerConfig<GAnswer extends string> = CellConfig & {
  answer: Answer<GAnswer> | null;
  playOnClick?: StaticOrGetter<PartToPlay | null, [Question<GAnswer>]>;
};

type CellConfig = {
  displayLabel?: string;
  space?: number;
};

export type MultiAnswerCell<GAnswer extends string = string> = CellConfig & {
  innerAnswersList: AnswerList<GAnswer>;
};

function isMultiAnswerCell<GAnswer extends string>(
  cell: AnswersLayoutCell<GAnswer>
): cell is MultiAnswerCell<GAnswer> {
  return !!cell && typeof cell === 'object' && 'innerAnswersList' in cell;
}

export type AnswersLayoutCell<GAnswer extends string = string> =
  | Answer<GAnswer>
  | null
  | AnswerConfig<GAnswer>
  | MultiAnswerCell<GAnswer>;

export type AnswerLayoutRow<GAnswer extends string = string> =
  | AnswersLayoutCell<GAnswer>[]
  | string;

export interface AnswersLayout<GAnswer extends string = string> {
  /**
   * Null means an empty space
   * */
  rows: AnswerLayoutRow<GAnswer>[];
}

export interface NormalizedAnswerLayout<GAnswer extends string = string>
  extends Required<AnswersLayout<GAnswer>> {
  rows: (
    | Required<AnswerConfig<GAnswer> | MultiAnswerCell<GAnswer>>[]
    | string
  )[];
}

function isSingleAnswer<GAnswer extends string>(
  cell: AnswersLayoutCell<GAnswer>
): cell is Answer<GAnswer> | null | AnswerConfig<GAnswer> {
  return (
    !Array.isArray(cell) &&
    (typeof cell !== 'object' || !cell || !('rows' in cell))
  );
}

export function normalizedAnswerList<GAnswer extends string = string>(
  answerList: AnswerList<GAnswer>
): NormalizedAnswerLayout<GAnswer> {
  const answerLayout: AnswersLayout<GAnswer> = Array.isArray(answerList)
    ? {
        rows: [answerList],
      }
    : answerList;

  return {
    rows: answerLayout.rows.map((row) => {
      if (typeof row === 'string') {
        return row;
      } else {
        return row.map(
          (
            cell
          ): Required<MultiAnswerCell<GAnswer> | AnswerConfig<GAnswer>> => {
            if (isMultiAnswerCell(cell)) {
              const firstAnswer = getAnswerListIterator(
                cell.innerAnswersList
              ).next().value;
              const defaultDisplayLabel =
                firstAnswer?.displayLabel ?? firstAnswer.answer;

              return {
                space: 1,
                displayLabel: defaultDisplayLabel,
                ...cell,
                innerAnswersList: normalizedAnswerList(cell.innerAnswersList),
              };
            }

            return normalizeAnswerConfig(cell);
          }
        );
      }
    }),
  };
}

export function normalizeAnswerConfig<GAnswer extends string = string>(
  cell: Answer<GAnswer> | null | AnswerConfig<GAnswer>
): Required<AnswerConfig<GAnswer>> {
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
  | (Answer<GAnswer> | AnswerConfig<GAnswer>)[]
  | AnswersLayout<GAnswer>;

export function flatAnswerList<GAnswer extends string>(
  answerList: AnswerList<GAnswer>
): GAnswer[] {
  return Array.from(getAnswerListIterator(answerList))
    .map((answerConfig): GAnswer | null => answerConfig.answer)
    .filter(isValueTruthy);
}

export function filterIncludedAnswers<GAnswer extends string>(
  allAnswerList: AnswerList<GAnswer>,
  includedAnswersList: GAnswer[]
): AnswerList<GAnswer> {
  const normalizedAnswerLayout: NormalizedAnswerLayout<GAnswer> =
    normalizedAnswerList(allAnswerList);

  return {
    rows: normalizedAnswerLayout.rows.map((row) => {
      if (typeof row === 'string') {
        return row;
      }
      return _.map(row, (answerLayoutCellConfig) => {
        if (isMultiAnswerCell(answerLayoutCellConfig)) {
          const innerAnswersList = filterIncludedAnswers(
            answerLayoutCellConfig.innerAnswersList,
            includedAnswersList
          );
          const flatAnswers = flatAnswerList(innerAnswersList);
          if (flatAnswers.length === 0) {
            return null;
          } else if (flatAnswers.length === 1) {
            return flatAnswers[0];
          } else {
            return {
              ...answerLayoutCellConfig,
              innerAnswersList,
            };
          }
        }

        return answerLayoutCellConfig.answer &&
          includedAnswersList.includes(answerLayoutCellConfig.answer)
          ? answerLayoutCellConfig
          : {
              ...answerLayoutCellConfig,
              answer: null, // In the future it's possible we'll want to configure a button to be disabled instead of hidden in this case
            };
      });
    }),
  };
}

export function* getAnswerListIterator<GAnswer extends string>(
  answerList: AnswerList<GAnswer>
): Generator<Required<AnswerConfig<GAnswer>>> {
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
        if (isMultiAnswerCell(cell)) {
          yield* getAnswerListIterator(cell.innerAnswersList);
        } else {
          const normalizedAnswerConfig = normalizeAnswerConfig(cell);
          if (normalizedAnswerConfig.answer) {
            yield normalizedAnswerConfig;
          }
        }
      }
    }
  }
}

export function mapAnswerList<
  GInputAnswer extends string = string,
  GOutputAnswer extends string = GInputAnswer
>(
  answerList: AnswerList<GInputAnswer>,
  callback: (
    answerConfig: AnswerConfig<GInputAnswer>
  ) => AnswerConfig<GOutputAnswer>
): AnswerList<GOutputAnswer> {
  if (typeof answerList === 'object' && !Array.isArray(answerList)) {
    return {
      rows: (answerList as AnswersLayout<GInputAnswer>).rows.map(
        (row): AnswerLayoutRow<GOutputAnswer> =>
          typeof row === 'string' ? row : mapAnswerCellList(row)
      ),
    };
  } else {
    // @ts-ignore // todo?
    return mapAnswerCellList(answerList);
  }

  function mapAnswerCellList(
    answerCellList: Exclude<AnswersLayoutCell<GInputAnswer>, null>[]
  ): Exclude<AnswersLayoutCell<GOutputAnswer>, null>[];
  function mapAnswerCellList(
    answerCellList: AnswersLayoutCell<GInputAnswer>[]
  ): AnswersLayoutCell<GOutputAnswer>[];
  function mapAnswerCellList(
    answerCellList: AnswersLayoutCell<GInputAnswer>[]
  ): AnswersLayoutCell<GOutputAnswer>[] {
    return _.map(answerCellList, (answerCell) => {
      if (!answerCell) {
        return null;
      } else if (typeof answerCell === 'string') {
        return callback({
          answer: answerCell,
        });
      } else if (isMultiAnswerCell(answerCell)) {
        return {
          ...answerCell,
          innerAnswersList: mapAnswerList(
            answerCell.innerAnswersList,
            callback
          ),
        };
      } else {
        return callback(answerCell);
      }
    });
  }
}

export function addViewLabelToAnswerList<GAnswer extends string>(
  answerList: AnswerList<GAnswer>,
  getAnswerViewLabel: (answer: GAnswer) => string
): AnswerList<GAnswer> {
  return mapAnswerList(answerList, (answerConfig) =>
    answerConfig.answer
      ? {
          ...answerConfig,
          displayLabel: getAnswerViewLabel(answerConfig.answer),
        }
      : answerConfig
  );
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

export interface SelectControlDescriptor<GValue = any>
  extends BaseSettingsControlDescriptor {
  controlType: 'select';
  options: {
    label: string;
    value: GValue;
  }[];
}

export interface ListSelectControlDescriptor<GValue = string | number>
  extends BaseSettingsControlDescriptor {
  controlType: 'list-select';
  allOptions: {
    label: string;
    value: GValue;
  }[];
}

export interface CheckboxControlDescriptor
  extends BaseSettingsControlDescriptor {
  controlType: 'checkbox';
}

export interface IncludedAnswersControlDescriptor<
  GAnswer extends string = string
> extends BaseSettingsControlDescriptor {
  controlType: 'included-answers';
  answerList: AnswerList<GAnswer>;
}

export type SettingValueType = number | string | boolean | (string | number)[];

export type Settings = { [key: string]: SettingValueType };

export type ControlDescriptor =
  | SliderControlDescriptor
  | SelectControlDescriptor
  | ListSelectControlDescriptor
  | IncludedAnswersControlDescriptor
  | CheckboxControlDescriptor;

/***
 * Usage of GKey is necessary here to avoid this issue: https://github.com/microsoft/TypeScript/issues/41595
 * */
export type SettingsControlDescriptor<
  GSettings extends Settings = Settings,
  GKey extends keyof GSettings = keyof GSettings
> =
  /*GKey extends string ?*/
  (
    | {
        key: GKey;
        getter?: undefined;
        onChange?: undefined;
      }
    | {
        key?: undefined;
        getter: (currentSettings: GSettings) => any;
        onChange: (
          newValue: any,
          prevValue: any,
          currentSetting: GSettings
        ) => Partial<GSettings>;
      }
  ) & {
    descriptor: /*GSettings[GKey] extends number ? SliderControlDescriptor | SelectControlDescriptor<GSettings[GKey]>
   : GSettings[GKey] extends Array<any> ? ListSelectControlDescriptor
   : SelectControlDescriptor<GSettings[GKey]>*/ StaticOrGetter<
      ControlDescriptor,
      [GSettings]
    >;
    show?: (settings: GSettings) => boolean;
    info?: string; // can contain html
    isDisabled?: (settings: GSettings, currentValue: any) => boolean;
  } /* : never*/;

export type ExerciseExplanationContent = string | Type<any>;

export type Exercise<
  GAnswer extends string = string,
  GSettings extends Settings = Settings
> = {
  /**
   * Do not change the keys for the same exercise between versions, as it will break the persistent storage
   * */
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly explanation?: ExerciseExplanationContent;
  readonly blackListPlatform?: Platforms;

  getAnswerList(): AnswerList<GAnswer>;

  getQuestion(): Question<GAnswer>;

  getSettingsDescriptor?(): SettingsControlDescriptor<GSettings>[];

  updateSettings?(settings: GSettings): void;

  getCurrentSettings?(): GSettings;

  onDestroy?(): void;
};

export class ExerciseError extends Error {}
