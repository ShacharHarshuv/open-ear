import { Injectable } from '@angular/core';
import { ExerciseSettingsData } from '../exercise/utility';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseSettingsDataService } from './exercise-settings-data.service';

@Injectable()
export class ExerciseSettingsDataMockService
  implements PublicMembers<ExerciseSettingsDataService>
{
  readonly exerciseIdToSettings: {
    [id in string]: Partial<ExerciseSettingsData<any>>;
  } = {};

  async getExerciseSettings(
    exerciseId: string,
  ): Promise<Partial<ExerciseSettingsData<any>> | undefined> {
    return this.exerciseIdToSettings[exerciseId];
  }

  async saveExerciseSettings(
    exerciseId: string,
    settings: Partial<ExerciseSettingsData<any>>,
  ): Promise<void> {
    this.exerciseIdToSettings[exerciseId] = settings;
  }
}
