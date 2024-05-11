import { RomanNumeralChordSymbol } from '../../utility';
import {
  composeSequenceWithGrammar,
  noRepeatsRule,
  acceptOnly,
  acceptAll,
} from '../../utility/grammer';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { chordVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
  romanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import { cadenceTypeSettings } from '../utility/settings/CadenceTypeSetting';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import {
  NumberOfSegmentsSetting,
  numberOfSegmentsControlDescriptorList,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';
import { chordProgressionRules } from './grammar/chord-progression-rules';

type ChordInKeySettings = IncludedAnswersSettings<RomanNumeralChordSymbol> &
  RomanAnalysisChordProgressionExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

export function chordInKeyExercise() {
  return composeExercise(
    cadenceTypeSettings(),
    romanAnalysisChordProgressionExercise({
      voicingSettings: false,
    }),
    includedAnswersSettings({
      defaultSelectedAnswers: ['I', 'IV', 'V'],
      name: 'Roman Numerals',
    }),
    chordVoicingSettings(),
    createExercise,
  )({
    id: 'chordInKey',
    name: 'Chord Functions',
    summary: 'Identify chords based on their tonal context in a key',
    explanation: ChordInKeyExplanationComponent,
    getChordProgressionInRomanNumerals(
      settings: ChordInKeySettings,
    ): RomanNumeralsChordProgressionQuestion {
      const numberOfSegments = settings.numberOfSegments;
      const availableChords =
        settings.includedAnswers;

      const sequence = composeSequenceWithGrammar(
        availableChords,
        numberOfSegments,
        chordProgressionRules,
      );
      return {
        chordProgressionInRomanAnalysis: sequence,
      };
    },
    settingsDescriptors: [
      ...numberOfSegmentsControlDescriptorList('chords'),
      ...playAfterCorrectAnswerControlDescriptorList({
        show: (settings: ChordInKeySettings) => settings.numberOfSegments === 1,
      }),
    ],
    defaultSettings: {
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
      includedAnswers: ['I', 'IV', 'V'],
    },
  });
}
