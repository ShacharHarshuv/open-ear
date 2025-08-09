import { Injectable, Type, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as _ from 'lodash';
import { Exercise, SettingValueType } from './exercise-logic';
import { intervalExercise } from './exercises/IntervalExercise/intervalExercise';

const exerciseList: Exercise[] = [
  // notesInKeyExercise(),
  // chordInKeyExercise(),
  // commonChordProgressionExercise(),
  // chordsInRealSongsExercise(),
  // chordTypeExercise(),
  // notesWithChordsExercise(),
  // triadInversionExercise(),
  intervalExercise,
];

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly _platform = inject(Platform);
  private readonly _exerciseIdToExercise = _.keyBy(exerciseList, 'id');

  static readonly ngComponents: Type<any>[] = exerciseList
    .map((exercise) => exercise.explanation)
    .filter(
      (explanation): explanation is Type<any> =>
        !!explanation && typeof explanation != 'string',
    );

  getExercise<
    GAnswer extends string,
    GSettings extends { [K in keyof GSettings]: SettingValueType },
  >(id: string) {
    return this._exerciseIdToExercise[id] as Exercise<GAnswer, GSettings>;
  }

  getExerciseList() {
    return exerciseList.filter(
      (exercise) =>
        !exercise.blackListPlatform ||
        !this._platform.is(exercise.blackListPlatform),
    );
  }
}
