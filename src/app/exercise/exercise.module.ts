import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BdcWalkModule } from 'bdc-walkthrough';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConsoleLogComponent } from '../shared/ng-utilities/console-log-component/console-log.component';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';

@NgModule({
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    ModalFrameComponent,
    ConsoleLogComponent,
    BdcWalkModule,
    DragDropModule,
  ],
})
export class ExerciseModule {}
