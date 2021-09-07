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
  wrongAnswers: string[] = [];
  rightAnswer: string | null = null;

  constructor(
    public state: ExerciseStateService,
    private _modalController: ModalController,
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
