import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RxStateService } from 'app/rx-state';
import { DoneSubject, RxCleanup } from 'dd-rxjs';

@Component({
  selector: 'app-demo-state',
  templateUrl: './demo-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoStateComponent implements OnDestroy {
  constructor(private rxState: RxStateService) { }
  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly state$ = this.rxState.watch(state => state, this.done$);
  ngOnDestroy() { }
}
