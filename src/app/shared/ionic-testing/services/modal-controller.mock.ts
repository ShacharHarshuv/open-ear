import {
  Injectable,
  Provider
} from "@angular/core";
import {
  ModalController,
  ModalOptions
} from "@ionic/angular";
import { PublicMembers } from "../../ts-utility/PublicMembers";

@Injectable()
export class ModalControllerMock implements PublicMembers<ModalController> {
  create(opts: ModalOptions): Promise<HTMLIonModalElement> {
    return Promise.resolve({} as HTMLIonModalElement);
  }

  dismiss(
    data: any,
    role: string | undefined,
    id: string | undefined
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  getTop(): Promise<HTMLIonModalElement | undefined> {
    return Promise.resolve(undefined);
  }

  static providers: Provider[] = [
    ModalControllerMock,
    {
      provide: ModalController,
      useExisting: ModalControllerMock,
    },
  ];
}
