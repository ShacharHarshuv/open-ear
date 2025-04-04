import { TitleCasePipe } from '@angular/common';
import * as _ from 'lodash';
import { first, isEmpty } from 'lodash';
import { isAcceptableChordAnalysis } from 'src/app/exercise/utility/music/harmony/isAcceptableChordAnalysis';
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
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import {
  AnalyzeBySettings,
  analyzeBySettings,
} from '../utility/settings/AnalyzeBySettings';
import {
  AcceptEquivalentChordSettings,
  flexibleChordChoiceSettings,
} from '../utility/settings/acceptEquivalentChordsSettings';
import { withSettings } from '../utility/settings/withSettings';
import {
  ProgressionInSongFromYouTubeDescriptor,
  chordsInRealSongsDescriptorList,
} from './chordsInRealSongsDescriptorList';

interface ChordsInRealSongsSettings
  extends AnalyzeBySettings,
    AcceptEquivalentChordSettings {
  includedChords: RomanNumeralChordSymbol[];
}

const soloedChordsInRealSongsDescriptorList =
  chordsInRealSongsDescriptorList.filter(({ solo }) => solo);

function getId(
  progression: DeepReadonly<ProgressionInSongFromYouTubeDescriptor>,
): string {
  return `${progression.legacyVideoId ?? progression.videoId} ${progression.section ?? ''} ${progression.subId ?? ''}`;
}

const duplicates = _(chordsInRealSongsDescriptorList)
  .groupBy(getId)
  .pickBy((x) => x.length > 1)
  .mapValues((x) => x.length)
  .value();

if (!isEmpty(duplicates)) {
  console.log('duplicates', duplicates);
  throw new Error('Duplicate ids found. Use "subId" to eliminate them'); // todo
}
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
      return _.every(chords, (chord) => {
        const isChordValid = settings.includedChords.includes(chord.chord);
        if (!isChordValid) {
          console.log('Invalid chord', chord.chord);
        }
        return isChordValid;
      });
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

        if (
          settings.tonicForAnalyzing === 'major' &&
          [Mode.Mixolydian, Mode.Lydian].includes(chordProgression.mode)
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
      // Note, when soloing songs that are not included in the difficult (I IV V vi) settings, this exception will fire and prevent testing of the progression
      // In that case, just comment out the exception for testing purposes
      throw new Error(
        `No chord progression matching selected chords! Please select more chords. (I IV V vi will work)\n` +
          `If you're using it for debugging with the "solo" option, this fails because settings are not loaded immediately. Trying soloing another song with simple chords to go around the error`,
      );
    }

    return validChordProgressionsDescriptorList;
  }

  function getQuestionFromProgression(
    progression: DeepReadonly<ProgressionInSongFromYouTubeDescriptor>,
    settings: AcceptEquivalentChordSettings,
  ): Exercise.Question<RomanNumeralChordSymbol> {
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
      id: getId(progression),
      videoId: progression.videoId,
      segments: progression.chords.map((chordDesc) => ({
        rightAnswer: chordDesc.chord,
        isAcceptable: (answer) =>
          isAcceptableChordAnalysis(chordDesc.chord, answer, {
            // TODO: consider making finer settings from the user perspective
            ignoreExtensions: settings.acceptEquivalentChord
              ? 'when-equivalent'
              : false,
            ignoreSharp5: !!settings.acceptEquivalentChord,
            ignoreSuspensions: !!settings.acceptEquivalentChord,
          }),
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
  }

  return {
    ...composeExercise(
      withSettings(analyzeBySettings),
      withSettings(flexibleChordChoiceSettings),
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
        acceptEquivalentChord: true,
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
        questionsToExclude?: string[],
      ): Exercise.Question<RomanNumeralChordSymbol> {
        const questionsToExcludeSet = new Set(questionsToExclude);

        const availableProgressions = getAvailableProgressions(settings).filter(
          (progression) => !questionsToExcludeSet.has(getId(progression)),
        );

        console.log('# of songs to choose from', availableProgressions.length);

        // when using "learn" mode, the questionsToExclude will be passed here. In this mode we want to learn the songs in order
        const progression:
          | DeepReadonly<ProgressionInSongFromYouTubeDescriptor>
          | undefined = (questionsToExclude ? first : randomFromList)(
          availableProgressions,
        );

        if (!progression) {
          // todo: we might need to handle this eventually, because it's possible that there is indeed no more quesitons that are not in the "cards" (in learn mode)
          throw new Error(`No more progressions!`);
        }

        return getQuestionFromProgression(progression, settings);
      },
      getQuestionById(
        settings: ChordsInRealSongsSettings,
        questionId: string,
      ): Exercise.Question<RomanNumeralChordSymbol> | undefined {
        const availableProgressions = getAvailableProgressions(settings);
        const progression = _.find(
          availableProgressions,
          (progression) => getId(progression) === questionId,
        );

        return progression
          ? getQuestionFromProgression(progression, settings)
          : undefined;
      },
      // todo: consider encorporating this or something similar
      // getIsQuestionValid(
      //   settings: ChordsInRealSongsSettings,
      //   question: Exercise.YouTubeQuestion<RomanNumeralChordSymbol>,
      // ) {
      //   return _.every(question.segments, (segment) =>
      //     settings.includedChords.includes(segment.rightAnswer),
      //   );
      // },
    }),
    getAvailableProgressions,
  };
}
