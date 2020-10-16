import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {DiDashboardVisibilityFooter} from './di-dashboard-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(@Inject(DiDashboardVisibilityFooter) public readonly isVisibleFooter$: Observable<boolean>) {}
}
