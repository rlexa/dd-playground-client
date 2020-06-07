import {ChangeDetectionStrategy, Component} from '@angular/core';
import {watch} from 'dd-rx-state';
import {RxStateService} from 'src/app/rx-state';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent {
  constructor(private rxState: RxStateService) {}

  readonly data$ = this.rxState.state$.pipe(watch((st) => st.globalValues.flags));
}
