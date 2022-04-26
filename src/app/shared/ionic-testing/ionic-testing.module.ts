import { NgModule } from '@angular/core';
import { AlertControllerMock } from './services/alert-controller.mock';

@NgModule({
  providers: [
    ...AlertControllerMock.providers,
  ]
})
export class IonicTestingModule { }
