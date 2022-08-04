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
  BaseExercise,
  createExercise,
  CreateExerciseParams,
} from './BaseExercise';
import { CadenceTypeSetting } from '../settings/CadenceTypeSetting';
import AnswerList = Exercise.AnswerList;

export type CadenceType = 'I IV V I' | 'i iv V i';

export type TonalExerciseSettings<GAnswer extends string> = CadenceTypeSetting;

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[]
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
}

/**
 * TODO: remove BaseTonalExercise
 * Use this function instead
 * */

// todo: consider using pick
export type TonalExerciseParams<GAnswer extends string, GSettings extends Exercise.Settings> = {
  getQuestionInC: (settings: GSettings) => Exercise.Question<GAnswer>;
  answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>,
};

// todo: consider if we want to use createExercise directly inside this function, as we assume it should always be used
// pros: easier to use
// cons: more dependencies, harder to test
// another option will be to have two functions, one that doesn't use the create exercise, and another that compose the two into one, we will need to consider naming though
export function tonalExercise<GAnswer extends string, GSettings extends Exercise.Settings>(params: TonalExerciseParams<GAnswer, GSettings>): Pick<CreateExerciseParams<GAnswer, GSettings>, 'getQuestion' | 'answerList'> {
  throw new Error('Not implemented');
}

// usage example:
// const exercise: Exercise.IExercise = createExercise({
//   ...tonalExercise({
//     getQuestionInC: (settings): Exercise.Question => ({
//
//     }),
//     answerList: [],
//   }),
//   id: 'id',
//   ...
// })

/**
 * Generation for key and other utility methods can still be added to the object for state managment.
 * */

export abstract class BaseTonalExercise<GAnswer extends string = string, GSettings extends TonalExerciseSettings<GAnswer> = TonalExerciseSettings<GAnswer>> extends BaseExercise<GAnswer, GSettings> {
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
