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
import { randomFromList } from '../../../shared/ts-utility';
import { NoteEvent } from '../../../services/player.service';
import { iv_V_i_CADENCE_IN_C, IV_V_I_CADENCE_IN_C } from '../../utility/music/chords';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';

export class ChordsInRealSongsExercise extends BaseExercise<RomanNumeralChord, {}> {
  protected readonly _settings = {};
  readonly explanation: Exercise.ExerciseExplanationContent;
  readonly id: string = 'chordsInRealSongs';
  readonly name: string = 'Chord Progressions In Real Songs';
  readonly summary: string = 'Identify chord progressions in real songs, streamed from YouTube';

  private _getAvailableProgressions(): ProgressionInSongFromYouTubeDescriptor[] {
    // in the future we can filter it based on settings
    return chordsInRealSongsDescriptorList;
  }

  override getAnswerList(): Exercise.AnswerList<RomanNumeralChord> {
    const progressionsList: ProgressionInSongFromYouTubeDescriptor[] = this._getAvailableProgressions();
    const includedAnswers: RomanNumeralChord[] = _.uniq(_.flatMap(progressionsList, (progression: ProgressionInSongFromYouTubeDescriptor): RomanNumeralChord[] => progression.chords.map(chordDescriptor => chordDescriptor.chord)))
     return Exercise.filterIncludedAnswers(BaseRomanAnalysisChordProgressionExercise.allAnswersList, includedAnswers);
  }

  override getQuestion(): Exercise.Question<RomanNumeralChord> {
    const progression: ProgressionInSongFromYouTubeDescriptor = randomFromList(this._getAvailableProgressions())
    const modeToCadenceInC: Record<'MAJOR' | 'MINOR', NoteEvent[]> = {
      MAJOR: IV_V_I_CADENCE_IN_C,
      MINOR: iv_V_i_CADENCE_IN_C,
    }
    return {
      type: 'youtube',
      videoId: progression.videoId,
      segments: progression.chords.map(chordDesc => ({
        rightAnswer: chordDesc.chord,
        seconds: chordDesc.seconds,
      })),
      endSeconds: progression.endSeconds,
      cadence: transpose(modeToCadenceInC[progression.mode], getDistanceOfKeys(progression.key, 'C')),
    }
  }

}
