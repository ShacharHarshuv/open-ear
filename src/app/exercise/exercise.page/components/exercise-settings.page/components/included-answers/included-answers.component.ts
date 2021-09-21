import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-included-answers',
  templateUrl: './included-answers.component.html',
  styleUrls: ['./included-answers.component.scss'],
})
export class IncludedAnswersComponent {
  @Input()
  allAvailableAnswers: string[];
}
