import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-included-answers-button',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './included-answers-button.component.html',
  styleUrls: ['./included-answers-button.component.scss'],
})
export class IncludedAnswersButtonComponent {
  @Input({ required: true })
  included!: boolean;
}
