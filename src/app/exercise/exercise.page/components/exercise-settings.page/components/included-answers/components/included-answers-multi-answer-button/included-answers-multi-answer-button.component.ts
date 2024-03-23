import { Component, Input, Signal, computed, inject } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { first, intersection, isEmpty } from 'lodash';
import { signalFromProperty } from '../../../../../../../../shared/ng-utilities/signalFromProperty';
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

  @Input({
    required: true,
    alias: 'multiAnswerCell',
  })
  multiAnswerCellInput: MultiAnswerButtonTemplateContext | null = null;

  readonly multiAnswerCell: Signal<MultiAnswerButtonTemplateContext | null> =
    signalFromProperty(this, 'multiAnswerCellInput');

  readonly isIncluded = computed(() => {
    return (
      this.multiAnswerCell()?.innerAnswers.some((answer) =>
        this.includedAnswers().includes(answer),
      ) ?? false
    );
  });

  toggleAnswer() {
    const includedAnswersInThisButton = intersection(
      this.multiAnswerCell()?.innerAnswers,
      this.includedAnswers(),
    );

    if (!isEmpty(includedAnswersInThisButton)) {
      includedAnswersInThisButton.forEach((answer) =>
        this.includedAnswersComponent.toggleInclusion(answer),
      );
      return;
    }

    this.includedAnswersComponent.toggleInclusion(
      first(this.multiAnswerCell()?.innerAnswers),
    );
  }
}
