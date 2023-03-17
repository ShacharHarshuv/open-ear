import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from "@angular/core";
import { Exercise } from "../../../Exercise";

@Component({
  selector: 'app-answers-layout',
  templateUrl: './answers-layout.component.html',
  styleUrls: ['./answers-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersLayoutComponent<GAnswer extends string = string> {
  @Input()
  answerList: Exercise.AnswerList<GAnswer>;

  @Input()
  buttonTemplate: TemplateRef<Exercise.AnswerConfig<GAnswer>>;

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
