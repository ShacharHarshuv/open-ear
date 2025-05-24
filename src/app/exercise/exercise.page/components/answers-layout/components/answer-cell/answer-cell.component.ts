import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  TemplateRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { getAddEventListener } from '../../../../../../shared/ng-utilities/get-add-event-listener';
import {
  Answer,
  AnswerConfig,
  AnswerList,
  AnswersLayoutCell,
  MultiAnswerCell,
  flatMultiCell,
  getMultiCellIterator,
  isMultiAnswerCell,
  normalizeAnswerConfig,
} from '../../../../../exercise-logic';
import { AnswerSelectedEvent } from '../../answers-layout.component';
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
  triggerAction: 'hold' | 'context-menu';
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
export class AnswerCellComponent<GAnswer extends string> {
  private _isContextMenuInProgress = false;
  readonly cell = input.required<AnswersLayoutCell<GAnswer>>();

  readonly buttonTemplate = input.required<ButtonTemplate>();

  readonly multiAnswerButtonTemplate =
    input.required<MultiAnswerButtonTemplate>();

  readonly multiAnswerCellConfig = input.required<MultiAnswerCellConfig>();
  readonly answerSelected = output<AnswerSelectedEvent<GAnswer>>();

  readonly isOpen = signal(false);
  readonly innerAnswersTrigger = viewChild<ElementRef<HTMLElement>>(
    'innerAnswersTrigger',
  );
  readonly elementRef = inject(ElementRef);

  constructor() {
    this._handleCloseOnClickOutside();
    this._handleOpenTrigger();
    this._handleAnswerSelection();
  }

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

    const firstAnswer: Required<AnswerConfig<string>> | undefined = (() => {
      const answersIterator = getMultiCellIterator(cell);
      for (const answerConfig of answersIterator) {
        if (answerConfig.answer) {
          return answerConfig;
        }
      }
      return undefined;
    })();

    if (!firstAnswer) {
      return null;
    }

    return {
      space: 1,
      innerAnswersList2: null,
      ...cell,
      displayLabel: firstAnswer.displayLabel ?? firstAnswer.answer,
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
        innerAnswers: flatMultiCell(multiAnswerCell),
      };
    },
  );

  // relevant only for triggerAction === 'context-menu'
  private _handleCloseOnClickOutside() {
    let backdrop: HTMLElement | null = null;
    const handleBackdropClick = () => {
      // prevents glitch when close is triggered by the pointer release after opening
      if (this._isContextMenuInProgress) {
        return;
      }

      this.isOpen.set(false); // todo
    };
    function cleanup() {
      backdrop?.remove();
      backdrop?.removeEventListener('click', handleBackdropClick);
      backdrop = null;
    }

    effect(() => {
      if (this.multiAnswerCellConfig().triggerAction !== 'context-menu') {
        return;
      }

      if (this.isOpen() && !backdrop) {
        backdrop = document.createElement('div');
        backdrop.classList.add('backdrop');
        document.body.appendChild(backdrop);
        backdrop.addEventListener('click', handleBackdropClick);
      } else {
        cleanup();
      }
    });

    inject(DestroyRef).onDestroy(cleanup);
  }

  private _handleOpenTrigger() {
    effect((onCleanup) => {
      const triggerElement = this.innerAnswersTrigger()?.nativeElement;

      if (!triggerElement) {
        return;
      }

      const addEventListener = getAddEventListener(onCleanup);

      switch (this.multiAnswerCellConfig().triggerAction) {
        case 'hold':
          addEventListener(triggerElement, ['touchstart', 'mousedown'], () => {
            this.isOpen.set(true);
          });
          addEventListener(
            document,
            ['touchcancel', 'touchend', 'mouseup'],
            () => setTimeout(() => this.isOpen.set(false)),
          );
          break;
        case 'context-menu':
          // contextmenu doesn't work on ios, so we need to simulate it
          let pressTimer: ReturnType<typeof setTimeout> | undefined;
          addEventListener(triggerElement, ['touchstart', 'mousedown'], () => {
            pressTimer = setTimeout(() => {
              this.isOpen.set(true);
              this._isContextMenuInProgress = true;
            }, 300);
          });
          addEventListener(
            triggerElement,
            ['touchcancel', 'touchend', 'mouseup', 'touchmove'],
            () => {
              clearTimeout(pressTimer);
              setTimeout(() => (this._isContextMenuInProgress = false));
            },
          );
          break;
      }
    });
  }

  private _handleAnswerSelection() {
    const answerSelectedEvent = computed(
      (): AnswerSelectedEvent<GAnswer> | null => {
        const cellConfig = this.cell();
        if (isMultiAnswerCell(cellConfig)) {
          return {
            ...getMultiCellIterator(cellConfig).next().value,
            source: 'multi',
          };
        }

        const answerConfig = normalizeAnswerConfig(cellConfig);
        if (!answerConfig || !answerConfig.answer) {
          return null;
        }

        return {
          ...answerConfig,
          answer: answerConfig.answer, // for typescript
        };
      },
    );
    const hasAnswer = computed(() => !!answerSelectedEvent());

    const parentCellComponent = inject(AnswerCellComponent, {
      optional: true,
      skipSelf: true,
    });

    // Click trigger
    effect((onCleanup) => {
      if (!hasAnswer()) {
        return;
      }

      const addEventListener = getAddEventListener(onCleanup);

      addEventListener(this.elementRef.nativeElement, 'click', () => {
        this.answerSelected.emit(untracked(answerSelectedEvent)!);
      });
    });

    // hover released trigger
    let isInside = false;
    let touchTimeout: number | undefined;
    effect((onCleanup) => {
      if (
        !hasAnswer() ||
        !parentCellComponent?.isOpen() ||
        parentCellComponent?.multiAnswerCellConfig().triggerAction !== 'hold'
      ) {
        return;
      }

      const addEventListener = getAddEventListener(onCleanup);

      // Select answer on release (if parent is of trigger 'hold')
      addEventListener(document, ['touchend', 'touchcancel', 'mouseup'], () => {
        if (!isInside) {
          return;
        }

        if (isInside) {
          touchTimeout = setTimeout(() => {
            // prevent click and touch from both triggering
            touchTimeout = undefined;
          }, 10);
          this.answerSelected.emit(untracked(answerSelectedEvent)!);
          isInside = false;
        }
      });

      addEventListener(document, ['touchmove', 'touchstart'], ($event) => {
        const { clientX, clientY } = $event.touches[0];
        const touchedElement = document.elementFromPoint(clientX, clientY);
        isInside =
          touchedElement === this.elementRef.nativeElement ||
          this.elementRef.nativeElement.contains(touchedElement);
      });

      addEventListener(this.elementRef.nativeElement, 'mouseenter', () => {
        if (touchTimeout) {
          return;
        }
        isInside = true;
      });
      addEventListener(this.elementRef.nativeElement, 'mouseleave', () => {
        isInside = false;
      });
    });
  }

  isEmptyLayout(innerAnswersList: AnswerList) {
    if (Array.isArray(innerAnswersList)) {
      return innerAnswersList.length === 0;
    }
    return innerAnswersList.rows.length === 0;
  }
}
