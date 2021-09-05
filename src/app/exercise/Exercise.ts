import { NoteEvent } from '../services/player.service';
import { NoteNumberOrName } from './utility/music/notes/NoteNumberOrName';
import { OneOrMany } from './utility/js-utility/toArray';

export namespace Exercise {
  export interface Question {
    rightAnswer: string;
    partToPlay: NoteEvent[] | OneOrMany<NoteNumberOrName>;
    /**
     * To be played to give the listener a context of the part,
     * Then the part can be played separately or with the cadence
     * */
    cadence?: NoteEvent[] | OneOrMany<NoteNumberOrName>;
  }

  export interface AnswersLayout<GAnswer extends string = string> {
    rows: GAnswer[][];
  }

  export type AnswerList<GAnswer extends string = string> = GAnswer[] | AnswersLayout<GAnswer>;

  export interface IExercise<GAnswer extends string = string> {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    getAnswerList(): AnswerList<GAnswer>;

    getQuestion(): Question;
  }
}
