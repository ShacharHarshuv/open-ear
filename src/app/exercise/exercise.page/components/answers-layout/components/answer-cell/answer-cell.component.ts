import {
  Component,
  Input,
  TemplateRef,
  computed,
  forwardRef,
} from '@angular/core';
import {
  AnswerConfig,
  normalizeAnswerConfig,
  AnswersLayoutCell,
  isMultiAnswerCell,
  MultiAnswerCell,
  Answer,
  flatAnswerList,
  getAnswerListIterator,
} from '../../../../../exercise-logic';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import { uniqueId, first } from 'lodash';
import { AnswersLayoutComponent } from '../../answers-layout.component';
import { IonicModule } from '@ionic/angular';
import { NgIf, NgTemplateOutlet } from '@angular/common';

export type MultiAnswerButtonTemplateContext = Required<
  Pick<MultiAnswerCell, 'displayLabel'>
> & {
  innerAnswers: Answer[];
};

@Component({
  selector: 'app-answer-cell',
  templateUrl: './answer-cell.component.html',
  styleUrls: ['./answer-cell.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    IonicModule,
    forwardRef(() => AnswersLayoutComponent),
  ],
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

      const firstAnswer: Required<AnswerConfig<string>> = getAnswerListIterator(
        cell.innerAnswersList
      ).next().value;

      return {
        space: 1,
        displayLabel: firstAnswer.displayLabel ?? firstAnswer.answer,
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
