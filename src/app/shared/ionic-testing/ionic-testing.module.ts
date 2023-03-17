import { NgModule } from '@angular/core';
import { AlertControllerMock } from './services/alert-controller.mock';
import { ToastControllerMock } from './services/toaster-controller.mock';
import { ModalControllerMock } from './services/modal-controller.mock';

@NgModule({
  providers: [
    ...AlertControllerMock.providers,
    ...ToastControllerMock.providers,
    ...ModalControllerMock.providers,
  ],
})
export class IonicTestingModule {}
