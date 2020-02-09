import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
import {routeToSettings} from 'src/app/routing';
import {RxStateService} from 'src/app/rx-state';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnDestroy {
  constructor(private rxState: RxStateService, private router: Router) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly version$ = this.rxState.watch(state => state.globalValues.flags.version, this.done$);

  ngOnDestroy() {}

  onGotoSettings = () => routeToSettings(this.router);
}
