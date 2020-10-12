import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationBarItem} from '../navigation-bar';
import {DiDashboardVisibilityFooter} from './di-dashboard-options';

export interface DashboardComponentRouteData extends Data {
  navs: NavigationBarItem[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    @Inject(DiDashboardVisibilityFooter) public readonly isVisibleFooter$: Observable<boolean>,
  ) {}

  readonly navs$ = this.activatedRoute.data.pipe(map((data: DashboardComponentRouteData) => data?.navs ?? null));
}
