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
import { CreateExerciseParams } from './createExercise';
import {
  CadenceTypeSetting,
  cadenceTypeSettingsDescriptors,
} from '../settings/CadenceTypeSetting';
import { SettingsParams } from '../settings/SettingsParams';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;
import {
  keySelectionSettingsDescriptors,
  KeySelectionSettings,
} from '../settings/keySelectionSettingsDescriptors';
import { mod } from '../../../../shared/ts-utility/mod';

export type CadenceType = 'I IV V I' | 'i iv V i';

export type TonalExerciseSettings = CadenceTypeSetting & KeySelectionSettings;

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[]
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
}

export type TonalExerciseUtils = {
  getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange;
}

export type TonalExerciseParams<GAnswer extends string, GSettings extends Exercise.Settings> = {
  /*
   * question in C
   * */
  readonly getQuestion: StaticOrGetter<Omit<Exercise.NotesQuestion<GAnswer>, 'cadence'>, [GSettings, TonalExerciseUtils]>;
  /**
   * answerList in C
   * */
  readonly answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>,
};

export type TonalExerciseConfig = ({
  playCadence?: true,
  cadenceTypeSelection?: boolean,
} | {
  playCadence: false,
  cadenceTypeSelection?: false,
}) & {
  keySelection?: boolean,
}

export function tonalExercise<GAnswer extends string, GSettings extends Exercise.Settings>(config?: TonalExerciseConfig) {
  const fullConfig: Required<TonalExerciseConfig> = _.defaults(config, {
    playCadence: true,
    cadenceTypeSelection: config?.playCadence ?? true,
    keySelection: true,
  });

  let questionCount = 0;
  let key: Key;

  function getKey(settings: KeySelectionSettings): Key {
    function randomKey(exclude?: Key): Key {
      const allKeys: Key[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
      return randomFromList(allKeys.filter((key) => key !== exclude));
    }

    if (settings.key !== 'random') {
      return settings.key;
    }

    if (settings.newKeyEvery && mod(questionCount, settings.newKeyEvery) === 0) {
      return randomKey();
    }

    return key ?? randomKey();
  }

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

  function getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange {
    return transpose(rangeForPlaying, getDistanceOfKeys('C', key));
  }

  return function(
    params: TonalExerciseParams<GAnswer, GSettings>,
  ): Pick<CreateExerciseParams<GAnswer, GSettings & TonalExerciseSettings>, 'getQuestion' | 'answerList'> & SettingsParams<TonalExerciseSettings> & { defaultSettings: TonalExerciseSettings } {
    return {
      getQuestion(settings: GSettings & TonalExerciseSettings): Exercise.NotesQuestion<GAnswer> {
        key = getKey(settings);
        questionCount++;
        const questionInC: Exclude<Exercise.NotesQuestion<GAnswer>, 'cadence'> = toGetter(params.getQuestion)(settings,{
          getRangeForKeyOfC,
        });
        const selectedCadence = cadenceTypeToCadence[settings.cadenceType];
        return {
          info: keyInfo(),
          ...questionInC,
          segments: questionInC.segments.map(segment => ({
            rightAnswer: segment.rightAnswer,
            partToPlay: transposeToKey(segment.partToPlay),
          })),
          cadence: fullConfig.playCadence ? transposeToKey(selectedCadence) : undefined,
          key, // necessary to enforce cadence playback in case of key change
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
        key: 'random',
        newKeyEvery: 0,
      },
      settingsDescriptors: [
        ...(fullConfig.cadenceTypeSelection ? cadenceTypeSettingsDescriptors() : []),
        ...(fullConfig.keySelection ? keySelectionSettingsDescriptors() : []),
      ],
    }
  }
}
