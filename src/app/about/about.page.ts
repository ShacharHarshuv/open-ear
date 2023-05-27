import { Component, inject } from '@angular/core';
import { VersionService } from '../version.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  readonly versionService = inject(VersionService);
}
