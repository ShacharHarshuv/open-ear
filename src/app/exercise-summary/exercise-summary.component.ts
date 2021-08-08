import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { IExercise } from '../exercise/IExercise';

@Component({
  selector: 'app-exercise-summary',
  templateUrl: './exercise-summary.component.html',
  styleUrls: ['./exercise-summary.component.scss'],
})
export class ExerciseSummaryComponent {
  @Input()
  exercise: IExercise;
}
