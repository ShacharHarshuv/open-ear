import { Injectable, Type, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as _ from 'lodash';
import { Exercise, SettingValueType } from './exercise-logic';
import { chordInKeyExercise } from './exercises/ChordInKeyExercise/chordsInKeyExercise';
import { chordTypeExercise } from './exercises/ChordTypeInKeyExercise/chordTypeInKeyExercise';
import { intervalExercise } from './exercises/IntervalExercise/intervalExercise';
import { notesWithChordsExercise } from './exercises/NotesWithChords/notesWithChordsExercise';
import { triadInversionExercise } from './exercises/TriadInversionExercise/triadInversionExercise';

const exerciseList: Exercise[] = [
  // notesInKeyExercise,
  chordInKeyExercise,
  // commonChordProgressionExercise(),
  // chordsInRealSongsExercise(),
  chordTypeExercise,
  notesWithChordsExercise,
  triadInversionExercise,
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
