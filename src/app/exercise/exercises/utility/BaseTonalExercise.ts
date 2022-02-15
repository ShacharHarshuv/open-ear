import { Key, OneOrMany, randomFromList, toGetter } from '../../utility';
import { Exercise, } from '../../Exercise';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { iv_V_i_CADENCE_IN_C, IV_V_I_CADENCE_IN_C } from '../../utility/music/chords';
import { BaseCommonSettingsExercise, BaseCommonSettingsExerciseSettings } from './BaseCommonSettingsExercise';
import { NoteEvent } from '../../../services/player.service';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from '../../utility/music/notes/NoteType';
import { Frequency } from 'tone/Tone/core/type/Units';

type CadenceType = 'I IV V I' | 'i iv V i';

export type BaseTonalExerciseSettings<GAnswer extends string> = BaseCommonSettingsExerciseSettings<GAnswer> & {
  cadenceType: CadenceType;
}

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[]
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
}

export abstract class BaseTonalExercise<GAnswer extends string = string, GSettings extends BaseTonalExerciseSettings<GAnswer> = BaseTonalExerciseSettings<GAnswer>> extends BaseCommonSettingsExercise<GAnswer, GSettings> {
  key: Key;

  constructor() {
    super();

    if (!this.key) {
      this.key = BaseTonalExercise._getRandomKey();
    }
  }

  getQuestion(): Exercise.Question<GAnswer> {
    const randomQuestionInC: Exclude<Exercise.Question<GAnswer>, 'cadence'> = this.getQuestionInC();
    const selectedCadence = cadenceTypeToCadence[this._settings.cadenceType];
    return {
      segments: randomQuestionInC.segments.map(segment => ({
        rightAnswer: segment.rightAnswer,
        partToPlay: this._transposeToKey(segment.partToPlay),
      })),
      cadence: this._transposeToKey(selectedCadence),
      afterCorrectAnswer: randomQuestionInC.afterCorrectAnswer?.map(afterCorrectAnswerSegment => ({
        answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
        partToPlay: this._transposeToKey(afterCorrectAnswerSegment.partToPlay),
      })),
    }
  }

  abstract getQuestionInC(): Exclude<Exercise.Question<GAnswer>, 'cadence'>;

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<GSettings>[] {
    return [
      {
        key: 'cadenceType',
        descriptor: {
          controlType: 'SELECT',
          label: 'Cadence Type',
          options: [
            {
              value: 'I IV V I',
              label: 'I IV V I (Major)',
            },
            {
              value: 'i iv V i',
              label: 'i iv V i (Minor)',
            },
          ]
        }
      },
      ...super._getSettingsDescriptor(),
    ];
  }

  protected override _getDefaultSettings(): GSettings {
    return {
      ...super._getDefaultSettings(),
      cadenceType: 'I IV V I',
    };
  }

  protected override _getAllAnswersList(): Exercise.AnswerList<GAnswer> {
    const answerListInC: Exercise.AnswerList<GAnswer> = this._getAllAnswersListInC();
    const answerLayout: Exercise.NormalizedAnswerLayout<GAnswer> = Exercise.normalizedAnswerList(answerListInC);
    return {
      rows: answerLayout.rows.map(row => row.map(answerConfig => ({
        ...answerConfig,
        playOnClick: answerConfig.playOnClick ? (question: Exercise.Question<GAnswer>) => {
          const partToPlayInC: NoteEvent[] | OneOrMany<Note> | null = toGetter(answerConfig.playOnClick)(question);
          return partToPlayInC && this._transposeToKey(partToPlayInC)
        } : null,
      })))
    }
  }

  protected abstract _getAllAnswersListInC(): Exercise.AnswerList<GAnswer>;

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
