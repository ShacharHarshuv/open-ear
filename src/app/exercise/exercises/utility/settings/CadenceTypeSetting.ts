import { SettingsControlDescriptor } from 'src/app/exercise/exercise-logic';
import { CadenceType } from '../exerciseAttributes/tonalExercise';

export type CadenceTypeSetting = {
  cadenceType: CadenceType;
};
export const cadenceTypeSettingsDescriptor: SettingsControlDescriptor<CadenceTypeSetting> =
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
        {
          value: 'vi ii III vi',
          label: 'vi ii III vi (Relative Minor)',
        },
      ],
    },
  };

// export function cadenceTypeSettings<GAnswer extends string>() {
//   return withSettings<CadenceTypeSetting>({
//     settingsDescriptors: cadenceTypeSettingsDescriptors<GAnswer>(),
//     defaultSettings: {
//       cadenceType: 'I IV V I',
//     },
//   });
// }
