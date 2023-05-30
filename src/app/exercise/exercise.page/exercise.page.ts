import { Component } from '@angular/core';
import { ExerciseStateService } from './state/exercise-state.service';
import {
  ModalController,
  AlertController,
  ToastController,
  IonicModule,
} from '@ionic/angular';
import { ExerciseSettingsPage } from './components/exercise-settings.page/exercise-settings.page';
import * as _ from 'lodash';
import { ExerciseExplanationService } from './state/exercise-explanation.service';
import Exercise from '../exercise-logic';
import { BaseComponent } from '../../shared/ts-utility';
import { takeUntil, finalize, switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { BdcWalkService, BdcWalkModule } from 'bdc-walkthrough';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { getCurrentAnswersLayout } from './utility/getCurrentAnswersLayout';
import { AnswersLayoutComponent } from './components/answers-layout/answers-layout.component';
import { AnswerIndicationComponent } from './components/answer-indication/answer-indication.component';
import { CommonModule } from '@angular/common';
import { PureFunctionPipe } from '../../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import { ContentPaddingDirective } from '../../shared/components/shared-components/content-padding.directive';
import AnswerConfig = Exercise.AnswerConfig;

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
    AnswersLayoutComponent,
    AnswerIndicationComponent,
    PureFunctionPipe,
    ContentPaddingDirective,
  ],
})
export class ExercisePage extends BaseComponent {
  private _hideMessage$ = new BehaviorSubject<boolean>(false);
  private _developerModeActivationCount: number = 0;

  wrongAnswers: string[] = [];
  rightAnswer: string | null = null;
  isMenuOpened: boolean = false;

  get correctAnswersPercentage(): number {
    if (!this.state.totalQuestions) {
      return 0;
    }
    return (this.state.totalCorrectAnswers / this.state.totalQuestions) * 100;
  }

  constructor(
    public readonly state: ExerciseStateService,
    public readonly exerciseExplanation: ExerciseExplanationService,
    private readonly _modalController: ModalController,
    private readonly _alertController: AlertController,
    private readonly _toastController: ToastController,
    private readonly _bdcWalkService: BdcWalkService
  ) {
    super();
    this._init();
    this._handleMessages();
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
      this.rightAnswer = answer;
      this.wrongAnswers = [];
    } else {
      this.wrongAnswers.push(answer);
    }
    setTimeout(() => {
      if (this.state.globalSettings.revealAnswerAfterFirstMistake) {
        this.wrongAnswers = [];
      }
      this.rightAnswer = null;
    }, 100);
  }

  async editSettings(): Promise<void> {
    this._bdcWalkService.setTaskCompleted('taskEditSettings', true);
    const allAvailableAnswers: string[] =
      typeof this.state.answerList === 'object'
        ? _.flatMap(this.state.answerList)
        : this.state.answerList;
    const modal = await this._modalController.create({
      component: ExerciseSettingsPage,
      componentProps: {
        exerciseName: this.state.name,
        currentGlobalSettings: this.state.globalSettings,
        exerciseSettingsDescriptorInput: this.state.exerciseSettingsDescriptor, // must be before currentExerciseSettings
        currentExerciseSettings: this.state.exerciseSettings,
        allAvailableAnswers: allAvailableAnswers,
      },
    });
    this._hideMessage$.next(true);
    await modal.present();
    await this.state.stop();
    const data = (await modal.onDidDismiss()).data;
    this._hideMessage$.next(false);
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

  private _handleMessages(): void {
    let lastToaster: HTMLIonToastElement | null = null;
    combineLatest({
      message: this.state.message$,
      error: this.state.error$,
    })
      .pipe(
        map(
          ({
            message,
            error,
          }): {
            text: string;
            type: 'error' | 'message';
          } | null =>
            error
              ? {
                  text:
                    '<p>Ooops... something went wrong! If this persists, please report a bug</p>' +
                    error,
                  type: 'error',
                }
              : message
              ? {
                  text: message,
                  type: 'message',
                }
              : null
        ),
        switchMap((message) => {
          return this._hideMessage$.pipe(
            map((hideMessage) => (hideMessage ? null : message))
          );
        }),
        takeUntil(this._destroy$),
        finalize(() => {
          lastToaster?.dismiss();
        })
      )
      .subscribe((message) => {
        if (lastToaster) {
          lastToaster.dismiss();
          lastToaster = null;
        }

        if (!message) {
          return;
        }

        this._toastController
          .create({
            message: message.text,
            position: 'middle',
            color: message.type === 'error' ? 'danger' : 'dark',
            header: message.type === 'error' ? 'Unexpected Error' : undefined,
            buttons: message.type === 'error' ? ['OK'] : [],
          })
          .then((toaster) => {
            // can happen because of a race condition
            if (lastToaster) {
              lastToaster.dismiss();
            }
            lastToaster = toaster;
            toaster.present();
          });
      });
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
