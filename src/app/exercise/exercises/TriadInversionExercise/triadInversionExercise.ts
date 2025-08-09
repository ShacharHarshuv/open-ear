import { IncludedAnswersSettings } from '../utility/settings/IncludedAnswersSettings';

type TriadInversionAnswer = 'Root Position' | '1st Inversion' | '2nd Inversion';

const triadInversions: TriadInversionAnswer[] = [
  'Root Position',
  '1st Inversion',
  '2nd Inversion',
];

export type TriadInversionExerciseSettings =
  IncludedAnswersSettings<TriadInversionAnswer> & {
    // todo(#167): arpeggio speed can be a generic pluggable settings (and reused across different exercise)
    arpeggiateSpeed: number;
    playRootAfterAnswer: boolean;
    arpeggioDirection:
      | 'ascending'
      | 'descending'
      | 'ascendingAndDescending'
      | 'descendingAndAscending';
  };

const allAnswersList = {
  rows: triadInversions.map((triadInversion) => [triadInversion]),
};

// export const triadInversionExercise: Exercise<
//   TriadInversionAnswer,
//   TriadInversionExerciseSettings
// > = {
//   id: 'triadInversions',
//   name: 'Triad Inversions',
//   summary: 'Find the inversion of a triad in close position',
//   explanation: TriadInversionExplanationComponent,
//   answerList: allAnswersList,
//   logic: (settings) => {
//     return {
//       getQuestion(
//         settings: TriadInversionExerciseSettings,
//       ): Exclude<Exercise.NotesQuestion<TriadInversionAnswer>, 'cadence'> {
//         const chordsInC: ChordSymbol[] = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
//         const randomChordInC: ChordSymbol = randomFromList(chordsInC);
//         const invertionOptions: TriadPosition[] = [0, 1, 2].filter(
//           (invertionOption) =>
//             settings.includedAnswers.includes(triadInversions[invertionOption]),
//         );
//         const randomTriadInversion: TriadPosition =
//           randomFromList(invertionOptions);
//         const answer = triadInversions[randomTriadInversion];
//         let voicing: Note[] = new Chord(randomChordInC).getVoicing({
//           position: randomTriadInversion,
//           withBass: false,
//           octave: 3, // picking a lower octave as a high one is more difficult
//         });
//         const root: Note = voicing[(3 - randomTriadInversion) % 3];
//         if (settings.arpeggiateSpeed !== 0) {
//           switch (settings.arpeggioDirection) {
//             case 'descending':
//               voicing = voicing.reverse();
//               break;
//             case 'ascendingAndDescending':
//               voicing = voicing.concat([...voicing].reverse());
//               break;
//             case 'descendingAndAscending':
//               voicing = voicing.reverse().concat([...voicing].reverse());
//               break;
//           }
//         }
//         const question: Exercise.Question<TriadInversionAnswer> = {
//           segments: [
//             {
//               partToPlay: voicing.map((note, index) => {
//                 const noteDelay = (index * settings.arpeggiateSpeed) / 100;
//                 return {
//                   notes: note,
//                   velocity: 0.3,
//                   duration:
//                     Tone.Time('1n').toSeconds() +
//                     ((voicing.length - 1) * settings.arpeggiateSpeed) / 100 -
//                     Tone.Time(noteDelay).toSeconds(),
//                   time: noteDelay,
//                 };
//               }),
//               rightAnswer: answer,
//             },
//           ],
//           info: '',
//         };

//         if (settings.playRootAfterAnswer) {
//           question.afterCorrectAnswer = [
//             {
//               partToPlay: toSteadyPart(root, '1n', 0.3),
//               answerToHighlight: answer,
//             },
//           ];
//         }

//         return question;
//       },
//     };
//   },
//   settingsDescriptors: [
//     {
//       key: 'arpeggiateSpeed',
//       info:
//         'When set to a value larger then zero, the chord will be arpeggiated, making it easier to pick up individual notes from it. <br>' +
//         'Starter with a large settings and gradually reducing can be a good way to train your ear to pick up individual notes being played harmonically',
//       descriptor: {
//         controlType: 'slider',
//         label: 'Arpeggiate Speed',
//         min: 0,
//         max: 100,
//         step: 1,
//       },
//     },
//     {
//       key: 'playRootAfterAnswer',
//       descriptor: {
//         controlType: 'checkbox',
//         label: 'Play Root After Correct Answer',
//       },
//     },
//     {
//       key: 'arpeggioDirection',
//       info:
//         'Ascending - the chord will be arpeggiated from bottom to top. \n' +
//         'Descending - the chord will be arpeggiated from top to bottom',
//       descriptor: {
//         label: 'Arpeggio Direction',
//         controlType: 'select',
//         options: [
//           {
//             label: 'Ascending',
//             value: 'ascending',
//           },
//           {
//             label: 'Descending',
//             value: 'descending',
//           },
//           {
//             label: 'Ascending & Descending',
//             value: 'ascendingAndDescending',
//           },
//           {
//             label: 'Descending & Ascending',
//             value: 'descendingAndAscending',
//           },
//         ],
//       },
//     },
//   ],
//   defaultSettings: {
//     arpeggiateSpeed: 0,
//     playRootAfterAnswer: true,
//   },
// };

// export const triadInversionExercise = () => {
//   return composeExercise(
//     useIncludedAnswers({
//       name: 'Inversions',
//     }),
//     tonalExercise({
//       playCadence: false,
//       keySelection: false,
//       droneSelection: false,
//     }),
//     createExercise,
//   )();
// };
