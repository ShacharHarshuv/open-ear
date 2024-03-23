import Exercise from '../../exercise-logic';
import { GlobalExerciseSettings } from './GlobalExerciseSettings';

export interface ExerciseSettingsData {
  globalSettings: GlobalExerciseSettings;
  exerciseSettings: { [key: string]: Exercise.SettingValueType };
  wasExplanationDisplayed?: boolean;
}
