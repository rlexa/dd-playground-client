import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DiGlobalVersion} from 'src/app/di-global';
import {routeToSettings} from 'src/app/routing';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  constructor(@Inject(DiGlobalVersion) public readonly version$: Observable<string>, private readonly router: Router) {}

  onGotoSettings = () => routeToSettings(this.router);
}
