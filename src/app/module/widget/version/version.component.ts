import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AppRoute} from 'src/app/app-route';
import {DiGlobalVersion} from 'src/app/di-global';
import {DashboardRoute} from '../dashboard/dashboard-route';
import {SystemRoute} from '../route-system/system-route';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  constructor(@Inject(DiGlobalVersion) public readonly version$: Observable<string>, private readonly router: Router) {}

  onGotoSettings = () => this.router.navigate([AppRoute.Dashboard, DashboardRoute.Settings, SystemRoute.BuildConfig]);
}
