import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ExerciseService } from './exercise.service';
import { Injectable, Provider } from '@angular/core';
import { Exercise } from './Exercise';
import { MockExercise } from './MockExercise';

@Injectable()
export class ExerciseMockService implements PublicMembers<ExerciseService> {
  getExercise(id: string): Exercise.IExercise {
    return new MockExercise(id);
  }

  getExerciseList(): Exercise.IExercise[] {
    return [new MockExercise()];
  }

  static providers: Provider[] = [
    ExerciseMockService,
    {
      provide: ExerciseService,
      useExisting: ExerciseMockService,
    }
  ]

}
