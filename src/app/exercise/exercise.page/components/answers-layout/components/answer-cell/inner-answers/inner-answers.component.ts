import { Component, forwardRef, inject, input, viewChild } from '@angular/core';
import { IonPopover, IonicModule } from '@ionic/angular';
import { AnswerList } from '../../../../../../exercise-logic';
import { AnswersLayoutComponent } from '../../../answers-layout.component';
import { AnswerCellComponent } from '../answer-cell.component';

@Component({
  selector: 'app-inner-answers',
  standalone: true,
  imports: [forwardRef(() => AnswersLayoutComponent), IonicModule],
  templateUrl: `inner-answers.component.html`,
  styles: `
    .multi-answer-popover-content {
      padding: 0.5em;
    }
  `,
})
export class InnerAnswersComponent {
  readonly answerCellComponent = inject(AnswerCellComponent);
  readonly triggerId = input.required<string>();
  readonly innerAnswerList = input.required<AnswerList>();
  readonly side = input.required<'top' | 'bottom'>();
  readonly popover = viewChild(IonPopover);
}
