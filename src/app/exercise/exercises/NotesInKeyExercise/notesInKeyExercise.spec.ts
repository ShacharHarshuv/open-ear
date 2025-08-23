import { exerciseSmokeTest } from '../testing-utility/test-exercise.spec';
import { NoteInKeySettings, notesInKeyExercise } from './notesInKeyExercise';

describe(notesInKeyExercise.name, () => {
  exerciseSmokeTest(notesInKeyExercise);

  it(`getQuestion with multiple voices`, () => {
    const defaultSettings = notesInKeyExercise.settingsConfig.defaults;
    const settings: NoteInKeySettings = {
      ...defaultSettings!,
      key: 'random',
      newKeyEvery: 1,
    };

    for (let range of ['high', 'middle', 'bass', 'contrabass'] as const) {
      for (let numberOfVoices of [2, 3] as const) {
        expect(() =>
          notesInKeyExercise
            .logic({
              ...settings,
              notesRange: range,
              numberOfVoices,
            })
            .getQuestion(),
        ).not.toThrow();
      }
    }
  });
});
