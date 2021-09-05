import { Component } from '@angular/core';
import { ExerciseStateService } from '../services/exercise-state.service';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  providers: [
    ExerciseStateService,
  ]
})
export class ExercisePage {
  readonly isAutoLayout: boolean = Array.isArray(this.state.answerList);
  wrongAnswers: string[] = [];
  rightAnswer: string | null = null;

  constructor(
    public state: ExerciseStateService,
  ) {
    state.playCurrentCadenceAndQuestion();
  }

  onAnswer(answer: string): void {
    if (!!this.rightAnswer) {
      return; // todo: play what would be played if "answer" was the right answer.
    }
    const isRight: boolean = this.state.answer(answer);
    if (isRight) {
      this.rightAnswer = answer;
    } else {
      this.wrongAnswers.push(answer);
    }
  }

  nextQuestion(): Promise<void> {
    this.wrongAnswers = [];
    this.rightAnswer = null;
    this.state.nextQuestion();
    return this.state.playCurrentQuestion();
  }
}
