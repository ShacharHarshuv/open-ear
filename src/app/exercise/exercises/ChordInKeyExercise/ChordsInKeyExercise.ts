import { Exercise } from '../../Exercise';
import {
  randomFromList,
  RomanNumeralChordSymbol,
} from '../../utility';
import * as _ from 'lodash';
import {
  numberOfSegmentsControlDescriptorList,
  NumberOfSegmentsSetting,
} from '../utility/settings/NumberOfSegmentsSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import {
  RomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
  romanAnalysisChordProgressionExercise,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import { chordVoicingSettings } from '../utility/exerciseAttributes/chordProgressionExercise';
import { cadenceTypeSettings } from '../utility/settings/CadenceTypeSetting';

type ChordInKeySettings =
  IncludedAnswersSettings<RomanNumeralChordSymbol> &
  RomanAnalysisChordProgressionExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

export function chordInKeyExercise() {
  return composeExercise(
    cadenceTypeSettings(),
    romanAnalysisChordProgressionExercise({
      voicingSettings: false,
    }),
    includedAnswersSettings(['I', 'IV', 'V']),
    chordVoicingSettings(),
    createExercise,
  )({
    id: 'chordInKey',
    name: 'Chord Functions',
    summary: 'Identify chords based on their tonal context in a key',
    explanation: ChordInKeyExplanationComponent,
    getChordProgressionInRomanNumerals(settings: ChordInKeySettings): RomanNumeralsChordProgressionQuestion {
      const numberOfSegments = settings.numberOfSegments;
      const availableChords: RomanNumeralChordSymbol[] = settings.includedAnswers;
      const chordProgression: RomanNumeralChordSymbol[] = [randomFromList(availableChords)];
      while (chordProgression.length < numberOfSegments) {
        chordProgression.push(randomFromList(availableChords.filter(chord => chord !== _.last(chordProgression)! || availableChords.length <= 1)));
      }

      return {
        chordProgressionInRomanAnalysis: chordProgression,
      };
    },
    settingsDescriptors: [
      ...numberOfSegmentsControlDescriptorList('chords'),
      ...playAfterCorrectAnswerControlDescriptorList({
        show: ((settings: ChordInKeySettings) => settings.numberOfSegments === 1),
      }),
    ],
    defaultSettings: {
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
      includedAnswers: ['I', 'IV', 'V'],
    },
  });
}
