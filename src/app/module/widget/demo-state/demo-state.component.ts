import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import { DoneSubject } from 'dd-rxjs';

@Component({
  selector: 'app-demo-state',
  templateUrl: './demo-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoStateComponent implements OnDestroy {
  constructor(private redux: ReduxService) { }

  private readonly done$ = new DoneSubject();

  readonly state$ = this.redux.watch(state => state, this.done$);

  ngOnDestroy() { this.done$.done(); }
}
