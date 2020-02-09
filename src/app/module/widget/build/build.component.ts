import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {RxStateService} from 'src/app/rx-state';
import {DoneSubject, RxCleanup} from 'dd-rxjs';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildComponent implements OnDestroy {
  constructor(private rxState: RxStateService) {}
  @RxCleanup() private readonly done$ = new DoneSubject();
  readonly data$ = this.rxState.watch(state => state.globalValues.flags, this.done$);
  ngOnDestroy() {}
}
