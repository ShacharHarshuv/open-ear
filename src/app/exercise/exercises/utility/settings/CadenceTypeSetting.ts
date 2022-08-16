import { CadenceType } from '../exerciseAttributes/tonalExercise';
import { Exercise } from '../../../Exercise';
import { withSettings } from './withSettings';

export type CadenceTypeSetting = {
  cadenceType: CadenceType;
}

export function cadenceTypeSettingsDescriptors<GAnswer extends string>(): Exercise.SettingsControlDescriptor<CadenceTypeSetting>[] {
  return [
    {
      key: 'cadenceType',
      info: 'Choose what chords will be played before the exercise to establish the key',
      descriptor: {
        controlType: 'select',
        label: 'Cadence Type',
        options: [
          {
            value: 'I IV V I',
            label: 'I IV V I (Major)',
          },
          {
            value: 'i iv V i',
            label: 'i iv V i (Minor)',
          },
        ],
      },
    },
  ];
}

export function cadenceTypeSettings<GAnswer extends string>() {
  return withSettings<CadenceTypeSetting>({
    settingsDescriptors: cadenceTypeSettingsDescriptors<GAnswer>(),
    defaultSettings: {
      cadenceType: 'I IV V I',
    },
  });
}
