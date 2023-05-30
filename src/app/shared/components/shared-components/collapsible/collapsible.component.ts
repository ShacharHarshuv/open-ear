import { Component } from '@angular/core';
import { collapseVertical } from '../../../animations';
import { fade } from '../../../animations/fade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [collapseVertical, fade],
  standalone: true,
  imports: [CommonModule],
})
export class CollapsibleComponent {
  isCollapsed = true;
}
