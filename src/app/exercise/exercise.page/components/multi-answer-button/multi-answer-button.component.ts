import { Component, Input, Signal, computed, inject } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { AnswerButtonComponent } from '../answer-button/answer-button.component';
import { signalFromProperty } from '../../../../shared/ng-utilities/signalFromProperty';
import { ExerciseStateService } from '../../state/exercise-state.service';
import { MultiAnswerButtonTemplateContext } from '../answers-layout/components/answer-cell/answer-cell.component';
import { ExercisePage } from '../../exercise.page';

@Component({
  selector: 'app-multi-answer-button',
  standalone: true,
  imports: [IonicModule, AnswerButtonComponent],
  templateUrl: './multi-answer-button.component.html',
})
export class MultiAnswerButtonComponent {
  readonly state = inject(ExerciseStateService);
  readonly wrongAnswers = inject(ExercisePage).wrongAnswers;

  @Input({
    required: true,
    alias: 'multiAnswerCell',
  })
  multiAnswerCellInput: MultiAnswerButtonTemplateContext = null!;

  readonly multiAnswerCell: Signal<MultiAnswerButtonTemplateContext> =
    signalFromProperty(this, 'multiAnswerCellInput');

  readonly isHighlighted = computed(() => {
    const highlightedAnswer = this.state.highlightedAnswer();
    return (
      (highlightedAnswer &&
        this.multiAnswerCell().innerAnswers.includes(highlightedAnswer)) ||
      false
    );
  });

  readonly isWrong = computed(() => {
    return this.multiAnswerCell().innerAnswers.every((answer) =>
      this.wrongAnswers().includes(answer)
    );
  });
}
