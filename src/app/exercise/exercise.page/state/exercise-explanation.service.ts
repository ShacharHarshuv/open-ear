import { Injectable } from '@angular/core';
import {ExerciseStateService} from "./exercise-state.service";
import {ExerciseExplanationPage} from "../components/exercise-help/exercise-explanation/exercise-explanation.page";
import {ModalController} from "@ionic/angular";
import {ExerciseSettingsDataService} from "../../../services/exercise-settings-data.service";

@Injectable()
export class ExerciseExplanationService {
  constructor(
    private _state: ExerciseStateService,
    private _modalController: ModalController,
    private _exerciseSettingsData: ExerciseSettingsDataService,
  ) {
  }

  async openExplanation(): Promise<void> {
    const modal = await this._modalController.create({
      component: ExerciseExplanationPage,
      componentProps: {
        content: this._state.exercise.explanation,
        exerciseName: this._state.name,
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async init(): Promise<void> {
    const exerciseSettings = await this._exerciseSettingsData.getExerciseSettings(this._state.exercise.id);
    if (this._state.exercise.explanation && !exerciseSettings?.wasExplanationDisplayed) {
      await this.openExplanation();
      await this._exerciseSettingsData.saveExerciseSettings(this._state.exercise.id, {
        wasExplanationDisplayed: true,
      })
    }
  }
}
