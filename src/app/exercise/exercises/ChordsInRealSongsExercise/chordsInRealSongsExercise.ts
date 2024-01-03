import { TitleCasePipe } from '@angular/common';
import * as _ from 'lodash';
import { isEmpty } from 'lodash';
import { NoteEvent } from '../../../services/player.service';
import {
  DeepReadonly,
  isValueTruthy,
  randomFromList,
} from '../../../shared/ts-utility';
import Exercise from '../../exercise-logic';
import { Mode, RomanNumeralChordSymbol } from '../../utility';
import {
  IV_V_I_CADENCE_IN_C,
  iv_V_i_CADENCE_IN_C,
} from '../../utility/music/chords';
import { RomanNumeralChord } from '../../utility/music/harmony/RomanNumeralChord';
import { toRelativeModeTonic } from '../../utility/music/harmony/toRelativeModeTonic';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { transpose } from '../../utility/music/transpose';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/romanAnalysisChordProgressionExercise';
import {
  AnalyzeBySettings,
  analyzeBySettings,
} from '../utility/settings/AnalyzeBySettings';
import { withSettings } from '../utility/settings/withSettings';
import {
  ProgressionInSongFromYouTubeDescriptor,
  chordsInRealSongsDescriptorList,
} from './chordsInRealSongsDescriptorList';

interface ChordsInRealSongsSettings extends AnalyzeBySettings {
  includedChords: RomanNumeralChordSymbol[];
}

const soloedChordsInRealSongsDescriptorList =
  chordsInRealSongsDescriptorList.filter(({ solo }) => solo);

