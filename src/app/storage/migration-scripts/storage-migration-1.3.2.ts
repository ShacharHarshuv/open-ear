import { StorageMigrationScript } from '../storage-migration.service';
import * as _ from 'lodash';

export const migrationScript_1_3_2: StorageMigrationScript<Record<string, { includedAnswers: any[] }>> = {
  storageKey: 'exerciseSettings',
  breakingChangeVersion: '1.3.2',
  getNewData(oldData) {
    return _.mapValues(oldData, exerciseSettings => {
      return {
        ...exerciseSettings,
        includedAnswers: _.map(exerciseSettings.includedAnswers, answer => {
          return answer.replace('♭', 'b').replace('°', 'dim');
        }),
      }
    });
  }
}
