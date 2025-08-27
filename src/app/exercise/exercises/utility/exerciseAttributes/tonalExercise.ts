import * as _ from 'lodash';
import Exercise, {
  NotesQuestion,
  SettingsControlDescriptor,
} from 'src/app/exercise/exercise-logic';
import { NoteType } from 'src/app/exercise/utility/music/notes/NoteType';
import { noteTypeToNote } from 'src/app/exercise/utility/music/notes/noteTypeToNote';
import { mod } from 'src/app/shared/ts-utility/mod';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { Frequency } from 'tone/Tone/core/type/Units';
import { NoteEvent } from '../../../../services/player.service';
import {
  Key,
  NotesRange,
  OneOrMany,
  StaticOrGetter,
  randomFromList,
  scaleDegreeToChromaticDegree,
  toGetter,
} from '../../../utility';
import { getDistanceOfKeys } from '../../../utility/music/keys/getDistanceOfKeys';
import { transpose } from '../../../utility/music/transpose';
import {
  KeySelectionSettings,
  keySelectionSettingsDescriptors,
} from '../settings/keySelectionSettingsDescriptors';

export type DroneSettings = {
  drone: false | 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

export const droneSettingsDescriptor: SettingsControlDescriptor<DroneSettings> =
  {
    key: 'drone',
    info: 'Play a drone of the tonic note of the key. Recommend for beginners to feel the tension of the scale better.',
    descriptor: {
      controlType: 'select',
      label: 'Drone',
      options: [
        {
          value: false,
          label: 'Off',
        },
        {
          value: 1,
          label: 'Major Tonic (1st)',
        },
        {
          value: 6,
          label: 'Minor Tonic (6th)',
        },
        {
          value: 5,
          label: 'Mixolydian Tonic (5th)',
        },
        {
          value: 2,
          label: 'Dorian Tonic (2nd)',
        },
        {
          value: 4,
          label: 'Lydian Tonic (4th)',
        },
        {
          value: 3,
          label: 'Phrygian Tonic (3rd)',
        },
        {
          value: 7,
          label: 'Locrian Tonic (7th)',
        },
      ],
    },
  };

export type TonalExerciseSettings = KeySelectionSettings & DroneSettings;

export type TonalExerciseUtils = {
  getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange;
};

// export type TonalExerciseParams<
//   GAnswer extends string,
//   GSettings extends Exercise.Settings,
// > = {
//   /*
//    * question in C
//    * */
//   readonly getQuestion: StaticOrGetter<
//     Omit<Exercise.NotesQuestion<GAnswer>, 'cadence'>,
//     [GSettings, TonalExerciseUtils]
//   >;
//   /**
//    * answerList in C
//    * */
//   readonly answerList: StaticOrGetter<AnswerList<GAnswer>, [GSettings]>;
// };

export type TonalExerciseConfig = {
  // todo: consider, instead of adding those in the config, return the settings for those separately, so that the consumer can choose if they want to add them and in what order
  // the downside is that order is not guaranteed to be consistent between exercises, but maybe the flexibility & simplicity is worth it
  keySelection?: boolean;
  droneSelection?: boolean;
};

export function useTonalExercise(config?: TonalExerciseConfig) {
  const fullConfig: Required<TonalExerciseConfig> = _.defaults(config, {
    keySelection: true,
    droneSelection: true,
  });
  let questionCount = 0;
  let key: Key;

  function getKey(settings: KeySelectionSettings): Key {
    function randomKey(exclude?: Key): Key {
      const allKeys: Key[] = [
        'C',
        'G',
        'D',
        'A',
        'E',
        'B',
        'F#',
        'Db',
        'Ab',
        'Eb',
        'Bb',
        'F',
      ];
      return randomFromList(allKeys.filter((key) => key !== exclude));
    }

    if (settings.key !== 'random') {
      return settings.key;
    }

    if (
      settings.newKeyEvery &&
      mod(questionCount, settings.newKeyEvery) === 0
    ) {
      return randomKey(key);
    }

    return key ?? randomKey();
  }

  function keyInfo(): string {
    return `1 = ${key}`;
  }

  function transposeToKey(partOrNotes: Note): Note;
  function transposeToKey(partOrNotes: NoteType): NoteType;
  function transposeToKey(partOrNotes: Note[]): Note[];
  function transposeToKey(partOrNotes: Note | Note[]): Note | Note[];
  function transposeToKey(partOrNotes: NoteEvent[]): NoteEvent[];
  function transposeToKey(
    partOrNotes: NoteEvent[] | OneOrMany<Note>,
  ): NoteEvent[] | OneOrMany<Note>;
  function transposeToKey(
    partOrNotes: NoteEvent[] | Note[] | Note | NoteType,
  ): NoteEvent[] | Frequency[] | Frequency | NoteType {
    return transpose(partOrNotes, getDistanceOfKeys(key, 'C'));
  }

  function getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange {
    return transpose(rangeForPlaying, getDistanceOfKeys('C', key));
  }

  const defaults: TonalExerciseSettings = {
    key: 'random',
    newKeyEvery: 10,
    drone: false,
  };

  const settingsDescriptors: SettingsControlDescriptor<TonalExerciseSettings>[] =
    [
      ...(fullConfig.keySelection ? keySelectionSettingsDescriptors : []),
      ...(fullConfig.droneSelection ? [droneSettingsDescriptor] : []),
    ];

  return {
    getQuestion<GAnswer extends string>(
      settings: TonalExerciseSettings,
      questionInC: StaticOrGetter<
        Omit<NotesQuestion<GAnswer>, 'cadence'>,
        [TonalExerciseUtils]
      >,
      cadenceInC?: NoteEvent[],
    ): NotesQuestion<GAnswer> {
      key = getKey(settings);

      questionCount++;
      const _questionInC = toGetter(questionInC)({
        getRangeForKeyOfC,
      });
      return {
        info: keyInfo(),
        ..._questionInC,
        segments: _questionInC.segments.map((segment) => ({
          ...segment,
          rightAnswer: segment.rightAnswer,
          partToPlay: transposeToKey(segment.partToPlay),
        })),
        cadence: cadenceInC && transposeToKey(cadenceInC),
        key, // necessary to enforce cadence playback in case of key change
        drone: settings.drone
          ? transpose(
              noteTypeToNote(key, settings.drone > 4 ? 1 : 2),
              scaleDegreeToChromaticDegree[settings.drone.toString()] - 1,
            )
          : null,
        afterCorrectAnswer: _questionInC.afterCorrectAnswer?.map(
          (afterCorrectAnswerSegment) => ({
            answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
            partToPlay: transposeToKey(afterCorrectAnswerSegment.partToPlay),
          }),
        ),
      };
    },
    // This is optional, if you have a playOnClick in C that you need to transpose
    answerList: <GAnswer extends string>(
      answerListInC: Exercise.AnswerList<GAnswer>,
    ) =>
      Exercise.mapAnswerList(answerListInC, (answerConfig) => ({
        ...answerConfig,
        playOnClick: answerConfig.playOnClick
          ? (question: Exercise.Question<GAnswer>) => {
              const partToPlayInC: NoteEvent[] | OneOrMany<Note> | null =
                toGetter(answerConfig.playOnClick!)(question);
              return partToPlayInC && transposeToKey(partToPlayInC);
            }
          : null,
      })),
    settingsDescriptors,
    defaults,
  };
}
