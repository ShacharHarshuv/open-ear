import { NoteEvent } from 'src/app/services/player.service';
import { SettingsConfig } from '../../../../exercise-logic/settings-config';
import { RomanNumeralChordSymbol } from '../../../../utility';
import { romanNumeralToChordInC } from '../../../../utility/music/harmony/romanNumeralToChordInC';
import { NumberOfSegmentsSetting } from '../../settings/NumberOfSegmentsSetting';
import {
  PlayAfterCorrectAnswerSetting,
  playAfterCorrectAnswerControlDescriptorList,
} from '../../settings/PlayAfterCorrectAnswerSetting';
import {
  VoicingSettings,
  chordVoicings,
} from '../../settings/voicing-settings';
import {
  ChordProgressionQuestion,
  useChordProgression,
} from '../chordProgressionExercise';
import { TonalExerciseSettings, useTonalExercise } from '../tonalExercise';
import { allRomanNumeralAnswerList } from './roman-numeral-answer-list';

export type RomanAnalysisChordProgressionExerciseSettings =
  TonalExerciseSettings & VoicingSettings & PlayAfterCorrectAnswerSetting;

export type RomanNumeralsChordProgressionQuestion = {
  chordProgressionInRomanAnalysis: RomanNumeralChordSymbol[];
};

export function useRomanAnalysisChordProgressionExercise() {
  const chordProgressionExercise = useChordProgression();
  const tonalExercise = useTonalExercise();

  const settingsConfig: SettingsConfig<RomanAnalysisChordProgressionExerciseSettings> =
    {
      controls: [
        ...tonalExercise.settingsDescriptors,
        ...chordVoicings.controls,
        ...playAfterCorrectAnswerControlDescriptorList({
          show: (settings: NumberOfSegmentsSetting) =>
            settings.numberOfSegments === 1,
        }),
      ],
      defaults: {
        playAfterCorrectAnswer: false,
        ...chordVoicings.defaults,
        ...tonalExercise.defaults,
        ...chordProgressionExercise.defaults,
      },
    };

  function getChordsQuestion(
    romanNumerals: RomanNumeralChordSymbol[],
  ): ChordProgressionQuestion<RomanNumeralChordSymbol> {
    return {
      segments: romanNumerals.map((romanNumeralSymbol) => {
        return {
          chord: romanNumeralToChordInC(romanNumeralSymbol),
          answer: romanNumeralSymbol,
        };
      }),
    };
  }

  return {
    getChordsQuestion,
    getQuestion(
      settings: RomanAnalysisChordProgressionExerciseSettings,
      romanNumeralsOrChordsQuestion:
        | RomanNumeralChordSymbol[]
        | ChordProgressionQuestion<RomanNumeralChordSymbol>,
      cadenceInC?: NoteEvent[],
    ) {
      const chordsQuestion = Array.isArray(romanNumeralsOrChordsQuestion)
        ? getChordsQuestion(romanNumeralsOrChordsQuestion)
        : romanNumeralsOrChordsQuestion;

      const questionInC = chordProgressionExercise.getQuestionInC(
        settings,
        chordsQuestion,
      );

      return tonalExercise.getQuestion(settings, questionInC, cadenceInC);
    },
    fullAnswerList: allRomanNumeralAnswerList,
    settingsConfig,
  };
}
