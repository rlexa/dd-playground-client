import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import { DoneSubject } from 'app/rx';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent implements OnDestroy {
  constructor(private redux: ReduxService) { }

  private readonly done$ = new DoneSubject();

  readonly data$ = this.redux.watch(state => state.globalValues.flags);

  ngOnDestroy() { this.done$.done(); }
}
