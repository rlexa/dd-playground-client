import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DoneSubject, RxCleanup } from 'dd-rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
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
  readonly engine = new Engine();

  readonly nodeStat$ = this.engine.changed$.pipe(debounceTime(0), map(() => this.engine.nodeToStat(this.engine.root)));

  ngOnDestroy() {
    this.engine.ngOnDestroy();
  }

  ngOnInit() {
    combineLatest(this.height$, this.width$)
      .pipe(
        debounceTime(0),
        filter(params => params.every(_ => !!_)),
        takeUntil(this.done$))
      .subscribe(() => this.engine.setCanvasId('render-canvas'));

    this.engine.addNode(new EngineNodeFillCanvasColor('pink', 'bg'));
  }
}
