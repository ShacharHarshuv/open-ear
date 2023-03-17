import { GlobalExerciseSettings } from "./GlobalExerciseSettings";
import { Exercise } from "../../Exercise";

export interface ExerciseSettingsData {
  globalSettings: GlobalExerciseSettings;
  exerciseSettings: { [key: string]: Exercise.SettingValueType };
  wasExplanationDisplayed?: boolean;
}
