import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IntervalExercise } from '../../exercises/IntervalExercise';
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
    // @ts-ignore // TODO(OE-27)
    new IntervalExercise(),
    // @ts-ignore // TODO(OE-27)
    new NotesInKeyExercise(),
    // @ts-ignore // TODO(OE-27)
    new ChordsInKeyExercise(),
    // @ts-ignore // TODO(OE-27)
    new ChordTypeInKeyExercise(),
    // @ts-ignore // TODO(OE-27)
    new TriadInversionExercise(),
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
