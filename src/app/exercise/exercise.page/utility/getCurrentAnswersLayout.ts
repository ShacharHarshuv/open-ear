import { CurrentAnswer } from '../state/exercise-state.service';
import { Exercise } from '../../Exercise';
import * as _ from 'lodash';

// todo: it's probably better to group by voice, as later we might want to give each answer a different duration for different contrapuntal scenarios
export function getCurrentAnswersLayout(
  currentAnswers: CurrentAnswer[],
  currentQuestion: Exercise.Question,
) {
  /**
   * Using "playAfter" to calculate the desired layout of the answers, to reflect musical timing
   * each array are events happening in the same time
   */
  const currentAnswersLayout: (CurrentAnswer & {
    index: number;
  })[][] = [];

  let columnIndex = 0; // the visual horizontal position of the answer

  currentQuestion.segments.forEach((segment, segmentIndex) => {
    if (!_.isNil(segment.playAfter)) {
      columnIndex = segment.playAfter;
    }

    if (!currentAnswersLayout[columnIndex]) {
      currentAnswersLayout[columnIndex] = [];
    }

    currentAnswersLayout[columnIndex].push({
      ...currentAnswers[segmentIndex],
      index: segmentIndex,
    });
    columnIndex++;
  });
  return currentAnswersLayout;
}
