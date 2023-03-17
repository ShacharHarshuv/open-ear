import { Injectable } from '@angular/core';
import { Exercise } from '../../Exercise';
import { AdaptiveExercise } from './adaptive-exercise';

@Injectable({
  providedIn: 'root',
})
export class AdaptiveExerciseService {
  createAdaptiveExercise(exercise: Exercise.Exercise): AdaptiveExercise {
    return new AdaptiveExercise(exercise);
  }
}
