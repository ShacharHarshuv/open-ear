import * as _ from 'lodash';
import { CurrentAnswer } from '../state/exercise-state.service';

// todo: it's probably better to group by voice, as later we might want to give each answer a different duration for different contrapuntal scenarios
export function getCurrentAnswersLayout(currentAnswers: CurrentAnswer[]) {
  /**
   * Using "playAfter" to calculate the desired layout of the answers, to reflect musical timing
   * each array are events happening in the same time
   */
  const currentAnswersLayout: (CurrentAnswer & {
    index: number;
  })[][] = [];

  let columnIndex = 0; // the visual horizontal position of the answer

  currentAnswers.forEach((currentAnswer, answerIndex) => {
    if (!_.isNil(currentAnswer.playAfter)) {
      columnIndex = currentAnswer.playAfter;
    }

    if (!currentAnswersLayout[columnIndex]) {
      currentAnswersLayout[columnIndex] = [];
    }

    currentAnswersLayout[columnIndex].push({
      ...currentAnswer,
      index: answerIndex,
    });
    columnIndex++;
  });
  return currentAnswersLayout;
}
