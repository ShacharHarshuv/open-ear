import { Component } from '@angular/core';
import { collapseVertical } from '../../../animations';
import { fade } from '../../../animations/fade';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [collapseVertical, fade],
})
export class CollapsibleComponent {
  isCollapsed = true;
}
