import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup, StateSubject} from 'dd-rxjs';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {normalizeTranspose, textToLines} from '../../data/track';

@Component({
  selector: 'app-track-text',
  templateUrl: './track-text.component.html',
  styleUrls: ['./track-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackTextComponent implements OnDestroy {
  @RxCleanup() private readonly data$ = new StateSubject<string>(null);
  @RxCleanup() public readonly transpose$ = new StateSubject(0);

  readonly trackByIndex = trackByIndex;

  @Input() set text(val: string) {
    this.data$.next(val || null);
  }

  @Input() set transpose(val: number) {
    this.transpose$.next(normalizeTranspose(val ?? 0));
  }

  public readonly lines$ = combineLatest([this.data$, this.transpose$]).pipe(map(([data, transpose]) => textToLines(data, transpose)));

  addTranspose = (add: number) => {
    this.transpose = this.transpose$.value + add;
  };

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
