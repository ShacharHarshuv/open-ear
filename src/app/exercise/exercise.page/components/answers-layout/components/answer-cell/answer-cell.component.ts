import { Component, Input, TemplateRef, computed } from '@angular/core';
import {
  AnswerConfig,
  normalizeAnswerConfig,
  AnswersLayoutCell,
  isMultiAnswerCell,
  MultiAnswerCell,
  Answer,
  flatAnswerList,
} from '../../../../../exercise-logic';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import { uniqueId } from 'lodash';

export type MultiAnswerButtonTemplateContext = Required<
  Pick<MultiAnswerCell, 'primaryAnswer' | 'displayLabel'>
> & {
  innerAnswers: Answer[];
};

@Component({
  selector: 'app-answer-cell',
  templateUrl: './answer-cell.component.html',
  styleUrls: ['./answer-cell.component.scss'],
})
export class AnswerCellComponent {
  @Input({
    required: true,
    alias: 'cell',
  })
  cellInput: AnswersLayoutCell = null;

  @Input({ required: true })
  buttonTemplate!: TemplateRef<{ $implicit: Required<AnswerConfig<string>> }>;

  @Input({ required: true })
  multiAnswerButtonTemplate!: TemplateRef<{
    $implicit: MultiAnswerButtonTemplateContext;
  }>;

  @Input({ required: true })
  multiAnswerCellConfig!: {
    dismissOnSelect: boolean;
    triggerAction: 'click' | 'context-menu';
  };

  readonly cell = signalFromProperty(this, 'cellInput');

  readonly answerConfig = computed(() => {
    const cell = this.cell();
    if (isMultiAnswerCell(cell)) {
      return null;
    }

    return normalizeAnswerConfig(cell);
  });

  readonly multiAnswerCell = computed(
    (): (Required<MultiAnswerCell> & { id: string }) | null => {
      const cell = this.cell();
      if (!isMultiAnswerCell(cell)) {
        return null;
      }

      return {
        space: 1,
        displayLabel: cell.primaryAnswer,
        ...cell,
        id: uniqueId('multi-answer-cell-'),
      };
    }
  );

  readonly multiAnswerCellButtonTemplateContext = computed(
    (): MultiAnswerButtonTemplateContext | null => {
      const multiAnswerCell = this.multiAnswerCell();
      if (!multiAnswerCell) {
        return null;
      }

      return {
        ...multiAnswerCell,
        innerAnswers: flatAnswerList(multiAnswerCell.innerAnswersList),
      };
    }
  );
}
