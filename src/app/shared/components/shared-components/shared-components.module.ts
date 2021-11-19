import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPaddingDirective } from './content-padding.directive';



@NgModule({
  declarations: [
    ContentPaddingDirective
  ],
  exports: [
    ContentPaddingDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedComponentsModule { }
