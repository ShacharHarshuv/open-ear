import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
} from '@angular/core';
import {
  AnswerList,
  AnswersLayout,
  AnswersLayoutCell,
} from '../../../exercise-logic';
import { AnswerCellComponent } from './components/answer-cell/answer-cell.component';
import { CommonModule } from '@angular/common';
import { signalFromProperty } from '../../../../shared/ng-utilities/signalFromProperty';
import { AnswersRowComponent } from './components/answers-row/answers-row.component';

@Component({
  selector: 'app-answers-layout',
  templateUrl: './answers-layout.component.html',
  styleUrls: ['./answers-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AnswerCellComponent, AnswersRowComponent],
  standalone: true,
})
export class AnswersLayoutComponent<GAnswer extends string = string> {
  @Input({
    required: true,
    alias: 'answerList',
  })
  answerListInput: AnswerList<GAnswer> = [];

  @Input({ required: true })
  buttonTemplate!: AnswersRowComponent<GAnswer>['buttonTemplate'];

  readonly answerList = signalFromProperty(this, 'answerListInput');

  readonly autoLayoutAnswers = computed(
    (): AnswersLayoutCell<GAnswer>[] | null => {
      const answerList = this.answerList();
      if (!Array.isArray(answerList)) {
        return null;
      }

      return answerList;
    }
  );

  readonly customAnswersLayout = computed((): AnswersLayout<GAnswer> | null => {
    const answerList = this.answerList();
    if (Array.isArray(answerList)) {
      return null;
    }

    return answerList;
  });
}
