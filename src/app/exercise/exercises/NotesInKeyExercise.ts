import { Exercise, } from '../Exercise';
import {
  NotesRange,
  randomFromList
} from '../utility';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../utility/music/notes/getNoteType';
import { BaseTonalExercise, } from './BaseTonalExercise';
import { NoteType } from '../utility/music/notes/NoteType';
import * as _ from 'lodash';
import { getNoteOctave } from '../utility/music/notes/getNoteOctave';
import { toNoteTypeNumber } from '../utility/music/notes/toNoteTypeNumber';
import { noteTypeToNote } from '../utility/music/notes/noteTypeToNote';
import AnswerList = Exercise.AnswerList;

export type SolfegeNote = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Ti';

const CMajor: { solfege: SolfegeNote, note: NoteType }[] = [
  {
    note: 'C',
    solfege: 'Do',
  },
  {
    note: 'D',
    solfege: 'Re',
  },
  {
    note: 'E',
    solfege: 'Mi',
  },
  {
    note: 'E',
    solfege: 'Mi',
  },
  {
    note: 'F',
    solfege: 'Fa',
  },
  {
    note: 'G',
    solfege: 'Sol',
  },
  {
    note: 'A',
    solfege: 'La',
  },
  {
    note: 'B',
    solfege: 'Ti',
  },
]
const noteInCToSolfege: { [note in NoteType]?: SolfegeNote } = _.mapValues(_.keyBy(CMajor, 'note'), 'solfege');
const solfegeToNoteInC: { [note in SolfegeNote]?: NoteType } = _.mapValues(_.keyBy(CMajor, 'solfege'), 'note');

export class NotesInKeyExercise extends BaseTonalExercise<SolfegeNote> {
  readonly description: string = `Recognise notes based on their tonal context in a key`;
  readonly name: string = `Notes in Key`;
  readonly rangeForKeyOfC = new NotesRange('G2', 'E4');
  readonly questionOptionsInC: { answer: SolfegeNote; question: Note }[] = this._getQuestionOptionsInC();
  protected _settings = {};

  getAnswerList(): AnswerList<SolfegeNote> {
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

  getQuestionInC(): Exclude<Exercise.Question<SolfegeNote>, 'cadence'> {
    const randomQuestionInC: { answer: SolfegeNote; question: Note } = randomFromList(this.questionOptionsInC);
    // calculation resolution
    const noteOctave: number = getNoteOctave(randomQuestionInC.question);
    const noteType: NoteType = getNoteType(randomQuestionInC.question);
    let resolution: Note[];
    if (toNoteTypeNumber(noteType) < toNoteTypeNumber('G')) {
      const range = new NotesRange(noteTypeToNote('C', noteOctave), randomQuestionInC.question);
      resolution = range.getAllNotes('C').reverse();
    } else {
      const range = new NotesRange(randomQuestionInC.question, noteTypeToNote('C', noteOctave + 1));
      resolution = range.getAllNotes('C');
    }

    return {
      segments: [
        {
          rightAnswer: randomQuestionInC.answer,
          partToPlay: [{
            notes: randomQuestionInC.question,
            duration: '2n',
          }],
        }
      ],
      afterCorrectAnswer: resolution.map((note, index) => ({
        partToPlay: [{
          notes: note,
          duration: index === 0 ? '4n' : index === resolution.length - 1 ? '2n' : '8n',
        }],
        answerToHighlight: noteInCToSolfege[getNoteType(note)],
      })),
    }
  }

  private _getQuestionOptionsInC(): { answer: SolfegeNote; question: Note }[] {
    return this.rangeForKeyOfC.getAllNotes('C').map((note: Note): { answer: SolfegeNote; question: Note } => {
      return {
        question: note,
        answer: noteInCToSolfege[getNoteType(note)]!,
      }
    });
  }
}
