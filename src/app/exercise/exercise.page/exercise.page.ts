import { Component } from '@angular/core';
import { ExerciseStateService } from '../services/exercise-state.service';
import { ModalController } from '@ionic/angular';
import {
  ExerciseSettingsPage,
  ExerciseSettingsData
} from './components/exercise-settings.page/exercise-settings.page';

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
  wrongAnswer: string | null = null;
  rightAnswer: string | null = null;

  get isQuestionCompleted(): boolean {
    return !!this.state.currentAnswers[this.state.currentAnswers.length - 1].answer;
  }

  get correctAnswersPercentage(): number {
    if (!this.state.totalQuestions) {
      return 0;
    }
    return (this.state.totalCorrectAnswers / this.state.totalQuestions) * 100;
  }

  constructor(
    public state: ExerciseStateService,
    private _modalController: ModalController,
  ) {
    state.nextQuestion();
  }

  onAnswer(answer: string): void {
    if (this.isQuestionCompleted) {
      // TODO(OE-14) - play the clicked answer
      return;
    }
    const isRight: boolean = this.state.answer(answer);
    if (isRight) {
      this.rightAnswer = answer;
      setTimeout(() => {
        this.rightAnswer = null;
      }, 0);
    } else {
      this.wrongAnswer = answer;
      setTimeout(() => {
        this.wrongAnswer = null;
      }, 0);
    }
  }

  nextQuestion(): Promise<void> {
    this.state.nextQuestion();
    if (this.state.settings.playCadence === 'ONLY_ON_REPEAT') {
      return this.state.playCurrentQuestion();
    } else {
      return this.state.playCurrentCadenceAndQuestion();
    }
  }

  async editSettings(): Promise<void> {
    const modal = await this._modalController.create({
      component: ExerciseSettingsPage,
      componentProps: {
        exerciseName: this.state.name,
        currentSettings: this.state.settings,
      }
    });
    await modal.present();
    const data: ExerciseSettingsData = (await modal.onDidDismiss()).data;
    this.state.settings = data.settings;
  }
}
