import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedTonalExerciseSettingsDescriptors } from '../utility/exerciseAttributes/tonalExercise.spec';
import { NoteInKeySettings, notesInKeyExercise } from './notesInKeyExercise';

describe(notesInKeyExercise.name, () => {
  const context = testExercise<NoteInKeySettings>({
    getExercise: notesInKeyExercise,
    settingDescriptorList: [
      ...expectedTonalExerciseSettingsDescriptors,
      'Included Scale Degrees',
      'Display',
      'Range',
      'Number of notes',
      'Number of voices',
      'Harmonic Intervals',
      'Play Resolution',
    ],
  });

  it(`getQuestion with multiple voices`, () => {
    console.log('context', context);
    const defaultSettings = context.exercise.getCurrentSettings?.();
    const settings: NoteInKeySettings = {
      ...defaultSettings!,
      key: 'random',
      newKeyEvery: 1,
    };

    for (let range of ['high', 'middle', 'bass', 'contrabass'] as const) {
      for (let numberOfVoices of [2, 3] as const) {
        context.exercise.updateSettings?.({
          ...settings,
          notesRange: range,
          numberOfVoices,
        });
        expect(() => context.exercise.getQuestion()).not.toThrow();
      }
    }
  });
});
