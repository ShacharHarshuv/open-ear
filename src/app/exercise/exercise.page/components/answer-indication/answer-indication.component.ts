import {
  Component,
  Input,
  HostBinding
} from '@angular/core';
import { Exercise } from '../../../Exercise';

@Component({
  selector: 'app-answer-indication',
  templateUrl: './answer-indication.component.html',
  styleUrls: ['./answer-indication.component.scss'],
})
export class AnswerIndicationComponent {
  @Input()
  answer: Exercise.Answer | null = null;

  @HostBinding('class.--focused')
  @Input()
  isFocused: boolean = false;

  @HostBinding('class.--wrong')
  @Input()
  wasAnsweredWrong: boolean = false;

  constructor() { }
}
