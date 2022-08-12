import {
  Injectable,
  Type,
} from '@angular/core';
import * as _ from 'lodash';
import { intervalExercise } from './exercises/IntervalExercise/IntervalExercise';
import { Exercise } from './Exercise';
import { ChordsInKeyExercise } from './exercises/ChordInKeyExercise/ChordsInKeyExercise';
import { NotesInKeyExercise } from './exercises/NotesInKeyExercise/NotesInKeyExercise';
import { ChordTypeInKeyExercise } from './exercises/ChordTypeInKeyExercise/ChordTypeInKeyExercise';
import { CommonChordProgressionsExercise } from './exercises/CommonChordProgressionExercise/CommonChordProgressionsExercise';
import { NotesWithChordsExercise } from './exercises/NotesWithChords/NotesWithChordsExercise';
import { ChordsInRealSongsExercise } from './exercises/ChordsInRealSongsExercise/ChordsInRealSongsExercise';
import { Platform } from '@ionic/angular';
import IExercise = Exercise.IExercise;

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  static readonly _exerciseList: IExercise[] = [
    new NotesInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new ChordsInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new CommonChordProgressionsExercise() as unknown as IExercise, // TODO(OE-27)
    new ChordsInRealSongsExercise(),
    new ChordTypeInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new NotesWithChordsExercise() as unknown as IExercise, // TODO(OE-27)
    // triadInversionExercise(), // todo
    // new ChordArpeggioExercise() as unknown as IExercise, // TODO(OE-27)
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
