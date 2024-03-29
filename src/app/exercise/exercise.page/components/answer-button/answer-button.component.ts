import { Component, Input } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-answer-button',
  standalone: true,
  imports: [DragDropModule, IonicModule],
  templateUrl: './answer-button.component.html',
  styleUrls: ['./answer-button.component.scss'],
})
export class AnswerButtonComponent {
  @Input()
  disabled: boolean = false;

  @Input()
  right: boolean = false;

  @Input()
  highlighted = false;

  @Input()
  wrong = false;
}
