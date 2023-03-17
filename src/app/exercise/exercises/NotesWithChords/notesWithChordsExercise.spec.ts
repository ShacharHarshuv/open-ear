import { notesWithChordsExercise } from "./notesWithChordsExercise";
import { testExercise } from "../testing-utility/test-exercise.spec";
import { expectedKeySelectionSettingsDescriptors } from "../utility/settings/keySelectionSettingsDescriptors.spec";

describe(notesWithChordsExercise.name, () => {
  testExercise({
    getExercise: notesWithChordsExercise,
    settingDescriptorList: [
      'Included Options',
      ...expectedKeySelectionSettingsDescriptors,
      'Drone',
      'Voice Mode',
    ],
  });
});
