import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {DiGlobalFlags, GlobalFlags} from 'src/app/di-global';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent {
  constructor(@Inject(DiGlobalFlags) public readonly globalFlags$: Observable<GlobalFlags>) {}
}
