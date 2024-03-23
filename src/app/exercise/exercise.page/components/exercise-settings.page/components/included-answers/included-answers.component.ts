import { CommonModule } from '@angular/common';
import { Component, Input, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import {
  BaseControlValueAccessorComponent,
  getNgValueAccessorProvider,
} from '../../../../../../shared/ts-utility';
import Exercise, { isMultiAnswerCell } from '../../../../../exercise-logic';
import { AnswersLayoutComponent } from '../../../answers-layout/answers-layout.component';
import { IncludedAnswersButtonComponent } from './components/included-answers-button/included-answers-button.component';
import { IncludedAnswersMultiAnswerButtonComponent } from './components/included-answers-multi-answer-button/included-answers-multi-answer-button.component';

@Component({
  selector: 'app-included-answers',
  templateUrl: './included-answers.component.html',
  styleUrls: ['./included-answers.component.scss'],
  providers: [getNgValueAccessorProvider(IncludedAnswersComponent)],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IncludedAnswersButtonComponent,
    IncludedAnswersMultiAnswerButtonComponent,
    AnswersLayoutComponent,
  ],
})
export class IncludedAnswersComponent<
  GAnswer extends string,
> extends BaseControlValueAccessorComponent<GAnswer[]> {
  @Input({
    required: true,
    alias: 'answerList',
  })
  answerListInput: Exercise.AnswerList<GAnswer> = [];

  readonly answerList = signalFromProperty(this, 'answerListInput');

  readonly includedAnswers: Signal<readonly GAnswer[]> = toSignal(this.value$, {
    initialValue: [],
  });

  readonly hasMultiAnswerButtons = computed(() => {
    for (const answerCell of getAnswersLayoutCellIterator(this.answerList())) {
      if (isMultiAnswerCell(answerCell)) {
        return true;
      }
    }

    return false;
  });

  toggleInclusion(answer: GAnswer) {
    const currentValue: ReadonlyArray<GAnswer> = this.includedAnswers();
    if (currentValue.includes(answer)) {
      this.setViewValue(currentValue.filter((value) => value !== answer));
    } else {
      this.setViewValue([...currentValue, answer]);
    }
  }
}

function* getAnswersLayoutCellIterator<GAnswer extends string>(
  answerList: Exercise.AnswerList<GAnswer>,
): Generator<Exercise.AnswersLayoutCell<GAnswer>, void, undefined> {
  if (Array.isArray(answerList)) {
    return;
  }

  for (const row of answerList.rows) {
    if (typeof row === 'string') {
      continue;
    }

    for (const cell of row) {
      yield cell;
    }
  }
}
