import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routeToSettings } from 'app/routing';
import { RxStateService } from 'app/rx-state';
import { DoneSubject, RxCleanup } from 'dd-rxjs';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent implements OnDestroy {
  constructor(private rxState: RxStateService, private router: Router) { }
  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly version$ = this.rxState.watch(state => state.globalValues.flags.version, this.done$);
  ngOnDestroy() { }
  onGotoSettings = () => routeToSettings(this.router);
}
