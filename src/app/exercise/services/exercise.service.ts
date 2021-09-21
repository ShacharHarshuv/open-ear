import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IntervalExercise } from '../exercises/IntervalExercise';
import IExercise = Exercise.IExercise;
import { Exercise } from '../Exercise';
import { NotesInKeyExercise } from '../exercises/NotesInKeyExercise';
import { ChordsInKeyExercise } from '../exercises/ChordsInKeyExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly _exerciseList: IExercise[] = [
    new IntervalExercise(),
    new NotesInKeyExercise(),
    // @ts-ignore
    new ChordsInKeyExercise(),
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
