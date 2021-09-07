import { NoteEvent } from '../services/player.service';
import { NoteNumberOrName } from './utility/music/notes/NoteNumberOrName';
import { OneOrMany } from '../shared/ts-utility/toArray';
import { Note } from 'tone/Tone/core/type/NoteUnits';

export namespace Exercise {
  export interface Question {
    /**
     * Use more then one segment for serial exercises
     * Example: in a melodic dictation each note is a segment, it has its own answer
     * */
    segments: {
      rightAnswer: string;
      partToPlay: NoteEvent[] | OneOrMany<Note>;
    }[],
    /**
     * To be played to give the listener a context of the part,
     * Then the part can be played separately or with the cadence
     * */
    cadence?: NoteEvent[] | OneOrMany<Note>;
  }

  export type Answer<GAnswer extends string = string> = GAnswer;

  export interface AnswersLayout<GAnswer extends string = string> {
    rows: Answer<GAnswer>[][];
  }

  export type AnswerList<GAnswer extends string = string> = Answer<GAnswer>[] | AnswersLayout<GAnswer>;

  export interface IExercise<GAnswer extends string = string> {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question;
  }
}
