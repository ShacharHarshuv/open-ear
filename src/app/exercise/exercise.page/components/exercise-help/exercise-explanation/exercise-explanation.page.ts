import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exercise-explanation',
  templateUrl: './exercise-explanation.page.html',
  styleUrls: ['./exercise-explanation.page.scss'],
})
export class ExerciseExplanationPage {
  @Input()
  content: string;

  @Input()
  exerciseName: string;
}
