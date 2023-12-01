import { Component, Input, computed, forwardRef } from '@angular/core';
import {
  AnswerLayoutRow,
  AnswersLayoutCell,
} from '../../../../../exercise-logic';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import { AnswerCellComponent } from '../answer-cell/answer-cell.component';


@Component({
  selector: 'app-answers-row',
  templateUrl: './answers-row.component.html',
  styleUrls: ['./answers-row.component.scss'],
  standalone: true,
  imports: [forwardRef(() => AnswerCellComponent)],
})
export class AnswersRowComponent<GAnswer extends string> {
  @Input({
    required: true,
    alias: 'row',
  })
  rowInput: AnswerLayoutRow<GAnswer> = [];

  @Input({ required: true })
  buttonTemplate!: AnswerCellComponent['buttonTemplate'];

  @Input({ required: true })
  multiAnswerButtonTemplate!: AnswerCellComponent['multiAnswerButtonTemplate'];

  @Input({ required: true })
  multiAnswerCellConfig!: AnswerCellComponent['multiAnswerCellConfig'];

  readonly row = signalFromProperty(this, 'rowInput');

  readonly textRow = computed((): string | null => {
    const row = this.row();
    return typeof row === 'string' ? row : null;
  });

  readonly cellList = computed((): AnswersLayoutCell<GAnswer>[] | null => {
    const row = this.row();
    return Array.isArray(row) ? row : null;
  });
}
