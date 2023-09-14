import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerCellComponent } from './components/answer-cell/answer-cell.component';
import { AnswersRowComponent } from './components/answers-row/answers-row.component';
import { IonicModule } from '@ionic/angular';
import { AnswersLayoutComponent } from './answers-layout.component';

// AnswersLayoutComponent cannot be standalone because of a circular dependency between AnswerCellComponent and AnswersLayoutComponent
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AnswerCellComponent,
    AnswersRowComponent,
    AnswersLayoutComponent,
  ],
  exports: [AnswersLayoutComponent],
})
export class AnswersLayoutModule {}
