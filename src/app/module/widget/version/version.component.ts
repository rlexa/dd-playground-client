import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReduxService } from 'app/redux';
import { routeToSettings } from 'app/routing';
import { DoneSubject, RxCleanup } from 'dd-rxjs';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnDestroy {
  constructor(private redux: ReduxService, private router: Router) { }
  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly version$ = this.redux.watch(state => state.globalValues.flags.version, this.done$);
  ngOnDestroy() { }
  onGotoSettings = () => routeToSettings(this.router);
}
