import { RomanNumeralChordSymbol } from '../../utility';
import { RomanAnalysisChordProgressionExerciseSettings } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/romanAnalysisChordProgressionExercise';
import { IncludedAnswersSettings } from '../utility/settings/IncludedAnswersSettings';
import { NumberOfSegmentsSetting } from '../utility/settings/NumberOfSegmentsSetting';
import { PlayAfterCorrectAnswerSetting } from '../utility/settings/PlayAfterCorrectAnswerSetting';

type ChordInKeySettings = IncludedAnswersSettings<RomanNumeralChordSymbol> &
  RomanAnalysisChordProgressionExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

// export function chordInKeyExercise() {
//   return composeExercise(
//     cadenceTypeSettings(),
//     romanAnalysisChordProgressionExercise({
//       voicingSettings: false,
//     }),
//     useIncludedAnswers({
//       default: ['I', 'IV', 'V'],
//       name: 'Roman Numerals',
//     }),
//     chordVoicingSettings(),
//     createExercise,
//   )({
//     id: 'chordInKey',
//     name: 'Chord Functions',
//     summary: 'Identify chords based on their tonal context in a key',
//     explanation: ChordInKeyExplanationComponent,
//     getChordProgressionInRomanNumerals(
//       settings: ChordInKeySettings,
//     ): RomanNumeralsChordProgressionQuestion {
//       const numberOfSegments = settings.numberOfSegments;
//       const availableChords = settings.includedAnswers;

//       const sequence = composeSequenceWithGrammar(
//         availableChords,
//         numberOfSegments,
//         chordProgressionRules,
//       );
//       return {
//         chordProgressionInRomanAnalysis: sequence,
//       };
//     },
//     settingsDescriptors: [
//       ...numberOfSegmentsControlDescriptorList('chords'),
//       ...playAfterCorrectAnswerControlDescriptorList({
//         show: (settings: ChordInKeySettings) => settings.numberOfSegments === 1,
//       }),
//     ],
//     defaultSettings: {
//       numberOfSegments: 1,
//       playAfterCorrectAnswer: true,
//       includedAnswers: ['I', 'IV', 'V'],
//     },
//   });
// }
