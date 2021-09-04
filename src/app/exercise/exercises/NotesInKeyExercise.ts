import { Exercise, } from '../Exercise';
import { BaseExercise } from './BaseExercise';
import {
  Key,
  NotesRange,
  randomFromList
} from '../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { transpose } from '../utility/transpose';
import { getDistanceOfKeys } from '../utility/getDistanceOfKeys';
import AnswerList = Exercise.AnswerList;
import { noteToNoteType } from '../utility/noteToNoteType';

export type NoteInKey = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Ti';

export class NotesInKeyExercise extends BaseExercise<NoteInKey> {
  readonly description: string = `Recognise notes based on their tonal context in a key`;
  readonly name: string = `Notes in Key`;
  readonly key: Key = 'C'; // todo: in the future we will randomize it
  readonly rangeForKeyOfC = new NotesRange('G2', 'E4');
  readonly questionOptionsInC: { answer: NoteInKey; question: Note }[] = this._getQuestionOptionsInC();

  getAnswerList(): AnswerList<NoteInKey> {
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
    const randomQuestionInC: { answer: NoteInKey; question: Note } = randomFromList(this.questionOptionsInC);
    const questionTransposedToKey = transpose(randomQuestionInC.question, getDistanceOfKeys(this.key, 'C'));
    return {
      rightAnswer: randomQuestionInC.answer,
      partToPlay: questionTransposedToKey,
    }
  }

  private _getQuestionOptionsInC(): { answer: NoteInKey; question: Note }[] {
    return this.rangeForKeyOfC.getAllNotes('C').map((note: Note): { answer: NoteInKey; question: Note } => {
      return {
        question: note,
        answer: {
          C: 'Do',
          D: 'Re',
          E: 'Mi',
          F: 'Fa',
          G: 'Sol',
          A: 'La',
          B: 'Ti',
        }[noteToNoteType(note)],
      }
    });
  }
}
