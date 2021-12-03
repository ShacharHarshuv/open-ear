import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IntervalExercise } from '../../exercises/IntervalExercise/IntervalExercise';
import IExercise = Exercise.IExercise;
import { Exercise } from '../../Exercise';
import { ChordsInKeyExercise } from '../../exercises/ChordsInKeyExercise';
import { NotesInKeyExercise } from '../../exercises/NotesInKeyExercise';
import { ChordTypeInKeyExercise } from '../../exercises/ChordTypeInKeyExercise';
import { TriadInversionExercise } from '../../exercises/TriadInversionExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly _exerciseList: IExercise[] = [
    new IntervalExercise() as unknown as IExercise, // TODO(OE-27)
    new NotesInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new ChordsInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new ChordTypeInKeyExercise() as unknown as IExercise, // TODO(OE-27)
    new TriadInversionExercise() as unknown as IExercise, // TODO(OE-27)
  ];
  private readonly _exerciseIdToExercise = _.keyBy(this._exerciseList, 'id');

  constructor() {
  }

  getExercise(id: string): IExercise {
    return this._exerciseIdToExercise[id];
  }

  getExerciseList(): IExercise[] {
    return this._exerciseList;
  }
}
