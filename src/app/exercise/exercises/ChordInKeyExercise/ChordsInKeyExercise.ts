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
  BaseRomanAnalysisChordProgressionExercise,
  RomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralsChordProgressionQuestion,
} from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import {
  IncludedAnswersSetting,
  IncludedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { CadenceTypeSetting } from '../utility/settings/CadenceTypeSetting';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

type ChordInKeySettings =
  IncludedAnswersSettings<RomanNumeralChordSymbol> &
  RomanAnalysisChordProgressionExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

@CadenceTypeSetting<ChordInKeySettings>()
@IncludedAnswersSetting<RomanNumeralChordSymbol, ChordInKeySettings>({
  default: ['I', 'IV', 'V'],
})
export class ChordsInKeyExercise extends BaseRomanAnalysisChordProgressionExercise<ChordInKeySettings> {
  readonly id: string = 'chordInKey';
  readonly name: string = 'Chord Functions';
  readonly summary: string = 'Identify chords based on their tonal context in a key';
  readonly explanation: ExerciseExplanationContent = ChordInKeyExplanationComponent;

  protected _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion {
    const numberOfSegments = this._settings.numberOfSegments;
    const availableChords: RomanNumeralChordSymbol[] = this._settings.includedAnswers;
    const chordProgression: RomanNumeralChordSymbol[] = [randomFromList(availableChords)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(availableChords.filter(chord => chord !== _.last(chordProgression)! || availableChords.length <= 1)));
    }

    return {
      chordProgressionInRomanAnalysis: chordProgression,
    };
  }

  override getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordInKeySettings>[] {
    return [
      ...super.getSettingsDescriptor(),
      ...numberOfSegmentsControlDescriptorList('chords'),
      ...playAfterCorrectAnswerControlDescriptorList({
        show: ((settings: ChordInKeySettings) => settings.numberOfSegments === 1),
      }),
    ];
  }

  protected override _getDefaultSettings(): ChordInKeySettings {
    return {
      ...super._getDefaultSettings(),
      numberOfSegments: 1,
      playAfterCorrectAnswer: true,
      includedAnswers: ['I', 'IV', 'V'],
    };
  }
}
