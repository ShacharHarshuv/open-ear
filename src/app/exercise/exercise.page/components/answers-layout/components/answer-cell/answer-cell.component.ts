import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
    CdkConnectedOverlay,
  ],
  host: {
    '[style.flex]': 'answerConfig()?.space',
  },
})
export class AnswerCellComponent {
  readonly cell = input.required<AnswersLayoutCell>();

  readonly buttonTemplate = input.required<ButtonTemplate>();

  readonly multiAnswerButtonTemplate =
    input.required<MultiAnswerButtonTemplate>();

  readonly multiAnswerCellConfig = input.required<MultiAnswerCellConfig>();
  readonly isOpen = signal(false);

  constructor() {}

  readonly answerConfig = computed(() => {
    const cell = this.cell();
    if (isMultiAnswerCell(cell)) {
      return null;
    }

    return normalizeAnswerConfig(cell);
  });

  readonly multiAnswerCell = computed((): Required<MultiAnswerCell> | null => {
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
    };
  });

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
  readonly bottomOverlayPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
  ];
  readonly topOverlayPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    },
  ];
}
