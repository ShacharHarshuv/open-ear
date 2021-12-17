import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutPage} from "./about.page";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {SharedComponentsModule} from "../shared/components/shared-components/shared-components.module";
import {AppVersion} from "@ionic-native/app-version/ngx";
import { ModalModule } from '../shared/modal/modal.module';



@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutPage,
      }
    ]),
    ModalModule
  ],
  providers: [
    AppVersion,
  ]
})
export class AboutModule { }
