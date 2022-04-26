import {
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { ExerciseStateService } from './exercise-state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerMockService } from '../../../services/player.mock.service';
import { YouTubePlayerMockService } from '../../../services/you-tube-player.mock.service';
import { ExerciseMockService } from '../../exercise.mock.service';
import { ExerciseSettingsDataMockService } from '../../../services/exercise-settings-data.mock.service';
import { IonicTestingModule } from '../../../shared/ionic-testing/ionic-testing.module';
import { AdaptiveExerciseMockService } from './adaptive-exercise.mock.service';

describe('ExerciseStateService', function() {
  let exerciseStateService: ExerciseStateService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        ExerciseStateService,
        ...ExerciseMockService.providers,
        ...PlayerMockService.providers,
        ...YouTubePlayerMockService.providers,
        ...ExerciseSettingsDataMockService.providers,
        ...AdaptiveExerciseMockService.providers,
      ],
      imports: [
        RouterTestingModule,
      ],
    }).compileComponents();

    exerciseStateService = TestBed.inject(ExerciseStateService);
    exerciseStateService.init();
    flush();
  }));

  describe('reset statistics', () => {
    it('should reset total questions', () => {
      exerciseStateService.answer('Answer 1');
      exerciseStateService.answer('Answer 2');
      expect(exerciseStateService.totalCorrectAnswers).toEqual(2);
      expect(exerciseStateService.totalQuestions).toEqual(2);

      exerciseStateService.resetStatistics();
      expect(exerciseStateService.totalCorrectAnswers).toEqual(0);
      expect(exerciseStateService.totalQuestions).toEqual(0);
    });

    it('should reset adaptive exercise memory', () => {
      const adaptiveExerciseResetSpy = spyOn(AdaptiveExerciseMockService.adaptiveExerciseMock, 'reset');
      expect(adaptiveExerciseResetSpy).not.toHaveBeenCalled();
      exerciseStateService.resetStatistics();
      expect(adaptiveExerciseResetSpy).toHaveBeenCalledOnceWith();
    });

    it('should move to next question', () => {
      const moveToNextQuestionSpy = spyOn(exerciseStateService, 'nextQuestion');
      exerciseStateService.resetStatistics();
      expect(moveToNextQuestionSpy).toHaveBeenCalledOnceWith();
    })
  })
});
