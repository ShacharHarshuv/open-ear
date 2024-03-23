import * as _ from 'lodash';
import { StorageMigrationScript } from '../storage-migration.service';

export const migrationScript_1_3_2: StorageMigrationScript<
  Record<string, { exerciseSettings?: { includedAnswers?: any[] } }>
> = {
  storageKey: 'exerciseSettings',
  breakingChangeVersion: '1.3.2',
  getNewData(oldData) {
    return _.mapValues(oldData, (exerciseSettings) => {
      if (!exerciseSettings.exerciseSettings?.includedAnswers) {
        return exerciseSettings;
      }
      return {
        ...exerciseSettings,
        exerciseSettings: {
          ...exerciseSettings.exerciseSettings,
          includedAnswers: _.map(
            exerciseSettings.exerciseSettings.includedAnswers,
            (answer) => {
              return answer.replace('♭', 'b').replace('ᵒ', 'dim');
            },
          ),
        },
      };
    });
  },
};
