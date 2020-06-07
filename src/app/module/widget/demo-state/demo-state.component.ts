import {ChangeDetectionStrategy, Component} from '@angular/core';
import {watch} from 'dd-rx-state';
import {RxStateService} from 'src/app/rx-state';

@Component({
  selector: 'app-demo-state',
  templateUrl: './demo-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoStateComponent {
  constructor(private rxState: RxStateService) {}

  readonly state$ = this.rxState.state$.pipe(watch((state) => state));
}
