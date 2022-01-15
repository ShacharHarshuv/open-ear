import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleLogComponent } from './console-log.component';

@NgModule({
  declarations: [
    ConsoleLogComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConsoleLogComponent,
  ]
})
export class ConsoleLogComponentModule { }
