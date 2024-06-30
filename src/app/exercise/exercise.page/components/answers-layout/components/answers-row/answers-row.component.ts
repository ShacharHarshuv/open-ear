import { Component, computed, forwardRef, input } from '@angular/core';
import {
  AnswerLayoutRow,
  AnswersLayoutCell,
} from '../../../../../exercise-logic';
import {
  AnswerCellComponent,
  ButtonTemplate,
  MultiAnswerButtonTemplate,
  MultiAnswerCellConfig,
} from '../answer-cell/answer-cell.component';

@Component({
  selector: 'app-answers-row',
  templateUrl: './answers-row.component.html',
  styleUrls: ['./answers-row.component.scss'],
  standalone: true,
  imports: [forwardRef(() => AnswerCellComponent)],
})
export class AnswersRowComponent<GAnswer extends string> {
  readonly row = input.required<AnswerLayoutRow<GAnswer>>();

  readonly buttonTemplate = input.required<ButtonTemplate>();

  readonly multiAnswerButtonTemplate =
    input.required<MultiAnswerButtonTemplate>();

  readonly multiAnswerCellConfig = input.required<MultiAnswerCellConfig>();

  readonly textRow = computed((): string | null => {
    const row = this.row();
    return typeof row === 'string' ? row : null;
  });

  readonly cellList = computed((): AnswersLayoutCell<GAnswer>[] | null => {
    const row = this.row();
    return Array.isArray(row) ? row : null;
  });
}
