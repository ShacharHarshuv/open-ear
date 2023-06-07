import { Component, Input, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnswerButtonComponent } from '../answer-button/answer-button.component';
import { signalFromProperty } from '../../../../shared/ng-utilities/signalFromProperty';
import { ExerciseStateService } from '../../state/exercise-state.service';
import { MultiAnswerButtonTemplateContext } from '../answers-layout/components/answer-cell/answer-cell.component';

@Component({
  selector: 'app-multi-answer-button',
  standalone: true,
  imports: [CommonModule, IonicModule, AnswerButtonComponent],
  templateUrl: './multi-answer-button.component.html',
})
export class MultiAnswerButtonComponent {
  readonly state = inject(ExerciseStateService);

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
    // todo: we can potentially reuse this logic in some way
    const wrongAnswers = this.state
      .currentAnswers()
      .filter((answer) => answer.wasWrong)
      .map((answer) => answer.answer);
    return this.multiAnswerCell().innerAnswers.every((answer) =>
      wrongAnswers.includes(answer)
    );
  });
}
