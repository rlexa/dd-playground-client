import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Theme, themeColor_ } from 'app/game';
import { GameDownColorMap } from 'app/module/widget/game-down/data';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-down-field',
  templateUrl: './game-down-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDownFieldComponent implements OnDestroy {
  @RxCleanup() private readonly done$ = new DoneSubject();
  @RxCleanup() readonly theme$ = new BehaviorSubject(<Theme<GameDownColorMap>>null);
  readonly colorBg$ = this.theme$.pipe(map(themeColor_(ii => ii.fieldBackground)));
  @Input() set theme(val: Theme<GameDownColorMap>) { this.theme$.next(val); }
  ngOnDestroy() { }
}
