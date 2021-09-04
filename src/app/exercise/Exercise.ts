import { NoteEvent } from '../services/player.service';
import { NoteNumberOrName } from './utility/music/notes/NoteNumberOrName';

export namespace Exercise {
  export interface Question {
    rightAnswer: string;
    partToPlay: NoteEvent[] | NoteNumberOrName | NoteNumberOrName[];
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
