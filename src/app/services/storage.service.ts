import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ExerciseSettingsData } from '../exercise/utility';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage;
  private readonly _exerciseSettingsKey: string = 'exerciseSettings';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async saveExerciseSettings(exerciseId: string, settings: ExerciseSettingsData): Promise<void> {
    const currentExercisesSettings: {
      [exerciseKey: string]: ExerciseSettingsData
    } = await this.storage.get(this._exerciseSettingsKey) || {};
    currentExercisesSettings[exerciseId] = settings;
    await this._storage.set(this._exerciseSettingsKey, currentExercisesSettings);
  }

  async getExerciseSettings(exerciseId: string): Promise<ExerciseSettingsData | undefined> {
    return (await this.storage.get(this._exerciseSettingsKey))?.[exerciseId];
  }
}
