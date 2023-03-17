import { commonChordProgressionExercise } from './commonChordProgressionsExercise';
import { Exercise } from '../../Exercise';
import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedVoicingSettingsDescriptors } from '../utility/exerciseAttributes/chordProgressionExercise.spec';
import { expectedKeySelectionSettingsDescriptors } from '../utility/settings/keySelectionSettingsDescriptors.spec';

describe(commonChordProgressionExercise.name, () => {
  const context = testExercise({
    getExercise: commonChordProgressionExercise,
    settingDescriptorList: [
      'Analyze By',
      'Included Progressions',
      ...expectedKeySelectionSettingsDescriptors,
      'Drone',
      ...expectedVoicingSettingsDescriptors,
    ],
    defaultAnswers: ['I', 'IV', 'V', 'vi'],
  });

  describe('getAllAnswers', function () {
    it('should contain only chords from the selected progressions', () => {
      context.exercise.updateSettings?.({
        ...context.exercise.getCurrentSettings?.(),
        includedProgressions: ['I IV V I'],
      });
      expect(Exercise.flatAnswerList(context.exercise.getAnswerList())).toEqual(
        jasmine.arrayWithExactContents(['I', 'IV', 'V'])
      );
    });
  });
});
