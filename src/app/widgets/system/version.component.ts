import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from 'app/redux';
import { routeToSettings } from 'app/routing';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  constructor(private redux: ReduxService, private router: Router) { }
  version$ = this.redux.watch(state => state.globalValues.flags.version);
  onGotoSettings = () => routeToSettings(this.router);
}
