import { testExercise } from '../testing-utility/test.exercise';
import { triadInversionExercise } from './triadInversionExercise';

describe('TriadInversionExercise', () => {
  const context = testExercise({
    getExercise: triadInversionExercise,
    settingDescriptorKeyList: [
      'includedAnswers',
      'arpeggiateSpeed',
      'playRootAfterAnswer',
    ],
  });
})
