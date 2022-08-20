import { TonalExerciseSettings } from './tonalExercise';
import { expectedKeySelectionSettingsDescriptors } from '../settings/keySelectionSettingsDescriptors.spec';

export const defaultTonalExerciseSettings: TonalExerciseSettings = {
  cadenceType: 'I IV V I',
  key: 'random',
  newKeyEvery: 0,
}

export const expectedTonalExerciseSettingsDescriptors: string[] = [
  'Cadence Type',
  ...expectedKeySelectionSettingsDescriptors,
]
