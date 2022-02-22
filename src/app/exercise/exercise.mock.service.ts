import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseService } from './exercise.service';
import { Injectable, Provider } from '@angular/core';
import { Exercise } from './Exercise';

@Injectable()
export class ExerciseMockService implements PublicMembers<ExerciseService> {
  getExercise(id: string): Exercise.IExercise {
    throw new Error(`ExerciseMockService does not provide mock exercise. Spy on getExercise to pass a mock exercise`)
  }

  getExerciseList(): Exercise.IExercise[] {
    return [];
  }

  static providers: Provider[] = [
    ExerciseMockService,
    {
      provide: ExerciseService,
      useExisting: ExerciseMockService,
    }
  ]

}
