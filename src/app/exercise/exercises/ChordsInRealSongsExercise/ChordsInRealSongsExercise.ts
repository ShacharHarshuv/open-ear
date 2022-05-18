import { BaseExercise } from '../utility/base-exercises/BaseExercise';
import { Exercise } from '../../Exercise';
import {
  BaseRomanAnalysisChordProgressionExercise,
  RomanNumeralChord,
} from '../utility/base-exercises/BaseRomanAnalysisChordProgressionExercise';
import {
  chordsInRealSongsDescriptorList,
  ProgressionInSongFromYouTubeDescriptor,
  Mode,
} from './chordsInRealSongsDescriptorList';
import * as _ from 'lodash';
import {
  randomFromList,
  isValueTruthy,
} from '../../../shared/ts-utility';
import { NoteEvent } from '../../../services/player.service';
import {
  iv_V_i_CADENCE_IN_C,
  IV_V_I_CADENCE_IN_C,
} from '../../utility/music/chords';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { TitleCasePipe } from '@angular/common';
import { SettingsDescriptors } from '../utility/settings/SettingsDescriptors';
import {
  toNoteTypeNumber,
  toNoteTypeName,
} from '../../utility/music/notes/toNoteTypeNumber';
import { mod } from '../../../shared/ts-utility/mod';
import { NoteType } from '../../utility/music/notes/NoteType';
import { Interval } from '../../utility';

type ChordsInRealSongsSettings = {
  includedChords: RomanNumeralChord[],
}

const MAJOR_TO_RELATIVE_MINOR: Partial<Record<RomanNumeralChord, RomanNumeralChord>> = {
  I: '♭III',
  ii: 'iv',
  iii: 'v',
  III: 'V',
  IV: '♭VI',
  V: '♭VII',
  vi: 'i',
  viiᵒ: 'iiᵒ',
}

const TO_RELATIVE_MODE: Record<Mode.Major | Mode.Minor, Partial<Record<RomanNumeralChord, RomanNumeralChord>>> = {
  [Mode.Major]: MAJOR_TO_RELATIVE_MINOR,
  [Mode.Minor]: _.invert(MAJOR_TO_RELATIVE_MINOR),
}

export function getRelativeKeyTonic(tonic: NoteType, mode: Mode): NoteType {
  const differenceToRelativeTonic = mode === Mode.Major ? -3 : 3;
  return toNoteTypeName(mod(toNoteTypeNumber(tonic) + differenceToRelativeTonic, Interval.Octave))
}

@SettingsDescriptors({
  key: 'includedChords',
  info: 'Limit the types of chords that can appear in the examples.<br><br>' +
    ' Make sure to select enough chords otherwise there might be no song to play that matches only those chords. <br><br>' +
    'If a song analysis doesn\'t work with the selected chords the application will atempt to convert the analysis to the realtive MAJOR or MAJOR. So if you selected I IV V vi, and a progression was analyzed as i bVI bVII, it will include it as vi V IV.',
  defaultValue: ['I', 'IV', 'V', 'vi'],
  descriptor: {
    label: 'Included Chords',
    controlType: 'INCLUDED_ANSWERS',
    answerList: BaseRomanAnalysisChordProgressionExercise.allAnswersList,
  },
})
export class ChordsInRealSongsExercise extends BaseExercise<RomanNumeralChord, ChordsInRealSongsSettings> {
  readonly explanation: Exercise.ExerciseExplanationContent;
  readonly id: string = 'chordsInRealSongs';
  readonly name: string = 'Chord Progressions In Real Songs';
  readonly summary: string = 'Identify chord progressions in real songs, streamed from YouTube';
  readonly blackListPlatform = 'ios'; // currently, this exercise is not working on ios

  private _getAvailableProgressions(): ProgressionInSongFromYouTubeDescriptor[] {
    const isChordProgressionValid = (chords: ProgressionInSongFromYouTubeDescriptor['chords']): boolean => {
      return _.every(chords, chord => this._settings.includedChords.includes(chord.chord));
    }

    const validChordProgressionsDescriptorList: ProgressionInSongFromYouTubeDescriptor[] = chordsInRealSongsDescriptorList
      .map((chordProgression): ProgressionInSongFromYouTubeDescriptor | null => {
        if (isChordProgressionValid(chordProgression.chords)) {
          return chordProgression;
        } else {
          // Trying to see if the relative MAJOR / MINOR progression can be included
          const chordsInRelativeKey = _.map(chordProgression.chords, chord => ({
            ...chord,
            chord: TO_RELATIVE_MODE[chordProgression.mode][chord.chord]!, // if result it undefined it won't get used anyway, so it's OK
          }));
          if (isChordProgressionValid(chordsInRelativeKey)) {
            return {
              ...chordProgression,
              chords: chordsInRelativeKey,
              mode: chordProgression.mode === Mode.Major ? Mode.Minor : Mode.Major,
              key: getRelativeKeyTonic(chordProgression.key, chordProgression.mode),
            }
          } else {
            // Both MAJOR and MINOR versions can't be included, returning null to signal it's not valid
            return null;
          }
        }
      })
      .filter(isValueTruthy);

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
    const modeToCadenceInC: Record<Mode.Major | Mode.Minor, NoteEvent[]> = {
      [Mode.Major]: IV_V_I_CADENCE_IN_C,
      [Mode.Minor]: iv_V_i_CADENCE_IN_C,
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
      info: `${progression.name ?? ''}${progression.artist ? ` by ${progression.artist} ` : ''}(${progression.key} ${TitleCasePipe.prototype.transform(Mode[progression.mode])})`,
    }
  }

}
