import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {watch} from 'dd-rx-state';
import {routeToSettings} from 'src/app/routing';
import {RxStateService} from 'src/app/rx-state';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  constructor(private rxState: RxStateService, private router: Router) {}

  readonly version$ = this.rxState.state$.pipe(watch((state) => state.globalValues.flags.version));

  onGotoSettings = () => routeToSettings(this.router);
}
