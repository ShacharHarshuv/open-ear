import {
  BaseRomanAnalysisChordProgressionExercise, BaseRomanAnalysisChordProgressionExerciseSettings, RomanNumeralChord,
  RomanNumeralsChordProgressionQuestion
} from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
import { Exercise } from '../../Exercise';
import { randomFromList } from '../../../shared/ts-utility';

type CommonChordProgressionExerciseSettings = BaseRomanAnalysisChordProgressionExerciseSettings;

export class CommonChordProgressionsExercise extends BaseRomanAnalysisChordProgressionExercise<CommonChordProgressionExerciseSettings> {
  readonly explanation: Exercise.ExerciseExplanationContent = ''; // todo
  readonly id: string = 'commonChordProgression'
  readonly name: string = 'Common Chord Progressions'
  readonly summary: string = 'Practice on recognizing the most common chord progression in popular music.'

  protected _getChordProgressionInRomanNumerals(): RomanNumeralsChordProgressionQuestion {
    return {
      chordProgressionInRomanAnalysis: randomFromList([
        ['I', 'V', 'vi', 'IV'],
        ['I', 'vi', 'IV', 'V']
      ])
    };
  }

  protected _getAllAnswersList(): Exercise.AnswerList<RomanNumeralChord> {
    // todo: decide based on selected progression
    return [
      'I',
      'IV',
      'V',
      'vi',
    ];
  }
}
