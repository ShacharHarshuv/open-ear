import { Exercise } from '../../Exercise';
import { BaseRomanAnalysisChordProgressionExercise } from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import {
  chordsInRealSongsDescriptorList,
  ProgressionInSongFromYouTubeDescriptor,
} from './chordsInRealSongsDescriptorList';
import * as _ from 'lodash';
import {
  randomFromList,
  isValueTruthy,
  DeepReadonly,
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
import {
  Interval,
  RomanNumeralChordSymbol,
  Mode,
} from '../../utility';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { BaseExercise } from '../utility/exerciseAttributes/createExercise';

type ChordsInRealSongsSettings = {
  includedChords: RomanNumeralChordSymbol[],
}

export function getRelativeKeyTonic(tonic: NoteType, mode: Mode): NoteType {
  const differenceToRelativeTonic = mode === Mode.Major ? -3 : 3;
  return toNoteTypeName(mod(toNoteTypeNumber(tonic) + differenceToRelativeTonic, Interval.Octave))
}

@SettingsDescriptors({
  key: 'includedChords',
  info: 'Limit the types of chords that can appear in the examples.<br><br>' +
    ' Make sure to select enough chords otherwise there might be no song to play that matches only those chords. <br><br>' +
    'If a song analysis doesn\'t work with the selected chords the application will atempt to convert the analysis to the realtive Major scale. So if you selected I IV V vi, and a progression was analyzed as i bVI bVII, it will include it as vi V IV.',
  defaultValue: ['I', 'IV', 'V', 'vi'],
  descriptor: {
    label: 'Included Chords',
    controlType: 'included-answers',
    answerList: BaseRomanAnalysisChordProgressionExercise.allAnswersList,
  },
})
export class ChordsInRealSongsExercise extends BaseExercise<RomanNumeralChordSymbol, ChordsInRealSongsSettings> {
  readonly explanation: Exercise.ExerciseExplanationContent;
  readonly id: string = 'chordsInRealSongs';
  readonly name: string = 'Chord Progressions In Real Songs';
  readonly summary: string = 'Identify chord progressions in real songs, streamed from YouTube';
  readonly blackListPlatform = 'ios'; // currently, this exercise is not working on ios

  constructor(private readonly _progressionList: DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> = chordsInRealSongsDescriptorList) {
    super();
  }

  getAvailableProgressions(): DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> {
    const isChordProgressionValid = (chords: DeepReadonly<ProgressionInSongFromYouTubeDescriptor>['chords']): boolean => {
      return _.every(chords, chord => this._settings.includedChords.includes(chord.chord));
    }

    /**
     * Used for debugging purposes only,
     * should be empty in real situation
     * */
    const soloedProgressions: DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> = _.filter(this._progressionList, 'solo');
    if (!_.isEmpty(soloedProgressions)) {
      return soloedProgressions
    }

    const validChordProgressionsDescriptorList: DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> = this._progressionList
      .map((chordProgression): DeepReadonly<ProgressionInSongFromYouTubeDescriptor> | null => {
        if (isChordProgressionValid(chordProgression.chords)) {
          return chordProgression;
        } else if (chordProgression.mode !== Mode.Major) {
          // Trying to see if the relative Major progression can be included
          const chordsInRelativeKey = _.map(chordProgression.chords, chord => ({
            ...chord,
            chord: RomanNumeralChord.toRelativeMode(chord.chord, chordProgression.mode, Mode.Major),
          }));
          if (isChordProgressionValid(chordsInRelativeKey)) {
            return {
              ...chordProgression,
              chords: chordsInRelativeKey,
              mode: Mode.Major,
              key: getRelativeKeyTonic(chordProgression.key, chordProgression.mode),
            }
          } else {
            // Both MAJOR and MINOR versions can't be included, returning null to signal it's not valid
            return null;
          }
        } else {
          return null;
        }
      })
      .filter(isValueTruthy);

    if (_.isEmpty(validChordProgressionsDescriptorList)) {
      throw new Error(`No chord progression matching selected chords! Please select more chords. (I IV V vi will work)`);
    }

    return validChordProgressionsDescriptorList;
  }

  override getAnswerList(): Exercise.AnswerList<RomanNumeralChordSymbol> {
    const progressionsList: DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> = this.getAvailableProgressions();
    const includedAnswers: RomanNumeralChordSymbol[] = _.uniq(_.flatMap(progressionsList, (progression: ProgressionInSongFromYouTubeDescriptor): RomanNumeralChordSymbol[] => progression.chords.map(chordDescriptor => chordDescriptor.chord)))
    return Exercise.filterIncludedAnswers(BaseRomanAnalysisChordProgressionExercise.allAnswersList, includedAnswers);
  }

  override getQuestion(): Exercise.Question<RomanNumeralChordSymbol> {
    const progression: DeepReadonly<ProgressionInSongFromYouTubeDescriptor> = randomFromList(this.getAvailableProgressions())
    const modeToCadenceInC: Record<Mode, NoteEvent[]> = {
      [Mode.Lydian]: IV_V_I_CADENCE_IN_C,
      [Mode.Major]: IV_V_I_CADENCE_IN_C,
      [Mode.Mixolydian]: IV_V_I_CADENCE_IN_C,
      [Mode.Dorian]: iv_V_i_CADENCE_IN_C,
      [Mode.Minor]: iv_V_i_CADENCE_IN_C,
      [Mode.Phrygian]: iv_V_i_CADENCE_IN_C,
      [Mode.Locrian]: iv_V_i_CADENCE_IN_C,
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
