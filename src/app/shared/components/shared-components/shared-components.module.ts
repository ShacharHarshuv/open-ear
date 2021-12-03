import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPaddingDirective } from './content-padding.directive';
import {PlayOnClickDirective} from "./play-on-click.directive";
import {InfoPanelComponent} from "./info-panel/info-panel.component";

@NgModule({
  declarations: [
    ContentPaddingDirective,
    PlayOnClickDirective,
    InfoPanelComponent,
  ],
  exports: [
    ContentPaddingDirective,
    PlayOnClickDirective,
    InfoPanelComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedComponentsModule { }
