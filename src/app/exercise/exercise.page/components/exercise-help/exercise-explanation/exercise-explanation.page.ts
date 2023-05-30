import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalFrameComponent } from '../../../../../shared/modal/modal-frame/modal-frame.component';
import { ExerciseExplanationContentDirective } from './exercise-explanation-content.directive';

@Component({
  selector: 'app-exercise-explanation',
  templateUrl: './exercise-explanation.page.html',
  styleUrls: ['./exercise-explanation.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ModalFrameComponent,
    ExerciseExplanationContentDirective,
  ],
})
export class ExerciseExplanationPage {
  @Input()
  content: string = '';

  @Input()
  exerciseName: string = '';
}
