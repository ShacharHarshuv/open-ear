import { Injectable, Type } from '@angular/core';
import * as _ from 'lodash';
import { IntervalExercise } from '../../exercises/IntervalExercise/IntervalExercise';
import IExercise = Exercise.IExercise;
import { Exercise } from '../../Exercise';
import { ChordsInKeyExercise } from '../../exercises/ChordInKeyExercise/ChordsInKeyExercise';
import { NotesInKeyExercise } from '../../exercises/NotesInKeyExercise/NotesInKeyExercise';
import { ChordTypeInKeyExercise } from '../../exercises/ChordTypeInKeyExercise';
import { TriadInversionExercise } from '../../exercises/TriadInversionExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  static readonly _exerciseList: IExercise[] = [
    new NotesInKeyExercise() as unknown as IExercise, // TODO(#10)
    new ChordsInKeyExercise() as unknown as IExercise, // TODO(#10)
    new ChordTypeInKeyExercise() as unknown as IExercise, // TODO(#10)
    new TriadInversionExercise() as unknown as IExercise, // TODO(#10)
    new IntervalExercise() as unknown as IExercise, // TODO(#10)
  ];
  private readonly _exerciseIdToExercise = _.keyBy(ExerciseService._exerciseList, 'id');
  static readonly ngComponents: Type<any>[] = ExerciseService._exerciseList
    .map(exercise => exercise.explanation)
    .filter((explanation): explanation is Type<any> => !!explanation && typeof explanation != 'string')

  constructor() {
  }

  getExercise(id: string): IExercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): IExercise[] {
    return ExerciseService._exerciseList;
  }
}
