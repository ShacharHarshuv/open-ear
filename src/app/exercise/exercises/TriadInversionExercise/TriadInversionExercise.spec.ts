import { triadInversionExercise } from './TriadInversionExercise';
import { Exercise } from '../../Exercise';

describe('TriadInversionExercise', () => {
  let exercise: Exercise.IExercise;

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
      jasmine.objectContaining({key: 'cadenceType'}), // todo: cadence type should not appear in this exercise
      jasmine.objectContaining({key: 'includedAnswers'}),
      jasmine.objectContaining({key: 'arpeggiateSpeed'}),
      jasmine.objectContaining({key: 'playRootAfterAnswer'}),
    ]);
  })
})
