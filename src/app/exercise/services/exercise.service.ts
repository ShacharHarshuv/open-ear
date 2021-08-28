import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { IntervalExercise } from '../exercises/IntervalExercise';
import IExercise = Exercise.IExercise;
import { Exercise } from '../Exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly _exerciseList: IExercise[] = [
    new IntervalExercise(),
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
