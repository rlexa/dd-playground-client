import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-navigation-content',
  templateUrl: './navigation-content.component.html',
  styleUrls: ['./navigation-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContentComponent {}
