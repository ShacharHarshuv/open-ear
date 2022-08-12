import {
  Key,
  OneOrMany,
  randomFromList,
  toGetter,
  NotesRange,
  StaticOrGetter,
} from '../../../utility';
import { Exercise } from '../../../Exercise';
import { transpose } from '../../../utility/music/transpose';
import { getDistanceOfKeys } from '../../../utility/music/keys/getDistanceOfKeys';
import {
  iv_V_i_CADENCE_IN_C,
  IV_V_I_CADENCE_IN_C,
} from '../../../utility/music/chords';
import { NoteEvent } from '../../../../services/player.service';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../../../utility/music/notes/NoteType';
import { Frequency } from 'tone/Tone/core/type/Units';
import {
  CreateExerciseParams,
  BaseExercise,
} from './createExercise';
import {
  CadenceTypeSetting,
  cadenceTypeSettingsDescriptors,
} from '../settings/CadenceTypeSetting';
import { SettingsParams } from '../settings/SettingsParams';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;

export type CadenceType = 'I IV V I' | 'i iv V i';

export type TonalExerciseSettings = CadenceTypeSetting;

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[]
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
}

export type TonalExerciseParams<GAnswer extends string, GSettings extends Exercise.Settings> = {
  /*
   * question in C
   * */
  getQuestion: (settings: GSettings) => Omit<Exercise.NotesQuestion<GAnswer>, 'cadence'>;
  /**
   * answerList in C
   * */
  answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>,
};

type TonalExerciseConfig = {
  playCadence?: boolean,
}

