import { Injectable } from '@angular/core';
import { IExercise } from '../IExercise';
import * as _ from 'lodash';
import { IntervalExercise } from '../exercises/IntervalExercise';

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
