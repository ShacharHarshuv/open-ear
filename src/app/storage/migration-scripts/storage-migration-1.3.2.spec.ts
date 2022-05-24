import { testPureFunction } from '../../shared/testing-utility/testPureFunction';
import { migrationScript_1_3_2 } from './storage-migration-1.3.2';

describe('storage-migration-1.3.2', () => {
  testPureFunction(migrationScript_1_3_2.getNewData, [
    {
      args: [{
        exercise1: {
          includedAnswers: ['♭II', 'i', 'iv', '#iv', 'vii°']
        }
      }],
      returnValue: {
        exercise1: {
          includedAnswers: ['bII', 'i', 'iv', '#iv', 'viidim']
        }
      }
    }
  ])
});
