import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePage } from './exercise.page/exercise.page';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';
import { ExerciseSettingsPage } from './exercise.page/components/exercise-settings.page/exercise-settings.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExercisePage,
    ExerciseSettingsPage,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class ExerciseModule { }
