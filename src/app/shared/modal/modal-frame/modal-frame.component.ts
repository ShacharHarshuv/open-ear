import { Component, Input, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { ContentPaddingDirective } from '../../components/shared-components/content-padding.directive';

@Component({
  selector: 'app-modal-frame',
  templateUrl: './modal-frame.component.html',
  styleUrls: ['./modal-frame.component.scss'],
  exportAs: 'modal',
  standalone: true,
  imports: [IonicModule, ContentPaddingDirective],
})
export class ModalFrameComponent {
  private _modalController = inject(ModalController);

  @Input()
  title: string = '';

  @Input()
  padding: boolean = true;

  @Input()
  closeIcon: string = 'close-outline';

  @Input()
  onClose: () => Promise<any> = async () => {};

  async close(): Promise<void> {
    await this._modalController.dismiss(
      this.onClose ? await this.onClose() : undefined
    );
  }
}
