import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  computed,
  effect,
  forwardRef,
  input,
  viewChildren,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { isEmpty, uniqueId } from 'lodash';
import { isValueTruthy } from '../../../../../../shared/ts-utility';
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

export type MultiAnswerButtonTemplate = TemplateRef<{
  $implicit: MultiAnswerButtonTemplateContext;
}>;

export type ButtonTemplate = TemplateRef<{
  $implicit: Required<AnswerConfig<string>>;
}>;

export interface MultiAnswerCellConfig {
  dismissOnSelect: boolean;
  triggerAction: 'click' | 'context-menu';
}

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
  readonly cell = input.required<AnswersLayoutCell>();

  readonly buttonTemplate = input.required<ButtonTemplate>();

  readonly multiAnswerButtonTemplate =
    input.required<MultiAnswerButtonTemplate>();

  readonly multiAnswerCellConfig = input.required<MultiAnswerCellConfig>();

  constructor() {
    this._dismissInnerAnswersOnClickOutside();
  }

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

  private _dismissInnerAnswersOnClickOutside() {
    const elements = computed(() => {
      return this.innerAnswersComponents()
        .map(({ contentElementRef }) => contentElementRef()?.nativeElement)
        .filter(isValueTruthy);
    });

    effect((onCleanup) => {
      const currentElements = elements();
      if (isEmpty(currentElements)) {
        return;
      }

      const listener = (event: MouseEvent) => {
        if (
          currentElements.some((element) =>
            element.contains(event.target as Node),
          )
        ) {
          return;
        }

        this.dismissBothPopovers();
        event.stopImmediatePropagation();
        document.removeEventListener('click', listener);
      };

      document.addEventListener('click', listener);

      onCleanup(() => {
        document.removeEventListener('click', listener);
      });
    });
  }
}
