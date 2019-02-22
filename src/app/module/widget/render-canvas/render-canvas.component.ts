import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Engine, EngineNodeFillCanvasColor } from './engine';

@Component({
  selector: 'app-render-canvas',
  templateUrl: './render-canvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderCanvasComponent implements OnDestroy, OnInit {
  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly height$ = new BehaviorSubject(400);
  @RxCleanup() readonly width$ = new BehaviorSubject(400);
  @RxCleanup() readonly engine$ = new BehaviorSubject(new Engine());

  ngOnDestroy() {
    this.engine$.value.ngOnDestroy();
  }

  ngOnInit() {
    combineLatest(this.engine$, this.height$, this.width$)
      .pipe(
        debounceTime(0),
        filter(params => params.every(_ => !!_)),
        takeUntil(this.done$))
      .subscribe(([engine]) => engine.setCanvasId('render-canvas'));

    of(this.engine$.value)
      .subscribe(engine => engine.root.addNode(new EngineNodeFillCanvasColor(engine, 'pink', 'bg')));
  }
}
