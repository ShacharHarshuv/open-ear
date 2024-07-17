import { CommonModule } from '@angular/common';
import { Component, Signal, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import {
  BaseControlValueAccessorComponent,
  getNgValueAccessorProvider,
} from '../../../../../../shared/ts-utility';
import Exercise, {
  flatAnswerList,
  isMultiAnswerCell,
} from '../../../../../exercise-logic';
import {
  AnswerSelectedEvent,
  AnswersLayoutComponent,
} from '../../../answers-layout/answers-layout.component';
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
  readonly answerList = input.required<Exercise.AnswerList<GAnswer>>();

  readonly allAnswers = computed(() => flatAnswerList(this.answerList()));

  readonly includedAnswers: Signal<readonly GAnswer[]> = toSignal(this.value$, {
    initialValue: [],
  });

  readonly areAllAnswersSelected = computed(() => {
    return this.allAnswers().length === this.includedAnswers().length;
  });

  readonly hasMultiAnswerButtons = computed(() => {
    for (const answerCell of getAnswersLayoutCellIterator(this.answerList())) {
      if (isMultiAnswerCell(answerCell)) {
        return true;
      }
    }

    return false;
  });

  toggleInclusion({ answer, source }: AnswerSelectedEvent<GAnswer>) {
    if (source === 'multi') {
      return; // handled by IncludedAnswersMultiAnswerButtonComponent, because it needs to be aware of inner answers
    }

    const currentValue: ReadonlyArray<GAnswer> = this.includedAnswers();
    if (currentValue.includes(answer)) {
      this.setViewValue(currentValue.filter((value) => value !== answer));
    } else {
      this.setViewValue([...currentValue, answer]);
    }
  }

  toggleSelectAll() {
    this.setViewValue(this.areAllAnswersSelected() ? [] : this.allAnswers());
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
