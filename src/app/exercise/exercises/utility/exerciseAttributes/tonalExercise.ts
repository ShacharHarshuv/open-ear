import { NoteEvent } from '../../../../services/player.service';
import Exercise from '../../../exercise-logic';
import { NotesRange } from '../../../utility';
import {
  IV_V_I_CADENCE_IN_C,
  iv_V_i_CADENCE_IN_C,
} from '../../../utility/music/chords';
import { getDistanceOfKeys } from '../../../utility/music/keys/getDistanceOfKeys';
import { transpose } from '../../../utility/music/transpose';
import { CadenceTypeSetting } from '../settings/CadenceTypeSetting';
import { KeySelectionSettings } from '../settings/keySelectionSettingsDescriptors';
import AnswerList = Exercise.AnswerList;

export type CadenceType = 'I IV V I' | 'i iv V i' | 'vi ii III vi';

export type DroneSettings = {
  drone: false | 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

// export function droneSettingsDescriptors(): Exercise.SettingsControlDescriptor<DroneSettings>[] {
//   return [
//     {
//       key: 'drone',
//       info: 'Play a drone of the tonic note of the key. Recommend for beginners to feel the tension of the scale better.',
//       descriptor: {
//         controlType: 'select',
//         label: 'Drone',
//         options: [
//           {
//             value: false,
//             label: 'Off',
//           },
//           {
//             value: 1,
//             label: 'Major Tonic (1st)',
//           },
//           {
//             value: 6,
//             label: 'Minor Tonic (6th)',
//           },
//           {
//             value: 5,
//             label: 'Mixolydian Tonic (5th)',
//           },
//           {
//             value: 2,
//             label: 'Dorian Tonic (2nd)',
//           },
//           {
//             value: 4,
//             label: 'Lydian Tonic (4th)',
//           },
//           {
//             value: 3,
//             label: 'Phrygian Tonic (3rd)',
//           },
//           {
//             value: 7,
//             label: 'Locrian Tonic (7th)',
//           },
//         ],
//       },
//     },
//   ];
// }

export type TonalExerciseSettings = CadenceTypeSetting &
  KeySelectionSettings &
  DroneSettings;

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[];
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
  'vi ii III vi': transpose(iv_V_i_CADENCE_IN_C, getDistanceOfKeys('A', 'C')),
};

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

export type TonalExerciseConfig = (
  | {
      playCadence?: true;
      cadenceTypeSelection?: boolean;
    }
  | {
      playCadence: false;
      cadenceTypeSelection?: false;
    }
) & {
  keySelection?: boolean;
  droneSelection?: boolean;
};

// export function tonalExercise<
//   GAnswer extends string,
//   GSettings extends Exercise.Settings,
// >(config?: TonalExerciseConfig) {
//   const fullConfig: Required<TonalExerciseConfig> = _.defaults(config, {
//     playCadence: true,
//     cadenceTypeSelection: config?.playCadence ?? true,
//     keySelection: true,
//     droneSelection: true,
//   });
//   let questionCount = 0;
//   let key: Key;

//   function getKey(settings: KeySelectionSettings): Key {
//     function randomKey(exclude?: Key): Key {
//       const allKeys: Key[] = [
//         'C',
//         'G',
//         'D',
//         'A',
//         'E',
//         'B',
//         'F#',
//         'Db',
//         'Ab',
//         'Eb',
//         'Bb',
//         'F',
//       ];
//       return randomFromList(allKeys.filter((key) => key !== exclude));
//     }

//     if (settings.key !== 'random') {
//       return settings.key;
//     }

//     if (
//       settings.newKeyEvery &&
//       mod(questionCount, settings.newKeyEvery) === 0
//     ) {
//       return randomKey(key);
//     }

//     return key ?? randomKey();
//   }

//   function keyInfo(): string {
//     return `Key: ${key}`;
//   }

