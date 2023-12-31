import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer';
import {NavigationBarComponent, NavigationBarItemsFromRouteDirective} from '../navigation-bar';
import {DiDashboardVisibilityFooter} from './di-dashboard-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FooterComponent, NavigationBarComponent, NavigationBarItemsFromRouteDirective, RouterModule],
})
export class DashboardComponent {
  readonly isVisibleFooter$ = inject(DiDashboardVisibilityFooter);
}
