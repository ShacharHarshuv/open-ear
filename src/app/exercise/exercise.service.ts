import { Injectable, Type, inject } from '@angular/core';
import * as _ from 'lodash';
import { intervalExercise } from './exercises/IntervalExercise/intervalExercise';
import Exercise from './exercise-logic';
import { Platform } from '@ionic/angular';
import { triadInversionExercise } from './exercises/TriadInversionExercise/triadInversionExercise';
import { chordsInRealSongsExercise } from './exercises/ChordsInRealSongsExercise/chordsInRealSongsExercise';
import { notesWithChordsExercise } from './exercises/NotesWithChords/notesWithChordsExercise';
import { notesInKeyExercise } from './exercises/NotesInKeyExercise/notesInKeyExercise';
import { chordTypeExercise } from './exercises/ChordTypeInKeyExercise/chordTypeInKeyExercise';
import { chordInKeyExercise } from './exercises/ChordInKeyExercise/chordsInKeyExercise';
import { commonChordProgressionExercise } from './exercises/CommonChordProgressionExercise/commonChordProgressionsExercise';
import IExercise = Exercise.Exercise;

const exerciseList = [
  notesInKeyExercise(),
  chordInKeyExercise(),
  commonChordProgressionExercise(),
  chordsInRealSongsExercise(),
  chordTypeExercise(),
  notesWithChordsExercise(),
  triadInversionExercise(),
  intervalExercise(),
] satisfies IExercise[];

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
        !!explanation && typeof explanation != 'string'
    );

  getExercise(id: string): IExercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): IExercise[] {
    return exerciseList.filter(
      (exercise: IExercise) =>
        !exercise.blackListPlatform ||
        !this._platform.is(exercise.blackListPlatform)
    );
  }
}
