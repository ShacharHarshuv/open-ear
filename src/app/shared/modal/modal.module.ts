import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalFrameComponent } from "./modal-frame/modal-frame.component";
import { IonicModule } from "@ionic/angular";
import { SharedComponentsModule } from "../components/shared-components/shared-components.module";

@NgModule({
  declarations: [ModalFrameComponent],
  imports: [CommonModule, IonicModule, SharedComponentsModule],
  exports: [ModalFrameComponent],
})
export class ModalModule {}
