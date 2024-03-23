import * as _ from 'lodash';
import { randomFromList, RomanNumeralChordSymbol } from '../../utility';
import { chordVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import {
  romanAnalysisChordProgressionExercise,
  RomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import { cadenceTypeSettings } from '../utility/settings/CadenceTypeSetting';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import {
  numberOfSegmentsControlDescriptorList,
  NumberOfSegmentsSetting,
} from '../utility/settings/NumberOfSegmentsSetting';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';

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
      const availableChords: RomanNumeralChordSymbol[] =
        settings.includedAnswers;
      const chordProgression: RomanNumeralChordSymbol[] = [
        randomFromList(availableChords),
      ];
      while (chordProgression.length < numberOfSegments) {
        chordProgression.push(
          randomFromList(
            availableChords.filter(
              (chord) =>
                chord !== _.last(chordProgression)! ||
                availableChords.length <= 1,
            ),
          ),
        );
      }

      return {
        chordProgressionInRomanAnalysis: chordProgression,
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
