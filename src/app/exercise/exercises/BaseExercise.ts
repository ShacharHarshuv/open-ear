import { Exercise } from '../Exercise';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;

export abstract class BaseExercise<GAnswer extends string = string> implements Exercise.IExercise<GAnswer> {
  readonly id: string = _.uniqueId();
  abstract readonly description: string;
  abstract readonly name: string;

  abstract getAnswerList(): AnswerList<GAnswer>;

  abstract getQuestion(): Exercise.Question;
}
