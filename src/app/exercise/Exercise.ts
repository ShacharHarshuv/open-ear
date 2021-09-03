import { INoteEvent } from '../services/player.service';

export namespace Exercise {
  export interface Question {
    rightAnswer: string;
    partToPlay: INoteEvent[];
  }

  export interface AnswersLayout {
    rows: string[][];
  }

  export type AnswerList = string[] | AnswersLayout;

  export interface IExercise {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    getAnswerList(): AnswerList;

    getQuestion(): Question;
  }
}
