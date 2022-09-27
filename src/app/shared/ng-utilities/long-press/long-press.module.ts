import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongPressDirective } from './long-press.directive';

@NgModule({
  declarations: [
    LongPressDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LongPressDirective,
  ]
})
export class LongPressModule { }
