import { SettingsConfig } from 'src/app/exercise/exercise-logic';
import {
  IV_V_I_CADENCE_IN_C,
  iv_V_i_CADENCE_IN_C,
} from 'src/app/exercise/utility/music/chords';
import { getDistanceOfKeys } from 'src/app/exercise/utility/music/keys/getDistanceOfKeys';
import { transpose } from 'src/app/exercise/utility/music/transpose';
import { NoteEvent } from 'src/app/services/player.service';

export type CadenceType = 'I IV V I' | 'i iv V i' | 'vi ii III vi';

export type CadenceTypeSetting = {
  cadenceType: CadenceType;
};

export const cadenceType: SettingsConfig<CadenceTypeSetting> = {
  controls: [
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
    },
  ],
  defaults: {
    cadenceType: 'I IV V I',
  },
};

const cadenceTypeToCadence: {
  [k in CadenceType]: NoteEvent[];
} = {
  'I IV V I': IV_V_I_CADENCE_IN_C,
  'i iv V i': iv_V_i_CADENCE_IN_C,
  'vi ii III vi': transpose(iv_V_i_CADENCE_IN_C, getDistanceOfKeys('A', 'C')),
};

export function getCadence(cadenceType: CadenceType) {
  return cadenceTypeToCadence[cadenceType];
}
