import { PublicMembers } from '../../../shared/ts-utility/PublicMembers';
import { AdaptiveExerciseService } from './adaptive-exercise.service';
import {
  Injectable,
  Provider,
} from '@angular/core';
import {
  Exercise,
} from '../../Exercise';
import { AdaptiveExercise } from './adaptive-exercise';

@Injectable()
export class AdaptiveExerciseMock implements PublicMembers<AdaptiveExercise> {
  summary: string = '';
  id: string = ''
  name: string = '';
  explanation: Exercise.ExerciseExplanationContent = '';
  settingsDescriptor: Exercise.SettingsControlDescriptor<{ [key: string]: Exercise.SettingValueType; }>[] | undefined;

  updateSettings(settings: { [key: string]: Exercise.SettingValueType; }): void {
  }

  getCurrentSettings(): { [key: string]: Exercise.SettingValueType; } {
    throw new Error('Method not implemented.');
  }

  getAnswerList(): Exercise.AnswerList<string> {
    throw new Error('Method not implemented.');
  }

  getQuestion(): Exercise.Question<string> {
    throw new Error('Method not implemented.');
  }

  reportAnswerCorrectness(wasAnswerRight: boolean | 'SKIPPED'): void {
  }

  reset(): void {
  }

}

@Injectable()
export class AdaptiveExerciseMockService implements PublicMembers<AdaptiveExerciseService> {
  static providers: Provider[] = [
    AdaptiveExerciseMockService,
    {
      provide: AdaptiveExerciseService,
      useExisting: AdaptiveExerciseMockService,
    }
  ]

  static adaptiveExerciseMock: AdaptiveExerciseMock = new AdaptiveExerciseMock();

  createAdaptiveExercise(exercise: Exercise.IExercise): AdaptiveExercise {
    return AdaptiveExerciseMockService.adaptiveExerciseMock as AdaptiveExercise;
  }

}
