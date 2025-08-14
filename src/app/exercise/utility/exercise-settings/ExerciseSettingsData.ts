import { ExerciseSettings } from '../../exercise-logic';
import { GlobalExerciseSettings } from './GlobalExerciseSettings';

export interface ExerciseSettingsData<GSettings extends ExerciseSettings> {
  globalSettings: GlobalExerciseSettings;
  exerciseSettings: GSettings;
  wasExplanationDisplayed?: boolean;
}
