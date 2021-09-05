import { Exercise, } from '../Exercise';
import { BaseExercise } from './BaseExercise';
import {
  Key,
  NotesRange,
  randomFromList
} from '../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { transpose } from '../utility/music/transpose';
import { getDistanceOfKeys } from '../utility/music/keys/getDistanceOfKeys';
import { getNoteType } from '../utility/music/notes/getNoteType';
import { IV_V_I_CADENCE_IN_C } from '../utility/music/chords';
import AnswerList = Exercise.AnswerList;
import {
  BaseTonalExercise,
} from './BaseTonalExercise';
import { NoteEvent } from '../../services/player.service';

export type NoteInKey = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Ti';

export class NotesInKeyExercise extends BaseTonalExercise<NoteInKey> {
  readonly description: string = `Recognise notes based on their tonal context in a key`;
  readonly name: string = `Notes in Key`;
  readonly rangeForKeyOfC = new NotesRange('G2', 'E4');
  readonly questionOptionsInC: { answer: NoteInKey; question: NoteEvent }[] = this._getQuestionOptionsInC();

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

  getQuestionInC(): Exclude<Exercise.Question, 'cadence'> {
    const randomQuestionInC: { answer: NoteInKey; question: NoteEvent } = randomFromList(this.questionOptionsInC);
    return {
      rightAnswer: randomQuestionInC.answer,
      partToPlay: [randomQuestionInC.question],
    }
  }

  private _getQuestionOptionsInC(): { answer: NoteInKey; question: NoteEvent }[] {
    return this.rangeForKeyOfC.getAllNotes('C').map((note: Note): { answer: NoteInKey; question: NoteEvent } => {
      return {
        question: {
          notes: note,
          duration: '2n',
        },
        answer: {
          C: 'Do',
          D: 'Re',
          E: 'Mi',
          F: 'Fa',
          G: 'Sol',
          A: 'La',
          B: 'Ti',
        }[getNoteType(note)],
      }
    });
  }
}
