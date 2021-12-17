import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-frame',
  templateUrl: './modal-frame.component.html',
  styleUrls: ['./modal-frame.component.scss'],
  exportAs: 'modal',
})
export class ModalFrameComponent {
  @Input()
  title: string;

  @Input()
  padding: boolean = true;

  constructor(
    private _modalController: ModalController,
  ) { }

  async close(): Promise<void> {
    await this._modalController.dismiss();
  }

}
