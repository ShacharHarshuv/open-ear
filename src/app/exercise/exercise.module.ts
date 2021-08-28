import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisePage } from './exercise.page/exercise.page';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ExercisePage,
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
  ]
})
export class ExerciseModule { }
