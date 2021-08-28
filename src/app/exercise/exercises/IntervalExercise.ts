import {IExercise } from '../IExercise';
import * as _ from 'lodash';

export class IntervalExercise implements IExercise {
  readonly id: string = _.uniqueId();
  readonly name: string = 'Interval Recognition';
  readonly description: string = 'Recognizing Intervals without context';
}
