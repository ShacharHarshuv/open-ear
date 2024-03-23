import { Injectable } from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { MockExercise } from './MockExercise';
import Exercise from './exercise-logic';
import { ExerciseService } from './exercise.service';

@Injectable()
export class ExerciseMockService implements PublicMembers<ExerciseService> {
  static mockExercise: Exercise.Exercise = MockExercise.create();

  getExercise(id: string): Exercise.Exercise {
    return ExerciseMockService.mockExercise;
  }

  getExerciseList(): Exercise.Exercise[] {
    return [ExerciseMockService.mockExercise];
  }
}
