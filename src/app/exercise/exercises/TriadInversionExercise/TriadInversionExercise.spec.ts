import { triadInversionExercise } from './TriadInversionExercise';
import { Exercise } from '../../Exercise';

describe('TriadInversionExercise', () => {
  let exercise: Exercise.Exercise;

  beforeEach(() => {
    exercise = triadInversionExercise();
  });

  it('getQuestion should return a truthy value', () => {
    expect(exercise.getQuestion()).toBeTruthy();
  });

  it('should have the right settings', () => {
    const settingsDescriptorList = exercise.getSettingsDescriptor?.();
    console.log(settingsDescriptorList);
    expect(settingsDescriptorList).toEqual([
      jasmine.objectContaining({key: 'includedAnswers'}),
      jasmine.objectContaining({key: 'arpeggiateSpeed'}),
      jasmine.objectContaining({key: 'playRootAfterAnswer'}),
    ]);
  })
})
