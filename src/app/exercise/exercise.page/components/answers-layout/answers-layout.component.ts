import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import Exercise, { AnswerList, AnswerConfig } from '../../../exercise-logic';
import { PureFunctionPipe } from '../../../../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-answers-layout',
  templateUrl: './answers-layout.component.html',
  styleUrls: ['./answers-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PureFunctionPipe],
})
export class AnswersLayoutComponent<GAnswer extends string = string> {
  @Input()
  answerList: AnswerList<GAnswer> = [];

  @Input()
  // @ts-ignore
  buttonTemplate: { $implicit: TemplateRef<AnswerConfig<GAnswer>> };

  get isAutoLayout() {
    return Array.isArray(this.answerList);
  }

  readonly normalizeAnswerLayoutCellConfig = Exercise.normalizeAnswerConfig;

  isString(
    row:
      | (Exercise.Answer<GAnswer> | Exercise.AnswerConfig<GAnswer> | null)[]
      | string
  ): row is string {
    return typeof row === 'string';
  }
}
