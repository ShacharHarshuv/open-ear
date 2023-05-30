import { Component, Input } from '@angular/core';
import Exercise from '../../../../../exercise-logic';
import {
  BaseControlValueAccessorComponent,
  getNgValueAccessorProvider,
} from '../../../../../../shared/ts-utility';
import { IonicModule } from '@ionic/angular';
import { AnswersLayoutComponent } from '../../../answers-layout/answers-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-included-answers',
  templateUrl: './included-answers.component.html',
  styleUrls: ['./included-answers.component.scss'],
  providers: [getNgValueAccessorProvider(IncludedAnswersComponent)],
  standalone: true,
  imports: [CommonModule, IonicModule, AnswersLayoutComponent],
})
export class IncludedAnswersComponent<
  GAnswer extends string
> extends BaseControlValueAccessorComponent<GAnswer[]> {
  @Input()
  answerList: Exercise.AnswerList<GAnswer> = [];

  async toggleInclusion(answer: GAnswer): Promise<void> {
    const currentValue: ReadonlyArray<GAnswer> =
      await this.getCurrentValuePromise();
    if (currentValue.includes(answer)) {
      this.setViewValue(currentValue.filter((value) => value !== answer));
    } else {
      this.setViewValue([...currentValue, answer]);
    }
  }
}