export function chordsInRealSongsExercise(
  progressionList: DeepReadonly<
    ProgressionInSongFromYouTubeDescriptor[]
  > = isEmpty(soloedChordsInRealSongsDescriptorList)
    ? chordsInRealSongsDescriptorList
    : soloedChordsInRealSongsDescriptorList,
) {
  function getAvailableProgressions(
    settings: ChordsInRealSongsSettings,
  ): DeepReadonly<ProgressionInSongFromYouTubeDescriptor[]> {
    const isChordProgressionValid = (
      chords: DeepReadonly<ProgressionInSongFromYouTubeDescriptor>['chords'],
    ): boolean => {
      return _.every(chords, (chord) =>
        settings.includedChords.includes(chord.chord),
      );
    };

    const validChordProgressionsDescriptorList: DeepReadonly<
      ProgressionInSongFromYouTubeDescriptor[]
    > = progressionList
      .map((chordProgression) => {
        if (
          settings.tonicForAnalyzing === 'original' ||
          chordProgression.mode === Mode.Major
        ) {
          return chordProgression;
        }

        return {
          ...chordProgression,
          chords: _.map(chordProgression.chords, (chord) => ({
            ...chord,
            chord: RomanNumeralChord.toRelativeMode(
              chord.chord,
              chordProgression.mode,
              Mode.Major,
            ),
          })),
          mode: Mode.Major,
          key: toRelativeModeTonic(
            chordProgression.key,
            chordProgression.mode,
            Mode.Major,
          ),
        };
      })
      .map(
        (
          chordProgression,
        ): DeepReadonly<ProgressionInSongFromYouTubeDescriptor> | null => {
          if (isChordProgressionValid(chordProgression.chords)) {
            return chordProgression;
          } else if (chordProgression.mode !== Mode.Major) {
            // Trying to see if the relative Major progression can be included
            const chordsInRelativeKey = _.map(
              chordProgression.chords,
              (chord) => ({
                ...chord,
                chord: RomanNumeralChord.toRelativeMode(
                  chord.chord,
                  chordProgression.mode,
                  Mode.Major,
                ),
              }),
            );

            if (isChordProgressionValid(chordsInRelativeKey)) {
              return {
                ...chordProgression,
                chords: chordsInRelativeKey,
                mode: Mode.Major,
                key: toRelativeModeTonic(
                  chordProgression.key,
                  chordProgression.mode,
                  Mode.Major,
                ),
              };
            } else {
              // Both MAJOR and MINOR versions can't be included, returning null to signal it's not valid
              return null;
            }
          } else {
            return null;
          }
        },
      )
      .filter(isValueTruthy);

    // todo: handle this better (Seems like it is not actually being caught)
    if (_.isEmpty(validChordProgressionsDescriptorList)) {
      throw new Error(
        `No chord progression matching selected chords! Please select more chords. (I IV V vi will work)`,
      );
    }

    return validChordProgressionsDescriptorList;
  }

  return {
    ...composeExercise(
      withSettings(analyzeBySettings),
      createExercise<RomanNumeralChordSymbol, ChordsInRealSongsSettings>,
    )({
      id: 'chordsInRealSongs',
      name: 'Chord Progressions In Real Songs',
      summary:
        'Identify chord progressions in real songs, streamed from YouTube',
      blackListPlatform: 'ios', // currently, this exercise is not working on ios
      settingsDescriptors: [
        {
          key: 'includedChords',
          info:
            'Limit the types of chords that can appear in the examples.<br><br>' +
            ' Make sure to select enough chords otherwise there might be no song to play that matches only those chords. <br><br>' +
            "If a song analysis doesn't work with the selected chords the application will atempt to convert the analysis to the realtive Major scale. So if you selected I IV V vi, and a progression was analyzed as i bVI bVII, it will include it as vi V IV.",
          descriptor: {
            label: 'Included Chords',
            controlType: 'included-answers',
            answerList: allRomanNumeralAnswerList,
          },
        },
      ],
      defaultSettings: {
        includedChords: ['I', 'IV', 'V', 'vi'],
        tonicForAnalyzing: 'major',
      },
      answerList(
        settings: ChordsInRealSongsSettings,
      ): Exercise.AnswerList<RomanNumeralChordSymbol> {
        const progressionsList: DeepReadonly<
          ProgressionInSongFromYouTubeDescriptor[]
        > = getAvailableProgressions(settings);
        const includedAnswers: RomanNumeralChordSymbol[] = _.uniq(
          _.flatMap(
            progressionsList,
            (
              progression: ProgressionInSongFromYouTubeDescriptor,
            ): RomanNumeralChordSymbol[] =>
              progression.chords.map(
                (chordDescriptor) => chordDescriptor.chord,
              ),
          ),
        );
        return Exercise.filterIncludedAnswers(
          allRomanNumeralAnswerList,
          includedAnswers,
        );
      },
      getQuestion(
        settings: ChordsInRealSongsSettings,
      ): Exercise.Question<RomanNumeralChordSymbol> {
        const progression: DeepReadonly<ProgressionInSongFromYouTubeDescriptor> =
          randomFromList(getAvailableProgressions(settings));

        const modeToCadenceInC: Record<Mode, NoteEvent[]> = {
          [Mode.Lydian]: IV_V_I_CADENCE_IN_C,
          [Mode.Major]: IV_V_I_CADENCE_IN_C,
          [Mode.Mixolydian]: IV_V_I_CADENCE_IN_C,
          [Mode.Dorian]: iv_V_i_CADENCE_IN_C,
          [Mode.Minor]: iv_V_i_CADENCE_IN_C,
          [Mode.Phrygian]: iv_V_i_CADENCE_IN_C,
          [Mode.Locrian]: iv_V_i_CADENCE_IN_C,
        };
        return {
          type: 'youtube',
          videoId: progression.videoId,
          segments: progression.chords.map((chordDesc) => ({
            rightAnswer: chordDesc.chord,
            seconds: chordDesc.seconds,
          })),
          endSeconds: progression.endSeconds,
          cadence: transpose(
            modeToCadenceInC[progression.mode],
            getDistanceOfKeys(progression.key, 'C'),
          ),
          info: `${progression.name ?? ''}${
            progression.artist ? ` by ${progression.artist} ` : ''
          }(${progression.key} ${TitleCasePipe.prototype.transform(
            Mode[progression.mode],
          )})`,
        };
      },
    }),
    getAvailableProgressions,
  };
}
