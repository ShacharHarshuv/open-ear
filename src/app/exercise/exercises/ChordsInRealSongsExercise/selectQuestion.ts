import { DeepReadonly } from '../../../shared/ts-utility';
import { ChordsInRealSongsSettings } from './chordsInRealSongsExercise';
import { YouTubeSongQuestion } from './songQuestions';

export function selectQuestion(
  settings: ChordsInRealSongsSettings,
  questionsToExclude: string[] | undefined,
): DeepReadonly<YouTubeSongQuestion> | undefined {}
