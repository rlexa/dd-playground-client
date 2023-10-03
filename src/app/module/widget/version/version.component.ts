import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {AppRoute} from 'src/app/app-route';
import {DiGlobalVersion} from 'src/app/di-global';
import {DashboardRoute} from '../dashboard/dashboard-route';
import {SystemRoute} from '../route-system/system-route';

@Component({
  selector: 'app-version',
  template: `<button mat-button class="auto-line-height" (click)="onGotoSettings()">
    <label class="deadclick-force">{{ 'v ' + (version$ | async) }}</label>
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class VersionComponent {
  public readonly version$ = inject(DiGlobalVersion);
  private readonly router = inject(Router);

  onGotoSettings = () => this.router.navigate([AppRoute.Dashboard, DashboardRoute.Settings, SystemRoute.BuildConfig]);
}
