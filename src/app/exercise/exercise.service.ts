import { Injectable, Type, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as _ from 'lodash';
import { Exercise } from './exercise-logic';
import { chordInKeyExercise } from './exercises/ChordInKeyExercise/chordsInKeyExercise';
import { chordTypeExercise } from './exercises/ChordTypeInKeyExercise/chordTypeInKeyExercise';
import { chordsInRealSongsExercise } from './exercises/ChordsInRealSongsExercise/chordsInRealSongsExercise';
import { commonChordProgressionExercise } from './exercises/CommonChordProgressionExercise/commonChordProgressionsExercise';
import { intervalExercise } from './exercises/IntervalExercise/intervalExercise';
import { notesInKeyExercise } from './exercises/NotesInKeyExercise/notesInKeyExercise';
import { notesWithChordsExercise } from './exercises/NotesWithChords/notesWithChordsExercise';
import { triadInversionExercise } from './exercises/TriadInversionExercise/triadInversionExercise';

const exerciseList: Exercise[] = [
  notesInKeyExercise(),
  chordInKeyExercise(),
  commonChordProgressionExercise(),
  chordsInRealSongsExercise(),
  chordTypeExercise(),
  notesWithChordsExercise(),
  triadInversionExercise(),
  intervalExercise(),
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

  getExercise(id: string): Exercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): Exercise[] {
    return exerciseList.filter(
      (exercise: Exercise) =>
        !exercise.blackListPlatform ||
        !this._platform.is(exercise.blackListPlatform),
    );
  }
}
