import { Component } from "@angular/core";
import { VersionService } from "../version.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  constructor(public readonly versionService: VersionService) {}
}
