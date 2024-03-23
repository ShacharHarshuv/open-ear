import { Injectable, inject } from '@angular/core';
import { ExerciseSettingsData } from '../exercise/utility';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseSettingsDataService {
  private _storageService = inject(StorageService);
  private readonly _exerciseSettingsKey: string = 'exerciseSettings';

  async saveExerciseSettings(
    exerciseId: string,
    settings: Partial<ExerciseSettingsData>,
  ): Promise<void> {
    const currentExercisesSettings: {
      [exerciseKey: string]: ExerciseSettingsData;
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

  async getExerciseSettings(
    exerciseId: string,
  ): Promise<Partial<ExerciseSettingsData> | undefined> {
    return (await this._storageService.get(this._exerciseSettingsKey))?.[
      exerciseId
    ];
  }
}
