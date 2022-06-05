import { BaseTonalExercise, TonalExerciseSettings } from './BaseTonalExercise';
import { NoteType } from '../../../utility/music/notes/NoteType';
import * as _ from 'lodash';
import { Exercise } from '../../../Exercise';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from '../../../utility/music/notes/getNoteType';
import { Time } from 'tone/Tone/core/type/Units';

export type SolfegeNote = 'Do' | 'Re' | 'Me' | 'Mi' | 'Fa' | 'Sol' | 'Le' | 'La' | 'Te' | 'Ti';

export type BaseMelodicDictationExerciseSettings = TonalExerciseSettings<SolfegeNote>;

export const solfegeNotesInC: { solfege: SolfegeNote, note: NoteType }[] = [
  {
    note: 'C',
    solfege: 'Do',
  },
  {
    note: 'D',
    solfege: 'Re',
  },
  {
    note: 'D#', // using sharps to avoid ambiguity even when musically incorrect
    solfege: 'Me',
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
    note: 'G#',
    solfege: 'Le',
  },
  {
    note: 'A#',
    solfege: 'Te',
  },
  {
    note: 'B',
    solfege: 'Ti',
  },
]
export const noteInCToSolfege: { [note in NoteType]?: SolfegeNote } = _.mapValues(_.keyBy(solfegeNotesInC, 'note'), 'solfege');
export const solfegeToNoteInC: { [note in SolfegeNote]?: NoteType } = _.mapValues(_.keyBy(solfegeNotesInC, 'solfege'), 'note');

export interface IMelodicQuestion extends Omit<Exercise.NotesQuestion<SolfegeNote>, 'segments'> {
  segments: Note[],
}

export abstract class BaseMelodicDictationExercise<GSettings extends BaseMelodicDictationExerciseSettings> extends BaseTonalExercise<SolfegeNote, GSettings> {
  readonly noteDuration: Time = '2n';
  abstract getMelodicQuestionInC(): IMelodicQuestion;

  override getQuestionInC(): Exclude<Exercise.NotesQuestion<SolfegeNote>, 'cadence'> {
    const melodicQuestionInC: IMelodicQuestion = this.getMelodicQuestionInC();
    const question: Exercise.Question<SolfegeNote> = {
      ..._.omit(melodicQuestionInC, 'segments'),
      segments: melodicQuestionInC.segments.map(randomQuestionInC => ({
        rightAnswer: noteInCToSolfege[getNoteType(randomQuestionInC)]!,
        partToPlay: [{
          notes: randomQuestionInC,
          duration: this.noteDuration,
        }],
      })),
    }

    if (melodicQuestionInC.afterCorrectAnswer) {
      question.afterCorrectAnswer = melodicQuestionInC.afterCorrectAnswer;
    }

    return question;
  }

  protected _getAnswersListInC(): Exercise.AnswerList<SolfegeNote> {
    return {
      rows: [
        [
          {
            answer: null,
            space: 0.58
          },
          null, // Ra (to be added in the future to support more modes)
          {
            answer: 'Me',
            playOnClick: 'Eb4',
          },
          null,
          null, // Fi / Se (to be added in the future to support more modes)
          {
            answer: 'Le',
            playOnClick: 'Ab4',
          },
          {
            answer: 'Te',
            playOnClick: 'Bb4',
          },
          {
            answer: null,
            space: 0.58,
          },
          null,
        ],
        [
          {
            answer: 'Do',
            playOnClick: 'C4',
          },
          {
            answer: 'Re',
            playOnClick: 'D4',
          },
          {
            answer: 'Mi',
            playOnClick: 'E4',
          },
          {
            answer: 'Fa',
            playOnClick: 'F4',
          },
          {
            answer: 'Sol',
            playOnClick: 'G4',
          },
          {
            answer: 'La',
            playOnClick: 'A4',
          },
          {
            answer: 'Ti',
            playOnClick: 'B4',
          },
          {
            answer: 'Do',
            playOnClick: 'C5',
          },
        ],
      ],
    }
  }
}
