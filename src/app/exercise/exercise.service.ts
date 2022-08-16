import {
  Injectable,
  Type,
} from '@angular/core';
import * as _ from 'lodash';
import { intervalExercise } from './exercises/IntervalExercise/IntervalExercise';
import { Exercise } from './Exercise';
import { ChordsInKeyExercise } from './exercises/ChordInKeyExercise/ChordsInKeyExercise';
import { CommonChordProgressionsExercise } from './exercises/CommonChordProgressionExercise/CommonChordProgressionsExercise';
import { Platform } from '@ionic/angular';
import IExercise = Exercise.Exercise;
import { triadInversionExercise } from './exercises/TriadInversionExercise/TriadInversionExercise';
import { chordsInRealSongsExercise } from './exercises/ChordsInRealSongsExercise/ChordsInRealSongsExercise';
import { notesWithChordsExercise } from './exercises/NotesWithChords/NotesWithChordsExercise';
import { notesInKeyExercise } from './exercises/NotesInKeyExercise/notesInKeyExercise';
import { chordTypeExercise } from './exercises/ChordTypeInKeyExercise/ChordTypeInKeyExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  static readonly _exerciseList: IExercise[] = [
    notesInKeyExercise(),
    new ChordsInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new CommonChordProgressionsExercise() as unknown as IExercise, // TODO(OE-27)
    chordsInRealSongsExercise(),
    chordTypeExercise(),
    notesWithChordsExercise(),
    triadInversionExercise(),
    intervalExercise(),
  ];
  private readonly _exerciseIdToExercise = _.keyBy(ExerciseService._exerciseList, 'id');
  static readonly ngComponents: Type<any>[] = ExerciseService._exerciseList
    .map(exercise => exercise.explanation)
    .filter((explanation): explanation is Type<any> => !!explanation && typeof explanation != 'string')

  constructor(private readonly _platform: Platform) {
  }

  getExercise(id: string): IExercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): IExercise[] {
    return ExerciseService._exerciseList.filter((exercise: IExercise) => !exercise.blackListPlatform || !this._platform.is(exercise.blackListPlatform));
  }
}
