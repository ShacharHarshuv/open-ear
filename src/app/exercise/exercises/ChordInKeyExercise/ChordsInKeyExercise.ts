import { Exercise } from '../../Exercise';
import { randomFromList } from '../../utility';
import * as _ from 'lodash';
import { numberOfSegmentsControlDescriptorList, NumberOfSegmentsSetting, } from '../utility/NumberOfSegmentsSetting';
import { ChordInKeyExplanationComponent } from './chord-in-key-explanation/chord-in-key-explanation.component';
import {
  playAfterCorrectAnswerControlDescriptorList,
  PlayAfterCorrectAnswerSetting
} from '../utility/PlayAfterCorrectAnswerSetting';
import {
  BaseRomanAnalysisChordProgressionExercise,
  BaseRomanAnalysisChordProgressionExerciseSettings,
  RomanNumeralChord,
  RomanNumeralsChordProgressionQuestion
} from '../utility/BaseRomanAnalysisChordProgressionExercise';
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

type ChordInKeySettings =
  BaseRomanAnalysisChordProgressionExerciseSettings &
  NumberOfSegmentsSetting &
  PlayAfterCorrectAnswerSetting;

export class ChordsInKeyExercise extends BaseRomanAnalysisChordProgressionExercise<ChordInKeySettings> {
  readonly id: string = 'chordInKey';
  readonly name: string = 'Chord in Key';
  readonly summary: string = 'Identify chords based on their tonal context in a key';
  readonly explanation: ExerciseExplanationContent = ChordInKeyExplanationComponent;

  protected _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion {
    const numberOfSegments = this._settings.numberOfSegments;
    const availableChords: RomanNumeralChord[] = this._settings.includedAnswers;
    const chordProgression: RomanNumeralChord[] = [randomFromList(availableChords)];
    while (chordProgression.length < numberOfSegments) {
      chordProgression.push(randomFromList(availableChords.filter(chord => chord !== _.last(chordProgression)!)));
    }

    return {
      chordProgressionInRomanAnalysis: chordProgression,
    };
  }

  protected override _getSettingsDescriptor(): Exercise.SettingsControlDescriptor<ChordInKeySettings>[] {
    return [
      ...super._getSettingsDescriptor(),
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
    };
  }
}
