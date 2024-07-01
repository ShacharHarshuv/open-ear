import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, computed, forwardRef, inject, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnswerList } from '../../../../../../exercise-logic';
import { AnswersLayoutComponent } from '../../../answers-layout.component';
import { AnswerCellComponent } from '../answer-cell.component';

@Component({
  selector: 'app-inner-answers',
  standalone: true,
  imports: [
    forwardRef(() => AnswersLayoutComponent),
    IonicModule,
    CdkConnectedOverlay,
  ],
  templateUrl: `inner-answers.component.html`,
  styles: `
    ion-card {
      margin: 0;
      padding: 0.5em;
    }
  `,
})
export class InnerAnswersComponent {
  readonly answerCellComponent = inject(AnswerCellComponent);
  readonly targetElement = input.required<HTMLElement>();
  readonly isOpen = this.answerCellComponent.isOpen;
  readonly innerAnswerList = input.required<AnswerList>();
  readonly side = input.required<'bottom' | 'top'>();
  readonly overlayPositions = computed((): ConnectedPosition[] => {
    return [
      {
        originX: 'center',
        originY: this.side() === 'top' ? 'top' : 'bottom',
        overlayX: 'center',
        overlayY: this.side() === 'top' ? 'bottom' : 'top',
      },
    ];
  });
}
