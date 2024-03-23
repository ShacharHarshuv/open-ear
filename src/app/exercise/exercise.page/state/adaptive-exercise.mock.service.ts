import { Injectable } from '@angular/core';
import { PublicMembers } from '../../../shared/ts-utility/PublicMembers';
import Exercise from '../../exercise-logic';
import { AdaptiveExercise } from './adaptive-exercise';
import { AdaptiveExerciseService } from './adaptive-exercise.service';

@Injectable()
export class AdaptiveExerciseMock implements PublicMembers<AdaptiveExercise> {
  summary: string = '';
  id: string = '';
  name: string = '';
  explanation: Exercise.ExerciseExplanationContent = '';
  isPlayWrongAnswerSupported = false;

  getSettingsDescriptor(): Exercise.SettingsControlDescriptor<
    { [p: string]: Exercise.SettingValueType },
    string | number
  >[] {
    return [];
  }

  updateSettings(settings: {
    [key: string]: Exercise.SettingValueType;
  }): void {}

  getCurrentSettings(): { [key: string]: Exercise.SettingValueType } {
    throw new Error('Method not implemented.');
  }

  getAnswerList(): Exercise.AnswerList<string> {
    throw new Error('Method not implemented.');
  }

  getQuestion(): Exercise.Question<string> {
    throw new Error('Method not implemented.');
  }

  reportAnswerCorrectness(wasAnswerRight: boolean | 'SKIPPED'): void {}

  reset(): void {}
}

@Injectable()
export class AdaptiveExerciseMockService
  implements PublicMembers<AdaptiveExerciseService>
{
  static adaptiveExerciseMock: AdaptiveExerciseMock =
    new AdaptiveExerciseMock();

  createAdaptiveExercise(exercise: Exercise.Exercise): AdaptiveExercise {
    return AdaptiveExerciseMockService.adaptiveExerciseMock as AdaptiveExercise;
  }
}
