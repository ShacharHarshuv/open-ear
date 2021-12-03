import { Component } from '@angular/core';
import { ExerciseStateService } from '../services/exercise-state/exercise-state.service';
import { ModalController } from '@ionic/angular';
import { ExerciseSettingsPage } from './components/exercise-settings.page/exercise-settings.page';
import * as _ from 'lodash';
import {ExerciseExplanationPage} from "./components/exercise-help/exercise-explanation/exercise-explanation.page";

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
    state.playCurrentCadenceAndQuestion();
  }

  onAnswer(answer: string): void {
    if (this.isQuestionCompleted) {
      // TODO(OE-8) - play the clicked answer
      return;
    }
    const isRight: boolean = this.state.answer(answer);
    if (isRight) {
      this.rightAnswer = answer;
      setTimeout(() => {
        this.rightAnswer = null;
      }, 10);
      this.wrongAnswer = null;
    } else {
      this.wrongAnswer = answer;
    }
  }

  nextQuestion(): Promise<void> {
    this.state.nextQuestion();
    if (this.state.globalSettings.playCadence === 'ONLY_ON_REPEAT') {
      return this.state.playCurrentQuestion();
    } else {
      return this.state.playCurrentCadenceAndQuestion();
    }
  }

  async editSettings(): Promise<void> {
    const allAvailableAnswers: string[] = typeof this.state.answerList === 'object' ? _.flatMap(this.state.answerList) : this.state.answerList;
    const modal = await this._modalController.create({
      component: ExerciseSettingsPage,
      componentProps: {
        exerciseName: this.state.name,
        currentGlobalSettings: this.state.globalSettings,
        exerciseSettingsDescriptorInput: this.state.exerciseSettingsDescriptor, // must be before currentExerciseSettings
        currentExerciseSettings: this.state.exerciseSettings,
        allAvailableAnswers: allAvailableAnswers,
      }
    });
    await modal.present();
    this.state.updateSettings((await modal.onDidDismiss()).data);
  }

  async openHelp(): Promise<void> {
    const modal = await this._modalController.create({
      component: ExerciseExplanationPage,
      componentProps: {
        content: this.state.exerciseExplanation,
        exerciseName: this.state.name,
      }
    });
    await modal.present();
  }
}
