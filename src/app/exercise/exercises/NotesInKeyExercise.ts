import {
  Exercise,
} from '../Exercise';
import { BaseExercise } from './BaseExercise';
import {
  Key,
  generateSteadyMonophonicMelody,
  NotesRange
} from '../utility';
import AnswerList = Exercise.AnswerList;

export class NotesInKeyExercise extends BaseExercise {
  readonly description: string = `Recognise notes based on their tonal context in a key`;
  readonly name: string = `Notes in Key`;
  readonly key: Key = 'C';
  readonly rangeForKeyOfC = new NotesRange('G3', 'E5');

  getAnswerList(): AnswerList {
    return {
      rows: [
        [
          'Do',
          'Re',
          'Mi',
          'Fa',
          'Sol',
          'La',
          'Ti',
          'Do',
        ],
      ],
    }
  }

  getQuestion(): Exercise.Question {
    return {
      rightAnswer: 'Do',
      partToPlay: generateSteadyMonophonicMelody('C4'),
    };
  }

}
