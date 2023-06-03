import { Component, Input, TemplateRef, computed } from '@angular/core';
import {
  AnswerConfig,
  normalizeAnswerConfig,
  AnswersLayoutCell,
  isMultiAnswerCell,
  MultiAnswerCell,
} from '../../../../../exercise-logic';
import { CommonModule } from '@angular/common';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';

@Component({
  selector: 'app-answer-cell',
  templateUrl: './answer-cell.component.html',
  styleUrls: ['./answer-cell.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AnswerCellComponent {
  @Input({
    required: true,
    alias: 'cell',
  })
  cellInput: AnswersLayoutCell = null;

  @Input({ required: true })
  buttonTemplate!: TemplateRef<{ $implicit: Required<AnswerConfig<string>> }>;

  readonly cell = signalFromProperty(this, 'cellInput');

  readonly answerConfig = computed(() => {
    const cell = this.cell();
    if (isMultiAnswerCell(cell)) {
      return null;
    }

    return normalizeAnswerConfig(cell);
  });

  readonly multiAnswerCell = computed((): MultiAnswerCell | null => {
    const cell = this.cell();
    if (!isMultiAnswerCell(cell)) {
      return null;
    }

    return cell;
  });
}
