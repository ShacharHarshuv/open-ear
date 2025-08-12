import { Exercise, ExerciseLogic } from '../../exercise-logic';
import { RomanNumeralChordSymbol } from '../../utility';
import { composeSequenceWithGrammar } from '../../utility/grammer';
import { romanNumeralToChordInC } from '../../utility/music/harmony/romanNumeralToChordInC';
import {
  VoicingSettings,
  useChordProgression,
} from '../utility/exerciseAttributes/chordProgressionExercise';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import {
  TonalExerciseSettings,
  useTonalExercise,
} from '../utility/exerciseAttributes/tonalExercise';
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
    TonalExerciseSettings &
    VoicingSettings &
    NumberOfSegmentsSetting &
    PlayAfterCorrectAnswerSetting;

const tonalExercise = useTonalExercise();

const numberOfSegments = useNumberOfSegments('chord');

const chordProgression = useChordProgression();

const includedAnswers = useIncludedAnswers<RomanNumeralChordSymbol>({
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
        return tonalExercise.getQuestion({
          settings: settings(),
          getQuestionInC() {
            return chordProgression.getQuestionInC({
              settings: settings(),
              getChordProgressionInC() {
                const chordProgressionInRomanAnalysis =
                  composeSequenceWithGrammar(
                    settings().includedAnswers,
                    settings().numberOfSegments,
                    chordProgressionRules,
                  );

                return {
                  segments: chordProgressionInRomanAnalysis.map(
                    (romanNumeralSymbol: RomanNumeralChordSymbol) => {
                      const chord = romanNumeralToChordInC(romanNumeralSymbol);
                      return {
                        answer: romanNumeralSymbol,
                        chord: chord,
                      };
                    },
                  ),
                };
              },
            });
          },
        });
      },
      answerList: includedAnswers.answerList(settings),
    };
  },
  settingsDescriptors: [
    ...tonalExercise.settingsDescriptors,
    includedAnswers.settingDescriptor,
    numberOfSegments.settingsDescriptor,
    ...chordProgression.voicingSettingsDescriptor,
    ...playAfterCorrectAnswerControlDescriptorList({
      show: (settings: ChordInKeySettings) => settings.numberOfSegments === 1,
    }),
  ],
  defaultSettings: {
    ...tonalExercise.defaults,
    ...numberOfSegments.defaults,
    ...chordProgression.defaults,
    ...includedAnswers.defaults,
    includedAnswers: ['I', 'IV', 'V'],
    numberOfSegments: 1,
    playAfterCorrectAnswer: true,
  },
};
