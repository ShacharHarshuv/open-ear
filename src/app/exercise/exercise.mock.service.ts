import { Provider } from '@angular/core';
import { createMockProviders } from '../shared/testing-utility';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import Exercise, { SettingValueType } from './exercise-logic';
import { ExerciseService } from './exercise.service';
import { mockExercise } from './mock-exercise';

export function provideMockExerciseService(
  exercise = mockExercise,
): Provider[] {
  class ExerciseMockService implements PublicMembers<ExerciseService> {
    getExercise<
      GAnswer extends string,
      GSettings extends { [K in keyof GSettings]: SettingValueType },
    >(id: string) {
      return exercise as Exercise.Exercise<GAnswer, GSettings>;
    }

    getExerciseList(): Exercise.Exercise[] {
      return [exercise];
    }
  }

  return createMockProviders(ExerciseMockService, ExerciseService);
}
