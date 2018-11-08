import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import { DoneSubject, RxCleanup } from 'dd-rxjs';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent implements OnDestroy {
  constructor(private redux: ReduxService) { }
  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly data$ = this.redux.watch(state => state.globalValues.flags, this.done$);
  ngOnDestroy() { }
}