export function tonalExercise<GAnswer extends string, GSettings extends Exercise.Settings>(config?: TonalExerciseConfig) {
  const fullConfig: Required<TonalExerciseConfig> = _.defaults(config, {
    playCadence: true,
  });

  return function (
    params: TonalExerciseParams<GAnswer, GSettings>,
  ): Pick<CreateExerciseParams<GAnswer, GSettings & TonalExerciseSettings>, 'getQuestion' | 'answerList'> & SettingsParams<TonalExerciseSettings> & { defaultSettings: TonalExerciseSettings } {
    const key: Key = randomFromList(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']);

    function keyInfo(): string {
      return `Key: ${key}`
    }

    function transposeToKey(partOrNotes: Note): Note;
    function transposeToKey(partOrNotes: NoteType): NoteType;
    function transposeToKey(partOrNotes: Note[]): Note[];
    function transposeToKey(partOrNotes: Note | Note[]): Note | Note[];
    function transposeToKey(partOrNotes: NoteEvent[]): NoteEvent[];
    function transposeToKey(partOrNotes: NoteEvent[] | OneOrMany<Note>): NoteEvent[] | OneOrMany<Note>;
    function transposeToKey(partOrNotes: NoteEvent[] | Note[] | Note | NoteType): NoteEvent[] | Frequency[] | Frequency | NoteType {
      return transpose(partOrNotes, getDistanceOfKeys(key, 'C'));
    }

    return {
      getQuestion(settings: GSettings & TonalExerciseSettings): Exercise.NotesQuestion<GAnswer> {
        const questionInC: Exclude<Exercise.NotesQuestion<GAnswer>, 'cadence'> = params.getQuestion(settings);
        const selectedCadence = cadenceTypeToCadence[settings.cadenceType];
        return {
          info: keyInfo(),
          ...questionInC,
          segments: questionInC.segments.map(segment => ({
            rightAnswer: segment.rightAnswer,
            partToPlay: transposeToKey(segment.partToPlay),
          })),
          cadence: fullConfig.playCadence ? transposeToKey(selectedCadence) : undefined,
          afterCorrectAnswer: questionInC.afterCorrectAnswer?.map(afterCorrectAnswerSegment => ({
            answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
            partToPlay: transposeToKey(afterCorrectAnswerSegment.partToPlay),
          })),
        }
      },
      answerList: (settings: GSettings) => {
        const answerListInC: Exercise.AnswerList<GAnswer> = toGetter(params.answerList)(settings);
        const answerLayout: Exercise.NormalizedAnswerLayout<GAnswer> = Exercise.normalizedAnswerList(answerListInC);
        return Exercise.mapAnswerList(answerLayout, answerConfig => ({
          ...answerConfig,
          playOnClick: answerConfig.playOnClick ? (question: Exercise.Question<GAnswer>) => {
            const partToPlayInC: NoteEvent[] | OneOrMany<Note> | null = toGetter(answerConfig.playOnClick!)(question);
            return partToPlayInC && transposeToKey(partToPlayInC)
          } : null,
        }));
      },
      defaultSettings: {
        cadenceType: 'I IV V I',
      },
      settingsDescriptors: fullConfig.playCadence ? cadenceTypeSettingsDescriptors() : [],
    }
  }
}

/**
 * Generation for key and other utility methods can still be added to the object for state managment.
 * */

// todo: remove
export abstract class BaseTonalExercise<GAnswer extends string = string, GSettings extends TonalExerciseSettings = TonalExerciseSettings> extends BaseExercise<GAnswer, GSettings> {
  key: Key;

  constructor() {
    super();

    if (!this.key) {
      this.key = BaseTonalExercise._getRandomKey();
    }
  }

  protected get _keyInfo(): string {
    return `Key: ${this.key}`
  }

  getQuestion(): Exercise.NotesQuestion<GAnswer> {
    const questionInC: Exclude<Exercise.NotesQuestion<GAnswer>, 'cadence'> = this.getQuestionInC();
    const selectedCadence = cadenceTypeToCadence[this._settings.cadenceType];
    return {
      info: this._keyInfo,
      ...questionInC,
      segments: questionInC.segments.map(segment => ({
        rightAnswer: segment.rightAnswer,
        partToPlay: this._transposeToKey(segment.partToPlay),
      })),
      cadence: this._transposeToKey(selectedCadence),
      afterCorrectAnswer: questionInC.afterCorrectAnswer?.map(afterCorrectAnswerSegment => ({
        answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
        partToPlay: this._transposeToKey(afterCorrectAnswerSegment.partToPlay),
      })),
    }
  }

  abstract getQuestionInC(): Exclude<Exercise.NotesQuestion<GAnswer>, 'cadence'>;

  protected override _getDefaultSettings(): GSettings {
    return {
      ...super._getDefaultSettings(),
      cadenceType: 'I IV V I',
    };
  }

  override getAnswerList(): Exercise.AnswerList<GAnswer> {
    const answerListInC: Exercise.AnswerList<GAnswer> = this._getAnswersListInC();
    const answerLayout: Exercise.NormalizedAnswerLayout<GAnswer> = Exercise.normalizedAnswerList(answerListInC);
    return Exercise.mapAnswerList(answerLayout, answerConfig => ({
      ...answerConfig,
      playOnClick: answerConfig.playOnClick ? (question: Exercise.Question<GAnswer>) => {
        const partToPlayInC: NoteEvent[] | OneOrMany<Note> | null = toGetter(answerConfig.playOnClick!)(question);
        return partToPlayInC && this._transposeToKey(partToPlayInC)
      } : null,
    }));
  }

  protected abstract _getAnswersListInC(): Exercise.AnswerList<GAnswer>;

  /**
   * Use when you want to limit question heard range
   * */
  protected _getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange {
    return transpose(rangeForPlaying, getDistanceOfKeys('C', this.key));
  }

  private _transposeToKey(partOrNotes: Note): Note;
  private _transposeToKey(partOrNotes: NoteType): NoteType;
  private _transposeToKey(partOrNotes: Note[]): Note[];
  private _transposeToKey(partOrNotes: Note | Note[]): Note | Note[];
  private _transposeToKey(partOrNotes: NoteEvent[]): NoteEvent[];
  private _transposeToKey(partOrNotes: NoteEvent[] | OneOrMany<Note>): NoteEvent[] | OneOrMany<Note>;
  private _transposeToKey(partOrNotes: NoteEvent[] | Note[] | Note | NoteType): NoteEvent[] | Frequency[] | Frequency | NoteType {
    if (!this.key) {
      this.key = BaseTonalExercise._getRandomKey();
    }
    return transpose(partOrNotes, getDistanceOfKeys(this.key, 'C'));
  }

  private static _getRandomKey(): Key {
    return randomFromList(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']);
  }
}
