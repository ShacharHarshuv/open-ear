import { TitleCasePipe } from '@angular/common';
import * as _ from 'lodash';
import { isAcceptableChordAnalysis } from 'src/app/exercise/utility/music/harmony/isAcceptableChordAnalysis';
import { NoteEvent } from '../../../services/player.service';
import { DeepReadonly } from '../../../shared/ts-utility';
import Exercise from '../../exercise-logic';
import { Mode, RomanNumeralChordSymbol } from '../../utility';
import {
  IV_V_I_CADENCE_IN_C,
  iv_V_i_CADENCE_IN_C,
} from '../../utility/music/chords';
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
import { getIncludedQuestions } from './getIncludedQuestions';
import { selectQuestion } from './selectQuestion';
import { YouTubeSongQuestion, getId } from './songQuestions';

export interface ChordsInRealSongsSettings
  extends AnalyzeBySettings,
    AcceptEquivalentChordSettings {
  includedChords: RomanNumeralChordSymbol[];
  learnProgressions: boolean;
}

export function chordsInRealSongsExercise() {
  function getQuestionFromProgression(
    progression: DeepReadonly<YouTubeSongQuestion>,
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
      // blackListPlatform: 'ios', // currently, this exercise is not working on ios
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
        // todo: in the future, it's better that learn mode will use this custom algorithm automatically
        {
          key: 'learnProgressions',
          info: 'Experimental mode that optimizes learning of progressions in real songs with a space repetition algorithm. <b>Important!</b> If using this, turn "Learn Mode" off, as it will conflict with this',
          descriptor: {
            label: 'Learn Progressions',
            controlType: 'checkbox',
          },
        },
      ],
      defaultSettings: {
        includedChords: ['I', 'IV', 'V', 'vi'],
        tonicForAnalyzing: 'major',
        acceptEquivalentChord: true,
        learnProgressions: false,
      },
      answerList(
        settings: ChordsInRealSongsSettings,
      ): Exercise.AnswerList<RomanNumeralChordSymbol> {
        const progressionsList = getIncludedQuestions(settings);
        const includedAnswers = _.uniq(
          _.flatMap(
            progressionsList,
            (progression: YouTubeSongQuestion): RomanNumeralChordSymbol[] =>
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
        const progression = selectQuestion(settings, questionsToExclude);

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
        const availableQuestions = getIncludedQuestions(settings);
        const progression = _.find(
          availableQuestions,
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
  };
}
