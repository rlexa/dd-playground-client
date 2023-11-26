import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {IconPipe} from '../../pipe/icon';

export interface NavigationBarItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatTooltipModule, IconPipe],
})
export class NavigationBarComponent {
  @Input() layout: 'row' | 'column' = 'row';
  @Input() items?: NavigationBarItem[] | null;
}
