import { BaseExercise } from './BaseExercise';
import { Key } from '../utility';
import { Exercise } from '../Exercise';
import { transpose } from '../utility/music/transpose';
import { getDistanceOfKeys } from '../utility/music/keys/getDistanceOfKeys';
import { IV_V_I_CADENCE_IN_C } from '../utility/music/chords';

export abstract class BaseTonalExercise<GAnswer extends string = string> extends BaseExercise<GAnswer> {
  readonly key: Key = /*randomFromList(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'])*/ 'Bb'; // todo
  abstract getQuestionInC(): Exclude<Exercise.Question, 'cadence'>;

  getQuestion(): Exercise.Question {
    const randomQuestionInC: Exclude<Exercise.Question, 'cadence'> = this.getQuestionInC();
    return {
      segments: randomQuestionInC.segments.map(segment => ({
        rightAnswer: segment.rightAnswer,
        partToPlay: transpose(segment.partToPlay, getDistanceOfKeys(this.key, 'C')),
      })),
      cadence: transpose(IV_V_I_CADENCE_IN_C, getDistanceOfKeys(this.key, 'C')),
    }
  }
}
