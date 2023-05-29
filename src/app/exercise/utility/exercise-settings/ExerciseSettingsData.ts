import { GlobalExerciseSettings } from './GlobalExerciseSettings';
import Exercise from '../../exercise-logic';

export interface ExerciseSettingsData {
  globalSettings: GlobalExerciseSettings;
  exerciseSettings: { [key: string]: Exercise.SettingValueType };
  wasExplanationDisplayed?: boolean;
}
