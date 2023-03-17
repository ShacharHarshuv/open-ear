import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseService } from './exercise.service';
import { Injectable, Provider } from '@angular/core';
import { Exercise } from './Exercise';
import { MockExercise } from './MockExercise';

@Injectable()
export class ExerciseMockService implements PublicMembers<ExerciseService> {
  static mockExercise: Exercise.Exercise = MockExercise.create();

  getExercise(id: string): Exercise.Exercise {
    return ExerciseMockService.mockExercise;
  }

  getExerciseList(): Exercise.Exercise[] {
    return [ExerciseMockService.mockExercise];
  }

  static providers: Provider[] = [
    ExerciseMockService,
    {
      provide: ExerciseService,
      useExisting: ExerciseMockService,
    },
  ];
}
