import { SettingsDescriptors } from './SettingsDescriptors';
import { CadenceType } from '../exerciseFactories/tonalExercise';
import { Exercise } from '../../../Exercise';

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

// TODO: remove
export function CadenceTypeSetting<GSettings extends CadenceTypeSetting>() {
  return SettingsDescriptors<GSettings>({
    defaultValue: 'I IV V I' as any, // it's unclear why this doesn't work without it
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
  });
}
