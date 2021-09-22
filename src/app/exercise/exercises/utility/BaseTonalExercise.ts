import {
  Key,
  randomFromList
} from '../../utility';
import { Exercise, } from '../../Exercise';
import { transpose } from '../../utility/music/transpose';
import { getDistanceOfKeys } from '../../utility/music/keys/getDistanceOfKeys';
import { IV_V_I_CADENCE_IN_C } from '../../utility/music/chords';
import {
  BaseCommonSettingsExercise,
  BaseCommonSettingsExerciseSettings
} from './BaseCommonSettingsExercise';

export abstract class BaseTonalExercise<GAnswer extends string = string, GSettings extends BaseCommonSettingsExerciseSettings<GAnswer> = BaseCommonSettingsExerciseSettings<GAnswer>> extends BaseCommonSettingsExercise<GAnswer, GSettings> {
  readonly key: Key = randomFromList(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']);
  abstract getQuestionInC(): Exclude<Exercise.Question<GAnswer>, 'cadence'>;

  getQuestion(): Exercise.Question<GAnswer> {
    const randomQuestionInC: Exclude<Exercise.Question<GAnswer>, 'cadence'> = this.getQuestionInC();
    return {
      segments: randomQuestionInC.segments.map(segment => ({
        rightAnswer: segment.rightAnswer,
        partToPlay: transpose(segment.partToPlay, getDistanceOfKeys(this.key, 'C')),
      })),
      cadence: transpose(IV_V_I_CADENCE_IN_C, getDistanceOfKeys(this.key, 'C')),
      afterCorrectAnswer: randomQuestionInC.afterCorrectAnswer?.map(afterCorrectAnswerSegment => ({
        answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
        partToPlay: transpose(afterCorrectAnswerSegment.partToPlay, getDistanceOfKeys(this.key, 'C')),
      }))
    }
  }
}
