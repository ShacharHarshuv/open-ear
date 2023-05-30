import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import Exercise, { AnswerList, AnswerConfig } from '../../../exercise-logic';

@Component({
  selector: 'app-answers-layout',
  templateUrl: './answers-layout.component.html',
  styleUrls: ['./answers-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersLayoutComponent<GAnswer extends string = string> {
  @Input()
  answerList: AnswerList<GAnswer> = [];

  @Input()
  // @ts-ignore
  buttonTemplate: TemplateRef<AnswerConfig<GAnswer>>;

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
