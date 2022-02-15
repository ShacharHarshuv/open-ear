import { Component } from '@angular/core';
import { ExerciseStateService } from './state/exercise-state.service';
import { ModalController } from '@ionic/angular';
import { ExerciseSettingsPage } from './components/exercise-settings.page/exercise-settings.page';
import * as _ from 'lodash';
import { ExerciseExplanationService } from './state/exercise-explanation.service';
import { Exercise } from '../Exercise';
import AnswerConfig = Exercise.AnswerConfig;

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  providers: [
    ExerciseStateService,
    ExerciseExplanationService,
  ]
})
export class ExercisePage {
  readonly isAutoLayout: boolean = Array.isArray(this.state.answerList);
  wrongAnswers: string[] = [];
  rightAnswer: string | null = null;

  get isQuestionCompleted(): boolean {
    return !!this.state.currentAnswers[this.state.currentAnswers.length - 1]?.answer;
  }

  get correctAnswersPercentage(): number {
    if (!this.state.totalQuestions) {
      return 0;
    }
    return (this.state.totalCorrectAnswers / this.state.totalQuestions) * 100;
  }

  constructor(
    public state: ExerciseStateService,
    public exerciseExplanation: ExerciseExplanationService,
    private _modalController: ModalController,
  ) {
    this._init();
  }

  onAnswerClick(answerConfig: AnswerConfig<string>): void {
    if (this.isQuestionCompleted) {
      this.state.playAnswer(answerConfig);
      return;
    }
    const answer: string | null = answerConfig.answer;
    if (!answer) {
      throw new Error(`Clicked answer is ${answer}`)
    }
    const isRight: boolean = this.state.answer(answer);
    if (isRight) {
      this.rightAnswer = answer;
      setTimeout(() => {
        this.rightAnswer = null;
      }, 100);
      this.wrongAnswers = [];
    } else {
      this.wrongAnswers.push(answer);
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

  private async _init(): Promise<void> {
    await this.exerciseExplanation.init();
    await this.state.init()
  }

  readonly normalizeAnswerLayoutCellConfig = Exercise.normalizeAnswerConfig;
}
