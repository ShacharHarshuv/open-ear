import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseService } from './exercise.service';
import { Injectable, Provider } from '@angular/core';
import { Exercise } from './Exercise';
import { MockExercise } from './MockExercise';

@Injectable()
export class ExerciseMockService implements PublicMembers<ExerciseService> {
  static mockExercise: MockExercise = new MockExercise();

  getExercise(id: string): Exercise.IExercise {
    return ExerciseMockService.mockExercise;
  }

  getExerciseList(): Exercise.IExercise[] {
    return [ExerciseMockService.mockExercise];
  }

  static providers: Provider[] = [
    ExerciseMockService,
    {
      provide: ExerciseService,
      useExisting: ExerciseMockService,
    }
  ]

}
