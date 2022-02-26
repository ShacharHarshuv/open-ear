import { Injectable, Provider } from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseSettingsDataService } from './exercise-settings-data.service';
import { ExerciseSettingsData } from '../exercise/utility';

@Injectable()
export class ExerciseSettingsDataMockService implements PublicMembers<ExerciseSettingsDataService> {
  readonly exerciseIdToSettings: {[id in string]: Partial<ExerciseSettingsData>} = {};

  async getExerciseSettings(exerciseId: string): Promise<Partial<ExerciseSettingsData> | undefined> {
    return this.exerciseIdToSettings[exerciseId];
  }

  async saveExerciseSettings(exerciseId: string, settings: Partial<ExerciseSettingsData>): Promise<void> {
    this.exerciseIdToSettings[exerciseId] = settings;
  }

  static providers: Provider[] = [
    ExerciseSettingsDataMockService,
    {
      provide: ExerciseSettingsDataService,
      useExisting: ExerciseSettingsDataMockService,
    },
  ]
}
