import { Component, Input, Signal } from '@angular/core';
import Exercise from '../../../../../exercise-logic';
import {
  BaseControlValueAccessorComponent,
  getNgValueAccessorProvider,
} from '../../../../../../shared/ts-utility';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AnswersLayoutModule } from '../../../answers-layout/answers-layout.module';
import { IncludedAnswersButtonComponent } from './components/included-answers-button/included-answers-button.component';
import { IncludedAnswersMultiAnswerButtonComponent } from './components/included-answers-multi-answer-button/included-answers-multi-answer-button.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-included-answers',
  templateUrl: './included-answers.component.html',
  styleUrls: ['./included-answers.component.scss'],
  providers: [getNgValueAccessorProvider(IncludedAnswersComponent)],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    AnswersLayoutModule,
    IncludedAnswersButtonComponent,
    IncludedAnswersMultiAnswerButtonComponent,
  ],
})
export class IncludedAnswersComponent<
  GAnswer extends string
> extends BaseControlValueAccessorComponent<GAnswer[]> {
  @Input()
  answerList: Exercise.AnswerList<GAnswer> = [];

  readonly includedAnswers: Signal<readonly GAnswer[]> = toSignal(this.value$, {
    initialValue: [],
  });

  toggleInclusion(answer: GAnswer) {
    const currentValue: ReadonlyArray<GAnswer> = this.includedAnswers();
    if (currentValue.includes(answer)) {
      this.setViewValue(currentValue.filter((value) => value !== answer));
    } else {
      this.setViewValue([...currentValue, answer]);
    }
  }
}
