import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BdcWalkModule } from 'bdc-walkthrough';
import { ExerciseSettingsDataMockService } from '../services/exercise-settings-data.mock.service';
import { ExerciseSettingsDataService } from '../services/exercise-settings-data.service';
import { PlayerMockService } from '../services/player.mock.service';
import { PlayerService } from '../services/player.service';
import { YouTubePlayerMockService } from '../services/you-tube-player.mock.service';
import { YouTubePlayerService } from '../services/you-tube-player.service';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';
import { ConsoleLogComponent } from '../shared/ng-utilities/console-log-component/console-log.component';
import { createMockProviders } from '../shared/testing-utility';
import { Exercise } from './exercise-logic';
import { provideMockExerciseService } from './exercise.mock.service';

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
      ExerciseSettingsDataService,
    ),
    provideMockExerciseService(),
    ...createMockProviders(PlayerMockService, PlayerService),
    ...createMockProviders(YouTubePlayerMockService, YouTubePlayerService),
  ],
})
export class ExerciseTestingModule {
  static withMockExercise(
    exercise: Exercise,
  ): ModuleWithProviders<ExerciseTestingModule> {
    return {
      ngModule: ExerciseTestingModule,
      providers: [provideMockExerciseService(exercise)],
    };
  }
}
