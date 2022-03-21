import { BaseExercise } from '../utility/BaseExercise';
import { Exercise } from '../../Exercise';
import {
  BaseRomanAnalysisChordProgressionExercise,
  RomanNumeralChord
} from '../utility/BaseRomanAnalysisChordProgressionExercise';
import {
  chordsInRealSongsDescriptorList,
  ProgressionInSongFromYouTubeDescriptor
} from './chordsInRealSongsDescriptorList';
import * as _ from 'lodash';

export class ChordsInRealSongsExercise extends BaseExercise<RomanNumeralChord, {}> {
  protected readonly _settings = {};
  readonly explanation: Exercise.ExerciseExplanationContent;
  readonly id: string = 'chordsInRealSongs';
  readonly name: string = 'Chord Progressions In Real Songs';
  readonly summary: string = 'Identify chord progressions in real songs, streamed from YouTube';

  override getAnswerList(): Exercise.AnswerList<RomanNumeralChord> {
    const progressionsList: ProgressionInSongFromYouTubeDescriptor[] = chordsInRealSongsDescriptorList;
    const includedAnswers: RomanNumeralChord[] = _.uniq(_.flatMap(progressionsList, (progression: ProgressionInSongFromYouTubeDescriptor): RomanNumeralChord[] => progression.chords.map(chordDescriptor => chordDescriptor.chord)))
     return Exercise.filterIncludedAnswers(BaseRomanAnalysisChordProgressionExercise.allAnswersList, includedAnswers);
  }

  override getQuestion(): Exercise.Question<RomanNumeralChord> {
    return {
      segments: [],
    }
  }

}
