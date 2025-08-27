import { computed, signal, untracked } from '@angular/core';
import * as _ from 'lodash';
import { first } from 'lodash';
import {
  Exercise,
  Question,
  filterIncludedAnswers,
  mapAnswerList,
} from '../../exercise-logic';
import { fsrsExercise } from '../../exercise.page/state/fsrs-exercise';
import {
  DeepReadonly,
  Mode,
  RomanNumeralChordSymbol,
  isMajor,
  modeName,
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
  AcceptEquivalentChordSettings,
  acceptableChordAnalysisOptions,
  flexibleChordChoiceSettings,
} from '../utility/settings/acceptEquivalentChordsSettings';
import {
  ModalAnalysisSettings,
  modalAnalysis,
} from '../utility/settings/modal-analysis';
import { getIncludedSegments } from './getIncludedQuestions';
import { indexQuestionsByProgression } from './indexQuestionsByProgression';
import { YouTubeSongQuestion, getId } from './songQuestions';

type LearnProgressionsSettings = {
  learnProgressions: boolean;
};

export type ChordsInRealSongsSettings = ModalAnalysisSettings &
  AcceptEquivalentChordSettings &
  LearnProgressionsSettings & {
    includedChords: RomanNumeralChordSymbol[];
  };

function getQuestionFromProgression(
  progression: DeepReadonly<YouTubeSongQuestion>,
  settings: AcceptEquivalentChordSettings & ModalAnalysisSettings,
): Question<RomanNumeralChordSymbol> {
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
    cadence: (() => {
      const cadenceInC = isMajor(progression.mode ?? Mode.Ionian)
        ? IV_V_I_CADENCE_IN_C
        : iv_V_i_CADENCE_IN_C;
      return transpose(cadenceInC, getDistanceOfKeys(progression.tonic, 'C'));
    })(),
    info: `${progression.name ?? ''}${
      progression.artist ? ` by ${progression.artist} ` : ''
    }(${progression.tonic} ${modeName[progression.mode]})`, // todo: add "1 = ?"
  };
}

const id = 'chordsInRealSongs';

const learnModeLastProgressionIndex = signal(1);

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
      ...modalAnalysis.controls,
      ...flexibleChordChoiceSettings.controls,
      // todo: in the future, it's better that learn mode will use this custom algorithm automatically
      {
        key: 'learnProgressions',
        info: 'Experimental mode that introduces songs in progressions of difficulties and adjusts to user level based on performance. <b>Important!</b> If using this, turn "Learn Mode" off, as it will conflict with this',
        descriptor: {
          label: 'Learn Progressions',
          controlType: 'checkbox',
        },
      },
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
        show: (settings: ChordsInRealSongsSettings) =>
          !settings.learnProgressions,
      },
    ],
    defaults: {
      includedChords: ['I', 'IV', 'V', 'vi'],
      learnProgressions: false,
      ...modalAnalysis.defaults,
      ...flexibleChordChoiceSettings.defaults,
    },
  },
  logic: (settings) => {
    console.log('settings', settings);

    const availableSegments = getIncludedSegments(settings);
    console.log('availableSegments', availableSegments);

    const uniqueProgressions = indexQuestionsByProgression(
      availableSegments,
      settings,
    );
    console.log('availableSegments', availableSegments);

    const progressionKeys = Array.from(uniqueProgressions.keys());
    console.log('uniqueProgressions', uniqueProgressions);

    const fsrsLogic = fsrsExercise(id + ':progression-mode', {
      getQuestion: (
        // settings: ChordsInRealSongsSettings,
        questionsToExclude?: string[],
      ) => {
        const questionsToExcludeSet = new Set(questionsToExclude);
        const progressionKeyIndex = progressionKeys.findIndex(
          (progKey) => !questionsToExcludeSet.has(progKey),
        );
        if (progressionKeyIndex === -1) {
          throw new Error('No more progressions!'); // todo: we should handle this somehow, perhaps even inside fsrs itself
        }

        if (progressionKeyIndex > learnModeLastProgressionIndex()) {
          learnModeLastProgressionIndex.set(progressionKeyIndex);
        }
        const progressionKey = progressionKeys[progressionKeyIndex];

        const randomSegment = randomFromList(
          uniqueProgressions.get(progressionKey)!,
        );
        const question = getQuestionFromProgression(randomSegment, settings);
        return {
          ...question,
          id: progressionKey,
        };
      },
      getQuestionById(id) {
        const progression = uniqueProgressions.get(id);
        if (!progression) {
          // todo: this seem to happen with progression whose analyzed 1 is moved based on the settings, even if we didn't change it
          // Theory: the bug happens during write
          throw new Error(`No progression found! (id: ${id})`);
        }
        return getQuestionFromProgression(
          randomFromList(progression),
          settings,
        );
      },
    });

    untracked(() => {
      fsrsLogic.cardsCollections.savedQuestions.forEach(({ question }) => {
        const idx = progressionKeys.findIndex((key) => key === question.id);
        if (idx > learnModeLastProgressionIndex()) {
          learnModeLastProgressionIndex.set(idx);
        }
      });
    });

    const normalModeLogic = {
      getQuestion(
        questionsToExclude?: string[],
      ): Question<RomanNumeralChordSymbol> {
        const questionsToExcludeSet = new Set(questionsToExclude);

        const availableQuestions = getIncludedSegments(settings).filter(
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

        return getQuestionFromProgression(progression, settings);
      },
      getQuestionById(
        questionId: string,
      ): Question<RomanNumeralChordSymbol> | undefined {
        const availableQuestions = getIncludedSegments(settings);
        const progression = _.find(
          availableQuestions,
          (progression) => getId(progression) === questionId,
        );

        return progression
          ? getQuestionFromProgression(progression, settings)
          : undefined;
      },
    };

    const logic = () => {
      if (settings.learnProgressions) {
        return fsrsLogic;
      }

      return normalModeLogic;
    };

    return {
      answerList: computed(() => {
        const lastProgressionIndex = settings.learnProgressions
          ? learnModeLastProgressionIndex()
          : progressionKeys.length;

        const relevantProgressionKeys = progressionKeys.slice(
          0,
          lastProgressionIndex + 1,
        );
        const relevantSegments = _.flatMap(
          relevantProgressionKeys,
          (progressionKey) => uniqueProgressions.get(progressionKey)!,
        );

        const includedChords = _.uniq(
          _.flatMap(
            relevantSegments,
            (progression): RomanNumeralChordSymbol[] =>
              progression.chords.map(
                (chordDescriptor) => chordDescriptor.chord,
              ),
          ),
        );

        const includedAnswers = filterIncludedAnswers(
          allRomanNumeralAnswerList,
          includedChords,
        );
        return mapAnswerList(includedAnswers, (answerConfig) => {
          return {
            playOnClick: null, // todo(#316): restore support by transposing based on the song
            ...answerConfig,
          };
        });
      }),
      ...logic(),
      handleFinishedAnswering(numberOfMistakes) {
        if (settings.learnProgressions) {
          fsrsLogic.handleFinishedAnswering(numberOfMistakes);
        }
      },
      reset() {
        if (settings.learnProgressions) {
          fsrsLogic.reset();
        }
        learnModeLastProgressionIndex.set(0);
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
