import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
} from '@angular/core';
import {
  AnswerList,
  AnswersLayout,
  AnswersLayoutCell,
} from '../../../exercise-logic';
import { AnswerCellComponent } from './components/answer-cell/answer-cell.component';
import { AnswersRowComponent } from './components/answers-row/answers-row.component';

@Component({
  selector: 'app-answers-layout',
  templateUrl: './answers-layout.component.html',
  styleUrls: ['./answers-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    forwardRef(() => AnswersRowComponent),
    forwardRef(() => AnswerCellComponent),
  ],
})
export class AnswersLayoutComponent<GAnswer extends string = string> {
  readonly answerList = input.required<AnswerList<GAnswer>>();

  readonly buttonTemplate =
    input.required<AnswersRowComponent<GAnswer>['buttonTemplate']>();

  readonly multiAnswerButtonTemplate =
    input.required<AnswersRowComponent<GAnswer>['multiAnswerButtonTemplate']>();

  readonly multiAnswerCellConfig =
    input.required<AnswerCellComponent['multiAnswerCellConfig']>();

  readonly bottomUp = input(false);

  readonly autoLayoutAnswers = computed(
    (): AnswersLayoutCell<GAnswer>[] | null => {
      const answerList = this.answerList();
      if (!Array.isArray(answerList)) {
        return null;
      }

      return answerList;
    },
  );

  readonly customAnswersLayout = computed((): AnswersLayout<GAnswer> | null => {
    const answerList = this.answerList();
    if (Array.isArray(answerList)) {
      return null;
    }

    return answerList;
  });
}
