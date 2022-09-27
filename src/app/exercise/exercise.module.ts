import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePage } from './exercise.page/exercise.page';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';
import { ExerciseSettingsPage } from './exercise.page/components/exercise-settings.page/exercise-settings.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AnswerIndicationComponent } from './exercise.page/components/answer-indication/answer-indication.component';
import { ListSelectComponent } from './exercise.page/components/exercise-settings.page/components/list-select/list-select.component';
import { SharedComponentsModule } from '../shared/components/shared-components/shared-components.module';
import { ExerciseExplanationPage } from './exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page';
import { ExerciseExplanationContentDirective } from './exercise.page/components/exercise-help/exercise-explanation/exercise-explanation-content.directive';
import { ExerciseService } from './exercise.service';
import { ModalModule } from '../shared/modal/modal.module';
import { PureFunctionPipe } from '../shared/ng-utilities/pure-function-pipe/pure-function.pipe';
import { ConsoleLogComponentModule } from '../shared/ng-utilities/console-log-component/console-log-component.module';
import { IncludedAnswersComponent } from './exercise.page/components/exercise-settings.page/components/included-answers/included-answers.component';
import { AnswersLayoutComponent } from './exercise.page/components/answers-layout/answers-layout.component';
import { FieldInfoComponent } from './exercise.page/components/exercise-settings.page/components/field-info/field-info.component';
import { BdcWalkModule } from 'bdc-walkthrough';
import { ExerciseControlDirective } from './exercise.page/components/exercise-settings.page/directives/exercise-control.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LongPressModule } from '../shared/ng-utilities/long-press/long-press.module';

@NgModule({
  declarations: [
    ExercisePage,
    ExerciseSettingsPage,
    ExerciseExplanationPage,
    AnswerIndicationComponent,
    ListSelectComponent,
    IncludedAnswersComponent,
    ExerciseExplanationContentDirective,
    ...ExerciseService.ngComponents,
    PureFunctionPipe,
    AnswersLayoutComponent,
    FieldInfoComponent,
    ExerciseControlDirective,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ModalModule,
    ConsoleLogComponentModule,
    BdcWalkModule,
    DragDropModule,
    LongPressModule,
  ],
})
export class ExerciseModule {
}
