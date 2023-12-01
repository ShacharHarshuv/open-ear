import { Component, inject } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ExerciseService } from '../exercise/exercise.service';
import { Exercise } from '../exercise/exercise-logic';
import { IonicModule } from '@ionic/angular';
import { ExerciseSummaryComponent } from './components/exercise-summary/exercise-summary.component';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExerciseSummaryComponent, RouterLink],
})
export class HomePage {
  private readonly _exerciseService = inject(ExerciseService);

  readonly exerciseList: Exercise[] = this._exerciseService.getExerciseList();
}
