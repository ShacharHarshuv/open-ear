import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentPaddingDirective } from "./content-padding.directive";
import { PlayOnClickDirective } from "./play-on-click.directive";
import { InfoPanelComponent } from "./info-panel/info-panel.component";
import { CollapsibleComponent } from "./collapsible/collapsible.component";

@NgModule({
  declarations: [
    ContentPaddingDirective,
    PlayOnClickDirective,
    InfoPanelComponent,
    CollapsibleComponent,
  ],
  exports: [
    ContentPaddingDirective,
    PlayOnClickDirective,
    InfoPanelComponent,
    CollapsibleComponent,
  ],
  imports: [CommonModule],
})
export class SharedComponentsModule {}
