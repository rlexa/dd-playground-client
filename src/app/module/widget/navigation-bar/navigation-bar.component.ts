import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';

export interface NavigationBarItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  @Input() layout: 'row' | 'column' = 'row';
  @Input() items: NavigationBarItem[] = null;

  trackByIndex = trackByIndex;
}
