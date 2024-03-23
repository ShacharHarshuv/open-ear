import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ContentPaddingDirective } from '../shared/components/shared-components/content-padding.directive';
import { VersionService } from '../version.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ContentPaddingDirective],
})
export class AboutPage {
  readonly versionService = inject(VersionService);
}
