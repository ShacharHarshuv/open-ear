import { Component, inject, signal, computed } from '@angular/core';
import { ExerciseStateService } from './state/exercise-state.service';
import { ModalController, AlertController, IonicModule } from '@ionic/angular';
import { ExerciseSettingsPage } from './components/exercise-settings.page/exercise-settings.page';
import * as _ from 'lodash';
import { ExerciseExplanationService } from './state/exercise-explanation.service';
import Exercise, {
  SettingsControlDescriptor,
  SettingValueType,
} from '../exercise-logic';
import { BaseComponent } from '../../shared/ts-utility';
import { BdcWalkService, BdcWalkModule } from 'bdc-walkthrough';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { getCurrentAnswersLayout } from './utility/getCurrentAnswersLayout';
import { AnswerIndicationComponent } from './components/answer-indication/answer-indication.component';
import { CommonModule } from '@angular/common';
import { PureFunctionPipe } from '../../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import { ContentPaddingDirective } from '../../shared/components/shared-components/content-padding.directive';
import { AnswersLayoutModule } from './components/answers-layout/answers-layout.module';
import { AnswerButtonComponent } from './components/answer-button/answer-button.component';
import { MultiAnswerButtonComponent } from './components/multi-answer-button/multi-answer-button.component';
import { ExerciseToastersDirective } from './components/exercise-toasters.directive';
import AnswerConfig = Exercise.AnswerConfig;
import { GlobalExerciseSettings } from '../utility';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  providers: [ExerciseStateService, ExerciseExplanationService],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    BdcWalkModule,
    DragDropModule,
    AnswersLayoutModule,
    AnswerIndicationComponent,
    PureFunctionPipe,
    ContentPaddingDirective,
    AnswerButtonComponent,
    MultiAnswerButtonComponent,
  ],
  hostDirectives: [ExerciseToastersDirective],
})
export class ExercisePage extends BaseComponent {
  private readonly _modalController = inject(ModalController);
  private readonly _alertController = inject(AlertController);
  private readonly _bdcWalkService = inject(BdcWalkService);
  public readonly state = inject(ExerciseStateService);
  public readonly exerciseExplanation = inject(ExerciseExplanationService);

  private _hideMessage = inject(ExerciseToastersDirective).hideMessage;
  private _developerModeActivationCount: number = 0;

  private readonly _wrongAnswers = signal<string[]>([]);
  readonly wrongAnswers = this._wrongAnswers.asReadonly();
  private readonly _rightAnswer = signal<string | null>(null);
  readonly rightAnswer = this._rightAnswer.asReadonly();

  readonly correctAnswersPercentage = computed(() => {
    if (!this.state.totalQuestions()) {
      return 0;
    }
    return (
      (this.state.totalCorrectAnswers() / this.state.totalQuestions()) * 100
    );
  });

  constructor() {
    super();
    this._init();
  }

  onAnswerClick(answerConfig: AnswerConfig<string>): void {
    if (this.state.isQuestionCompleted) {
      this.state.playAnswer(answerConfig);
      return;
    }
    const answer: string | null = answerConfig.answer;

    if (!answer) {
      throw new Error(`Clicked answer is ${answer}`);
    }
    const isRight: boolean = this.state.answer(answer);
    if (isRight) {
      this._rightAnswer.set(answer);
      this._wrongAnswers.set([]);
    } else {
      this._wrongAnswers.mutate((wrongAnswers) => wrongAnswers.push(answer));
    }
    setTimeout(() => {
      if (this.state.globalSettings().revealAnswerAfterFirstMistake) {
        this._wrongAnswers.set([]);
      }
      this._rightAnswer.set(null);
    }, 100);
  }

  async editSettings(): Promise<void> {
    this._bdcWalkService.setTaskCompleted('taskEditSettings', true);
    const answerList = this.state.answerList();
    const allAvailableAnswers: string[] =
      typeof answerList === 'object' ? _.flatMap(answerList) : answerList;

    const props: {
      exerciseName: string;
      currentGlobalSettings: GlobalExerciseSettings;
      exerciseSettingsDescriptorInput: SettingsControlDescriptor[];
      currentExerciseSettings: { [key: string]: SettingValueType };
      allAvailableAnswers: string[];
    } = {
      exerciseName: this.state.name,
      currentGlobalSettings: this.state.globalSettings(),
      exerciseSettingsDescriptorInput: this.state.exerciseSettingsDescriptor, // must be before currentExerciseSettings
      currentExerciseSettings: this.state.exerciseSettings,
      allAvailableAnswers: allAvailableAnswers,
    };
    const modal = await this._modalController.create({
      component: ExerciseSettingsPage,
      componentProps: props,
    });
    this._hideMessage.set(true);
    await modal.present();
    await this.state.stop();
    const data = (await modal.onDidDismiss()).data;
    this._hideMessage.set(false);
    this.state.updateSettings(data);
  }

  private async _init(): Promise<void> {
    await this.exerciseExplanation.init();
    this._bdcWalkService.setTaskCompleted('taskViewExplanation', true);
    await this.state.init();
  }

  async resetStatistics(): Promise<void> {
    const alert: HTMLIonAlertElement = await this._alertController.create({
      header: 'Reset statistics',
      message: 'Are you sure you want to reset statistics?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset',
          role: 'reset',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'reset') {
      this.state.resetStatistics();
    }
  }

  async onTitleClick(): Promise<void> {
    // if first click in sequence
    if (this._developerModeActivationCount === 0) {
      setTimeout(() => {
        this._developerModeActivationCount = 0;
      }, 1e3);
    }

    if (this._developerModeActivationCount >= 3) {
      console.log();
      const alert = await this._alertController.create({
        message: `<pre>${JSON.stringify(this.state.lastPlayed, null, 2)}</pre>`,
      });
      await alert.present();
      this._developerModeActivationCount = 0;
    } else {
      this._developerModeActivationCount++;
    }
  }

  readonly getCurrentAnswersLayout = getCurrentAnswersLayout;

  onDragDropped(dragDropEvent: CdkDragDrop<number | undefined>): void {
    const answerIndex: number | undefined = dragDropEvent.container.data;
    if (_.isNil(answerIndex)) {
      return;
    }
    const answerConfig: AnswerConfig<string> = dragDropEvent.item.data;
    if (_.isNil(answerConfig.answer)) {
      return;
    }
    this.state.answer(answerConfig.answer, answerIndex);
  }
}
