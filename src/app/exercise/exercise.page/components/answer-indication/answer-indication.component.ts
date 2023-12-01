import { Component, Input, HostBinding } from '@angular/core';


@Component({
  selector: 'app-answer-indication',
  templateUrl: './answer-indication.component.html',
  styleUrls: ['./answer-indication.component.scss'],
  standalone: true,
  imports: [],
})
export class AnswerIndicationComponent {
  @Input()
  answerDisplay: string | null = null;

  @HostBinding('class.--focused')
  @Input()
  isFocused: boolean = false;

  @HostBinding('class.--wrong')
  @Input()
  wasAnsweredWrong: boolean = false;
}
