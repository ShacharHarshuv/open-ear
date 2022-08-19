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

  @Input()
  closeIcon: string = 'close-outline';

  @Input()
  onClose: () => Promise<any>;

  constructor(
    private _modalController: ModalController,
  ) { }

  async close(): Promise<void> {
    await this._modalController.dismiss(this.onClose ? await this.onClose() : undefined);
  }

}
