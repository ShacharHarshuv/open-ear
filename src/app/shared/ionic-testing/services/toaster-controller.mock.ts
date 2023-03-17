import { PublicMembers } from "../../ts-utility/PublicMembers";
import {
  ToastController,
  ToastOptions
} from "@ionic/angular";
import {
  Injectable,
  Provider
} from "@angular/core";

@Injectable()
export class ToastControllerMock implements PublicMembers<ToastController> {
  static providers: Provider[] = [
    ToastControllerMock,
    {
      provide: ToastController,
      useExisting: ToastControllerMock,
    },
  ];

  create(opts?: ToastOptions): Promise<HTMLIonToastElement> {
    throw new Error('Method not implemented.');
  }

  dismiss(data?: any, role?: string, id?: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getTop(): Promise<HTMLIonToastElement | undefined> {
    throw new Error('Method not implemented.');
  }
}
