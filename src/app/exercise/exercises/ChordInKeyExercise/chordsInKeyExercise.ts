import { Exercise, ExerciseLogic } from '../../exercise-logic';
import { RomanNumeralChordSymbol } from '../../utility';
import { composeSequenceWithGrammar } from '../../utility/grammer';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  useRomanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/romanAnalysisChordProgressionExercise';
import {
  IncludedAnswersSettings,
  useIncludedAnswers,
} from '../utility/settings/IncludedAnswersSettings';
import {
  NumberOfSegmentsSetting,
  useNumberOfSegments,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';
import { chordProgressionRules } from './grammar/chord-progression-rules';

export type ChordInKeySettings =
  IncludedAnswersSettings<RomanNumeralChordSymbol> &
    RomanAnalysisChordProgressionExerciseSettings &
    NumberOfSegmentsSetting &
    PlayAfterCorrectAnswerSetting;

const numberOfSegments = useNumberOfSegments('chord');

const romanAnalysis = useRomanAnalysisChordProgressionExercise();

const includedAnswers = useIncludedAnswers({
  name: 'Roman Numerals',
  fullAnswerList: allRomanNumeralAnswerList,
});

export const chordInKeyExercise: Exercise<
  RomanNumeralChordSymbol,
  ChordInKeySettings
> = {
  id: 'chordInKey',
  name: 'Chord Functions',
  summary: 'Identify chords based on their tonal context in a key',
  explanation: ChordInKeyExplanationComponent,
  logic: (settings): ExerciseLogic<RomanNumeralChordSymbol> => {
    return {
      getQuestion() {
        const chords = composeSequenceWithGrammar(
          settings.includedAnswers,
          settings.numberOfSegments,
          chordProgressionRules,
        );

        return romanAnalysis.getQuestion(settings, chords);
      },
      answerList: includedAnswers.answerList(settings),
    };
  },
  settingsConfig: {
    controls: [
      ...romanAnalysis.settingsConfig.controls,
      includedAnswers.settingDescriptor,
      numberOfSegments.settingsDescriptor,
      ...playAfterCorrectAnswerControlDescriptorList({
        show: (settings: ChordInKeySettings) => settings.numberOfSegments === 1,
      }),
    ],
    defaults: {
      ...romanAnalysis.settingsConfig.defaults,
      ...numberOfSegments.defaults,
      ...includedAnswers.defaults,
      includedAnswers: ['I', 'IV', 'V'],
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
    },
  },
};
