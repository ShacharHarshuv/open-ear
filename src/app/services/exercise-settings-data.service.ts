import { Injectable, inject } from '@angular/core';
import { ExerciseSettings } from '../exercise/exercise-logic';
import { ExerciseSettingsData } from '../exercise/utility';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseSettingsDataService {
  private _storageService = inject(StorageService);
  private readonly _exerciseSettingsKey: string = 'exerciseSettings';

  async saveExerciseSettings<GSettings extends ExerciseSettings>(
    exerciseId: string,
    settings: Partial<ExerciseSettingsData<GSettings>>,
  ): Promise<void> {
    const currentExercisesSettings: {
      [exerciseKey: string]: ExerciseSettingsData<GSettings>;
    } = (await this._storageService.get(this._exerciseSettingsKey)) || {};
    currentExercisesSettings[exerciseId] = {
      ...currentExercisesSettings[exerciseId],
      ...settings,
    };
    await this._storageService.set(
      this._exerciseSettingsKey,
      currentExercisesSettings,
    );
  }

  async getExerciseSettings<GSettings extends ExerciseSettings>(
    exerciseId: string,
  ): Promise<Partial<ExerciseSettingsData<GSettings>> | undefined> {
    return (await this._storageService.get(this._exerciseSettingsKey))?.[
      exerciseId
    ];
  }
}
