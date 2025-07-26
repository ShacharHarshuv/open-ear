import { first } from 'lodash';
import { DeepReadonly, randomFromList } from '../../../shared/ts-utility';
import { ChordsInRealSongsSettings } from './chordsInRealSongsExercise';
import { getIncludedQuestions } from './getIncludedQuestions';
import { indexQuestionsByProgression } from './indexQuestionsByProgression';
import { YouTubeSongQuestion, getId } from './songQuestions';

export function selectQuestion(
  settings: ChordsInRealSongsSettings,
  questionsToExclude: string[] | undefined,
): DeepReadonly<YouTubeSongQuestion> | undefined {
  const questionsToExcludeSet = new Set(questionsToExclude);

  const availableQuestions = getIncludedQuestions(settings).filter(
    (progression) => !questionsToExcludeSet.has(getId(progression)),
  );

  console.log('available questions', availableQuestions);

  const uniqueProgressions = indexQuestionsByProgression(availableQuestions);

  console.log('unique questions', uniqueProgressions);

  console.log('# of questions to choose from', availableQuestions.length);

  // when using "learn" mode, the questionsToExclude will be passed here. In this mode we want to learn the songs in order
  return (questionsToExclude ? first : randomFromList)(availableQuestions);
}
