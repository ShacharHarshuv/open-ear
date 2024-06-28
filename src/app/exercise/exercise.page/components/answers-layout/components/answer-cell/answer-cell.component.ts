import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  computed,
  forwardRef,
  viewChildren,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { uniqueId } from 'lodash';
import { signalFromProperty } from '../../../../../../shared/ng-utilities/signalFromProperty';
import {
  Answer,
  AnswerConfig,
  AnswersLayoutCell,
  MultiAnswerCell,
  flatAnswerList,
  getAnswerListIterator,
  isMultiAnswerCell,
  normalizeAnswerConfig,
} from '../../../../../exercise-logic';
import { InnerAnswersComponent } from './inner-answers/inner-answers.component';

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
    NgTemplateOutlet,
    IonicModule,
    forwardRef(() => InnerAnswersComponent),
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
        cell.innerAnswersList,
      ).next().value;

      return {
        space: 1,
        displayLabel: firstAnswer.displayLabel ?? firstAnswer.answer,
        innerAnswersList2: null,
        ...cell,
        id: uniqueId('multi-answer-cell-'),
      };
    },
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
    },
  );

  readonly innerAnswersComponents = viewChildren(InnerAnswersComponent);

  dismissBothPopovers() {
    this.innerAnswersComponents().forEach(({ popover }) =>
      popover()?.dismiss(),
    );
  }
}
