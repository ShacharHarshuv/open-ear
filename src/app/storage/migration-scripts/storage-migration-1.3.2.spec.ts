import { testPureFunction } from '../../shared/testing-utility/testPureFunction';
import { migrationScript_1_3_2 } from './storage-migration-1.3.2';

describe('storage-migration-1.3.2', () => {
  testPureFunction(migrationScript_1_3_2.getNewData, [
    {
      args: [
        {
          exercise1: {},
        },
      ],
      returnValue: {
        exercise1: {},
      },
    },
    {
      args: [
        {
          exercise1: {
            exerciseSettings: {},
          },
        },
      ],
      returnValue: {
        exercise1: {
          exerciseSettings: {},
        },
      },
    },
    {
      args: [
        {
          exercise1: {
            exerciseSettings: {
              includedAnswers: ['♭II', 'i', 'iv', '#iv', 'viiᵒ'],
            },
          },
        },
      ],
      returnValue: {
        exercise1: {
          exerciseSettings: {
            includedAnswers: ['bII', 'i', 'iv', '#iv', 'viidim'],
          },
        },
      },
    },
  ]);
});
