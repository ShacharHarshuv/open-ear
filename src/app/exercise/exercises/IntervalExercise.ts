import * as _ from 'lodash';
import { Exercise } from '../Exercise';
import { generateSteadyMonophonicMelody } from '../utility';

export class IntervalExercise implements Exercise.IExercise {
  readonly id: string = _.uniqueId();
  readonly name: string = 'Interval Recognition';
  readonly description: string = 'Recognizing Intervals without context';

  getAnswerList(): string[] {
    return [
      'Minor 2nd',
      'Major 2nd',
      'Minor 3rd',
      'Major 3rd',
      'Perfect 4th',
      'Aug 4th',
      'Perfect 5th',
      'Minor 6th',
      'Major 6th',
      'Minor 7th',
      'Major 7th',
      'Octave',
    ];
  }

  getQuestion(): Exercise.Question {
    return {
      rightAnswer: 'Major 3rd',
      partToPlay: generateSteadyMonophonicMelody([
        'C4',
        'E4',
      ])
    }
  }
}
