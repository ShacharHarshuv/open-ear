import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class FieldInfoComponent {
  static instanceIndex: number = 0;
  readonly instanceIndex = FieldInfoComponent.instanceIndex++;
  isOpened: boolean = false;

  @Input()
  message: string = '';
}
