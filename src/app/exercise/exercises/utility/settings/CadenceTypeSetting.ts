import { SettingsDescriptors } from './SettingsDescriptors';
import { CadenceType } from '../base-exercises/BaseTonalExercise';

export type CadenceTypeSetting = {
  cadenceType: CadenceType;
}

// todo: convert to object (not functions) and use directly
// namespace CadenceTypeSetting {
//   const descriptor = () => ...
// }
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
