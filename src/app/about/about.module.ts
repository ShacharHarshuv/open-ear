import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPage } from './about.page';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';

@NgModule({
  imports: [
    AboutPage,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutPage,
      },
    ]),
    ModalFrameComponent,
  ],
})
export class AboutModule {}
