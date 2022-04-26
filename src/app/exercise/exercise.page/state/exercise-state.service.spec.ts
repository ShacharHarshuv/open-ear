import { TestBed } from '@angular/core/testing';
import { ExerciseStateService } from './exercise-state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerMockService } from '../../../services/player.mock.service';
import { YouTubePlayerMockService } from '../../../services/you-tube-player.mock.service';
import { ExerciseMockService } from '../../exercise.mock.service';
import { ExerciseSettingsDataMockService } from '../../../services/exercise-settings-data.mock.service';

describe('ExerciseStateService', function() {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExerciseStateService,
        ...ExerciseMockService.providers,
        ...PlayerMockService.providers,
        ...YouTubePlayerMockService.providers,
        ...ExerciseSettingsDataMockService.providers,
      ],
      imports: [
        RouterTestingModule,
      ]
    })
  })
});
