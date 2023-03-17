import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PureFunctionPipe } from './pure-function.pipe';

@NgModule({
  declarations: [PureFunctionPipe],
  imports: [CommonModule],
  exports: [PureFunctionPipe],
})
export class PureFunctionPipeModule {}