//   function transposeToKey(partOrNotes: Note): Note;
//   function transposeToKey(partOrNotes: NoteType): NoteType;
//   function transposeToKey(partOrNotes: Note[]): Note[];
//   function transposeToKey(partOrNotes: Note | Note[]): Note | Note[];
//   function transposeToKey(partOrNotes: NoteEvent[]): NoteEvent[];
//   function transposeToKey(
//     partOrNotes: NoteEvent[] | OneOrMany<Note>,
//   ): NoteEvent[] | OneOrMany<Note>;
//   function transposeToKey(
//     partOrNotes: NoteEvent[] | Note[] | Note | NoteType,
//   ): NoteEvent[] | Frequency[] | Frequency | NoteType {
//     return transpose(partOrNotes, getDistanceOfKeys(key, 'C'));
//   }

//   function getRangeForKeyOfC(rangeForPlaying: NotesRange): NotesRange {
//     return transpose(rangeForPlaying, getDistanceOfKeys('C', key));
//   }

//   return function (params: TonalExerciseParams<GAnswer, GSettings>): Pick<
//     CreateExerciseParams<GAnswer, GSettings & TonalExerciseSettings>,
//     'answerList'
//   > & {
//     readonly getQuestion: (
//       settings: GSettings & TonalExerciseSettings,
//     ) => Exercise.NotesQuestion<GAnswer>;
//   } & SettingsParams<TonalExerciseSettings> & {
//       defaultSettings: TonalExerciseSettings;
//     } {
//     return {
//       getQuestion(
//         settings: GSettings & TonalExerciseSettings,
//       ): Exercise.NotesQuestion<GAnswer> {
//         key = getKey(settings);
//         questionCount++;
//         const questionInC: Exclude<
//           Exercise.NotesQuestion<GAnswer>,
//           'cadence'
//         > = toGetter(params.getQuestion)(settings, {
//           getRangeForKeyOfC,
//         });
//         const selectedCadence = cadenceTypeToCadence[settings.cadenceType];
//         return {
//           info: keyInfo(),
//           ...questionInC,
//           segments: questionInC.segments.map((segment) => ({
//             ...segment,
//             rightAnswer: segment.rightAnswer,
//             partToPlay: transposeToKey(segment.partToPlay),
//           })),
//           cadence: fullConfig.playCadence
//             ? transposeToKey(selectedCadence)
//             : undefined,
//           key, // necessary to enforce cadence playback in case of key change
//           drone: settings.drone
//             ? transpose(
//                 noteTypeToNote(key, settings.drone > 4 ? 1 : 2),
//                 scaleDegreeToChromaticDegree[settings.drone.toString()] - 1,
//               )
//             : null,
//           afterCorrectAnswer: questionInC.afterCorrectAnswer?.map(
//             (afterCorrectAnswerSegment) => ({
//               answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
//               partToPlay: transposeToKey(afterCorrectAnswerSegment.partToPlay),
//             }),
//           ),
//         };
//       },
//       answerList: (settings: GSettings) => {
//         const answerListInC: Exercise.AnswerList<GAnswer> = toGetter(
//           params.answerList,
//         )(settings);
//         return Exercise.mapAnswerList(answerListInC, (answerConfig) => ({
//           ...answerConfig,
//           playOnClick: answerConfig.playOnClick
//             ? (question: Exercise.Question<GAnswer>) => {
//                 const partToPlayInC: NoteEvent[] | OneOrMany<Note> | null =
//                   toGetter(answerConfig.playOnClick!)(question);
//                 return partToPlayInC && transposeToKey(partToPlayInC);
//               }
//             : null,
//         }));
//       },
//       defaultSettings: {
//         cadenceType: 'I IV V I',
//         key: 'random',
//         newKeyEvery: 0,
//         drone: false,
//       },
//       settingsDescriptors: [
//         ...(fullConfig.cadenceTypeSelection
//           ? cadenceTypeSettingsDescriptors()
//           : []),
//         ...(fullConfig.keySelection ? keySelectionSettingsDescriptors() : []),
//         ...(fullConfig.droneSelection ? droneSettingsDescriptors() : []),
//       ],
//     };
//   };
// }
