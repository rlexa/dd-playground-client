import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RxCleanup, StateSubject} from 'dd-rxjs';
import {map} from 'rxjs/operators';
import {trackByIndex} from 'src/app/util';
import {textToLines} from '../../data/track';

@Component({
  selector: 'app-track-text',
  templateUrl: './track-text.component.html',
  styleUrls: ['./track-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackTextComponent implements OnDestroy {
  @RxCleanup() private readonly data$ = new StateSubject<string>(null);

  readonly trackByIndex = trackByIndex;

  @Input() set text(val: string) {
    this.data$.next(val || null);
  }

  public readonly lines$ = this.data$.pipe(map(textToLines));

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }
}
