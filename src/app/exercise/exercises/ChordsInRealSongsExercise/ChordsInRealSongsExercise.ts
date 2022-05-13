import { BaseExercise } from '../utility/base-exercises/BaseExercise';
import { Exercise } from '../../Exercise';
import {
  BaseRomanAnalysisChordProgressionExercise,
  RomanNumeralChord
} from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
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
import { TitleCasePipe } from '@angular/common';
import { SettingsDescriptors } from '../utility/settings/SettingsDescriptors';

type ChordsInRealSongsSettings = {
  includedChords: RomanNumeralChord[],
}

@SettingsDescriptors({
  key: 'includedChords',
  info: 'Limit the types of chords that can appear in the examples. Make sure to select enough chords otherwise there might be no song to play that matches only those chords',
  defaultValue: ['I', 'IV', 'V', 'vi'],
  descriptor: {
    label: 'Included Chords',
    controlType: 'INCLUDED_ANSWERS',
    answerList: BaseRomanAnalysisChordProgressionExercise.allAnswersList,
  }
})
export class ChordsInRealSongsExercise extends BaseExercise<RomanNumeralChord, ChordsInRealSongsSettings> {
  readonly explanation: Exercise.ExerciseExplanationContent;
  readonly id: string = 'chordsInRealSongs';
  readonly name: string = 'Chord Progressions In Real Songs';
  readonly summary: string = 'Identify chord progressions in real songs, streamed from YouTube';
  readonly blackListPlatform = 'ios'; // currently, this exercise is not working on ios

  private _getAvailableProgressions(): ProgressionInSongFromYouTubeDescriptor[] {
    const validChordProgressionsDescriptorList = chordsInRealSongsDescriptorList.filter(chordProgression => {
      return _.every(chordProgression.chords, chord => this._settings.includedChords.includes(chord.chord));
    });
    if (_.isEmpty(validChordProgressionsDescriptorList)) {
      throw new Error(`No chord progression matching selected chords! Please select more chords. (I IV V vi will work)`);
    }
    return validChordProgressionsDescriptorList;
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
      info: `${progression.name ?? ''}${progression.artist ? ` by ${progression.artist} ` : ''}(Key: ${progression.key} ${TitleCasePipe.prototype.transform(progression.mode)})`,
    }
  }

}
