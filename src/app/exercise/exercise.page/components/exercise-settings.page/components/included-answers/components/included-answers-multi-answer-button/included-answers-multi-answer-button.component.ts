import { Component, computed, inject, input } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { first, intersection, isEmpty } from 'lodash';
import { Answer } from '../../../../../../../exercise-logic';
import { MultiAnswerButtonTemplateContext } from '../../../../../answers-layout/components/answer-cell/answer-cell.component';
import { IncludedAnswersComponent } from '../../included-answers.component';
import { IncludedAnswersButtonComponent } from '../included-answers-button/included-answers-button.component';

@Component({
  selector: 'app-included-answers-multi-answer-button',
  standalone: true,
  imports: [IncludedAnswersButtonComponent, IonicModule],
  templateUrl: './included-answers-multi-answer-button.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class IncludedAnswersMultiAnswerButtonComponent {
  readonly includedAnswersComponent = inject(IncludedAnswersComponent);
  readonly includedAnswers = this.includedAnswersComponent.includedAnswers;

  readonly multiAnswerCell = input.required<MultiAnswerButtonTemplateContext>();

  readonly isIncluded = computed(() => {
    return (
      this.multiAnswerCell()?.innerAnswers.some((answer) =>
        this.includedAnswers().includes(answer),
      ) ?? false
    );
  });

  toggleAnswer() {
    const includedAnswersInThisButton: Answer[] = intersection(
      this.multiAnswerCell().innerAnswers,
      this.includedAnswers(),
    );

    if (!isEmpty(includedAnswersInThisButton)) {
      includedAnswersInThisButton.forEach((answer) =>
        this.includedAnswersComponent.toggleInclusion({ answer }),
      );
      return;
    } else {
      this.includedAnswersComponent.toggleInclusion({
        answer: first(this.multiAnswerCell()?.innerAnswers),
      });
    }
  }
}
