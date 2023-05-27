import { NgModule } from '@angular/core';
import { ExerciseSettingsDataMockService } from '../services/exercise-settings-data.mock.service';
import { ExerciseMockService } from './exercise.mock.service';
import { PlayerMockService } from '../services/player.mock.service';
import { YouTubePlayerMockService } from '../services/you-tube-player.mock.service';
import { ExerciseModule } from './exercise.module';
import { ExerciseSettingsDataService } from '../services/exercise-settings-data.service';
import { ExerciseService } from './exercise.service';
import { PlayerService } from '../services/player.service';
import { YouTubePlayerService } from '../services/you-tube-player.service';
import { createMockProviders } from '../shared/testing-utility';
import { AdaptiveExerciseService } from './exercise.page/state/adaptive-exercise.service';
import { AdaptiveExerciseMockService } from './exercise.page/state/adaptive-exercise.mock.service';

@NgModule({
  imports: [ExerciseModule],
  providers: [
    ...createMockProviders(
      ExerciseSettingsDataMockService,
      ExerciseSettingsDataService
    ),
    ...createMockProviders(ExerciseMockService, ExerciseService),
    ...createMockProviders(PlayerMockService, PlayerService),
    ...createMockProviders(YouTubePlayerMockService, YouTubePlayerService),
    ...createMockProviders(
      AdaptiveExerciseMockService,
      AdaptiveExerciseService
    ),
  ],
})
export class ExerciseTestingModule {}
