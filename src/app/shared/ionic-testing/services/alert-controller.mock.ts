import { PublicMembers } from "../../ts-utility/PublicMembers";
import {
  AlertController,
  AlertOptions
} from "@ionic/angular";
import {
  Injectable,
  Provider
} from "@angular/core";

@Injectable()
export class AlertControllerMock implements PublicMembers<AlertController> {
  static providers: Provider[] = [
    AlertControllerMock,
    {
      provide: AlertController,
      useExisting: AlertControllerMock,
    },
  ];

  create(opts?: AlertOptions): Promise<HTMLIonAlertElement> {
    throw new Error('Method not implemented.');
  }

  dismiss(data?: any, role?: string, id?: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getTop(): Promise<HTMLIonAlertElement | undefined> {
    throw new Error('Method not implemented.');
  }
}
