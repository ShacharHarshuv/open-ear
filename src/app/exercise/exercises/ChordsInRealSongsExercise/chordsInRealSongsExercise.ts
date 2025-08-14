import { TitleCasePipe } from '@angular/common';
import * as _ from 'lodash';
import { first } from 'lodash';
import { NoteEvent } from 'src/app/services/player.service';
import {
  Exercise,
  Question,
  filterIncludedAnswers,
} from '../../exercise-logic';
import { fsrsExercise } from '../../exercise.page/state/fsrs-exercise';
import {
  DeepReadonly,
  Mode,
  RomanNumeralChordSymbol,
  randomFromList,
} from '../../utility';
import {
  IV_V_I_CADENCE_IN_C,
  iv_V_i_CADENCE_IN_C,
} from '../../utility/music/chords';
import { isAcceptableChordAnalysis } from '../../utility/music/harmony/isAcceptableChordAnalysis';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { transpose } from '../../utility/music/transpose';
import { allRomanNumeralAnswerList } from '../utility/exerciseAttributes/roman-analysis-chord-progression-exercise/roman-numeral-answer-list';
import {
  AnalyzeBySettings,
  analyzeBy,
} from '../utility/settings/AnalyzeBySettings';
import {
  AcceptEquivalentChordSettings,
  acceptableChordAnalysisOptions,
  flexibleChordChoiceSettings,
} from '../utility/settings/acceptEquivalentChordsSettings';
import { getIncludedSegments } from './getIncludedQuestions';
import { indexQuestionsByProgression } from './indexQuestionsByProgression';
import { YouTubeSongQuestion, getId } from './songQuestions';

type LearnProgressionsSettings = {
  learnProgressions: boolean;
};

export type ChordsInRealSongsSettings = AnalyzeBySettings &
  AcceptEquivalentChordSettings &
  LearnProgressionsSettings & {
    includedChords: RomanNumeralChordSymbol[];
  };

function getQuestionFromProgression(
  progression: DeepReadonly<YouTubeSongQuestion>,
  settings: AcceptEquivalentChordSettings,
): Question<RomanNumeralChordSymbol> {
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
        isAcceptableChordAnalysis(
          chordDesc.chord,
          answer,
          acceptableChordAnalysisOptions(settings),
        ),
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

const id = 'chordsInRealSongs';

export const chordsInRealSongsExercise: Exercise<
  RomanNumeralChordSymbol,
  ChordsInRealSongsSettings
> = {
  id,
  name: 'Chord Progressions In Real Songs',
  summary: 'Identify chord progressions in real songs, streamed from YouTube',
  blackListPlatform: 'ios', // currently, this exercise is not working on ios
  settingsConfig: {
    controls: [
      ...analyzeBy.controls,
      ...flexibleChordChoiceSettings.controls,
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
    defaults: {
      includedChords: ['I', 'IV', 'V', 'vi'],
      learnProgressions: false,
      ...analyzeBy.defaults,
      ...flexibleChordChoiceSettings.defaults,
    },
  },
  logic: (settings) => {
    const availableSegments = getIncludedSegments(settings());
    const uniqueProgressions = indexQuestionsByProgression(
      availableSegments,
      settings(),
    );
    console.log('uniqueProgressions', uniqueProgressions);

    const fsrsLogic = fsrsExercise(id + ':progression-mode', {
      getQuestion: (
        // settings: ChordsInRealSongsSettings,
        questionsToExclude?: string[],
      ) => {
        const questionsToExcludeSet = new Set(questionsToExclude);
        const progressionKey = Array.from(uniqueProgressions.keys()).find(
          (progKey) => !questionsToExcludeSet.has(progKey),
        );
        if (!progressionKey) {
          throw new Error('No more progressions!'); // todo: we should handle this somehow, perhaps even inside fsrs itself
        }
        const randomSegment = randomFromList(
          uniqueProgressions.get(progressionKey)!,
        );
        const question = getQuestionFromProgression(randomSegment, settings());
        return {
          ...question,
          id: progressionKey,
        };
      },
      getQuestionById(id) {
        const progression = uniqueProgressions.get(id);
        if (!progression) {
          throw new Error(`No progression found! (id: ${id})`);
        }
        return getQuestionFromProgression(
          randomFromList(progression),
          settings(),
        );
      },
    });

    const normalModeLogic = {
      getQuestion(
        questionsToExclude?: string[],
      ): Question<RomanNumeralChordSymbol> {
        const questionsToExcludeSet = new Set(questionsToExclude);

        const availableQuestions = getIncludedSegments(settings()).filter(
          (progression) => !questionsToExcludeSet.has(getId(progression)),
        );

        // when using "learn" mode, the questionsToExclude will be passed here. In this mode we want to learn the songs in order
        const progression = (questionsToExclude ? first : randomFromList)(
          availableQuestions,
        );

        if (!progression) {
          // todo: we might need to handle this eventually, because it's possible that there is indeed no more quesitons that are not in the "cards" (in learn mode)
          throw new Error(`No more progressions!`);
        }

        return getQuestionFromProgression(progression, settings());
      },
      getQuestionById(
        questionId: string,
      ): Question<RomanNumeralChordSymbol> | undefined {
        const availableQuestions = getIncludedSegments(settings());
        const progression = _.find(
          availableQuestions,
          (progression) => getId(progression) === questionId,
        );

        return progression
          ? getQuestionFromProgression(progression, settings())
          : undefined;
      },
    };

    const logic = () => {
      if (settings().learnProgressions) {
        return fsrsLogic;
      }

      return normalModeLogic;
    };

    return {
      answerList: () => {
        const progressionsList = getIncludedSegments(settings());
        const includedAnswers = _.uniq(
          _.flatMap(
            progressionsList,
            (progression: YouTubeSongQuestion): RomanNumeralChordSymbol[] =>
              progression.chords.map(
                (chordDescriptor) => chordDescriptor.chord,
              ),
          ),
        );
        return filterIncludedAnswers(
          allRomanNumeralAnswerList,
          includedAnswers,
        );
      },
      ...logic(),
      handleFinishedAnswering(numberOfMistakes) {
        if (settings().learnProgressions) {
          fsrsLogic.handleFinishedAnswering(numberOfMistakes);
        }
      },
      reset() {
        if (settings().learnProgressions) {
          fsrsLogic.reset();
        }
      },
    };
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
};
