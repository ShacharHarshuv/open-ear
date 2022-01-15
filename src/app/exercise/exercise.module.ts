import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePage } from './exercise.page/exercise.page';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';
import { ExerciseSettingsPage } from './exercise.page/components/exercise-settings.page/exercise-settings.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerIndicationComponent } from './exercise.page/components/answer-indication/answer-indication.component';
import { ListSelectComponent } from './exercise.page/components/exercise-settings.page/components/included-answers/list-select.component';
import { SharedComponentsModule } from '../shared/components/shared-components/shared-components.module';
import { ExerciseExplanationPage } from './exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page';
import { ExerciseExplanationContentDirective } from './exercise.page/components/exercise-help/exercise-explanation/exercise-explanation-content.directive';
import { ExerciseService } from './services/exercise/exercise.service';
import { ModalModule } from '../shared/modal/modal.module';
import { PureFunctionPipe } from '../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import { ConsoleLogComponentModule } from '../shared/ng-utilities/console-log-component/console-log-component.module';

@NgModule({
  declarations: [
    ExercisePage,
    ExerciseSettingsPage,
    ExerciseExplanationPage,
    AnswerIndicationComponent,
    ListSelectComponent,
    ExerciseExplanationContentDirective,
    ...ExerciseService.ngComponents,
    PureFunctionPipe,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ModalModule,
    ConsoleLogComponentModule,
  ],
})
export class ExerciseModule {
}
