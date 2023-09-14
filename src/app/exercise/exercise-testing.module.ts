import { NgModule } from '@angular/core';
import { ExerciseSettingsDataMockService } from '../services/exercise-settings-data.mock.service';
import { ExerciseMockService } from './exercise.mock.service';
import { PlayerMockService } from '../services/player.mock.service';
import { YouTubePlayerMockService } from '../services/you-tube-player.mock.service';
import { ExerciseSettingsDataService } from '../services/exercise-settings-data.service';
import { ExerciseService } from './exercise.service';
import { PlayerService } from '../services/player.service';
import { YouTubePlayerService } from '../services/you-tube-player.service';
import { createMockProviders } from '../shared/testing-utility';
import { AdaptiveExerciseService } from './exercise.page/state/adaptive-exercise.service';
import { AdaptiveExerciseMockService } from './exercise.page/state/adaptive-exercise.mock.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';
import { ConsoleLogComponent } from '../shared/ng-utilities/console-log-component/console-log.component';
import { BdcWalkModule } from 'bdc-walkthrough';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ModalFrameComponent,
    ConsoleLogComponent,
    BdcWalkModule,
    DragDropModule,
  ],
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
