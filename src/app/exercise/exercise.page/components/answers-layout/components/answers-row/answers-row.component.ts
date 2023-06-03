import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AnswerLayoutRow,
  AnswersLayoutCell,
} from '../../../../../exercise-logic';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import { AnswerCellComponent } from '../answer-cell/answer-cell.component';

@Component({
  selector: 'app-answers-row',
  standalone: true,
  imports: [CommonModule, AnswerCellComponent],
  templateUrl: './answers-row.component.html',
  styleUrls: ['./answers-row.component.scss'],
})
export class AnswersRowComponent<GAnswer extends string> {
  @Input({
    required: true,
    alias: 'row',
  })
  rowInput: AnswerLayoutRow<GAnswer> = [];

  @Input({ required: true })
  buttonTemplate!: AnswerCellComponent['buttonTemplate'];

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
