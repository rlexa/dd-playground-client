import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {DiGlobalVersion} from 'src/app/di-global';
import {RouteBuildConfig, RouteDashboard} from 'src/app/routing';
import {DashboardRoute} from '../dashboard/dashboard-route';

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

  onGotoSettings = () => this.router.navigate([RouteDashboard, DashboardRoute.Settings, RouteBuildConfig]);
}
