import { Injectable, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExerciseSettingsDataService } from '../../../services/exercise-settings-data.service';
import { ExerciseExplanationPage } from '../components/exercise-help/exercise-explanation/exercise-explanation.page';
import { ExerciseStateService } from './exercise-state.service';

@Injectable()
export class ExerciseExplanationService {
  private _state = inject(ExerciseStateService);
  private _modalController = inject(ModalController);
  private _exerciseSettingsData = inject(ExerciseSettingsDataService);

  async openExplanation(): Promise<void> {
    const modal = await this._modalController
      .create({
        component: ExerciseExplanationPage,
        componentProps: {
          content: this._state.exercise.explanation,
          exerciseName: this._state.name,
        },
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
    await modal.present();
    await modal.onDidDismiss();
  }

  async init(): Promise<void> {
    const exerciseSettings =
      await this._exerciseSettingsData.getExerciseSettings(
        this._state.exercise.id,
      );
    if (
      this._state.exercise.explanation &&
      !exerciseSettings?.wasExplanationDisplayed
    ) {
      await this.openExplanation();
      await this._exerciseSettingsData.saveExerciseSettings(
        this._state.exercise.id,
        {
          wasExplanationDisplayed: true,
        },
      );
    }
  }
}
