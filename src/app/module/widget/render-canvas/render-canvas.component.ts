import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DoneSubject, RxCleanup, rxNext_ } from 'dd-rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { enEmpty, enFillCanvasColor, Engine, enImageUrl, enText } from './engine';

@Component({
  selector: 'app-render-canvas',
  templateUrl: './render-canvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderCanvasComponent implements OnDestroy, OnInit {
  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly height$ = new BehaviorSubject(400);
  @RxCleanup() readonly width$ = new BehaviorSubject(400);
  @RxCleanup() readonly colorCanvasBg$ = new BehaviorSubject('#ff4afb');
  readonly engine = new Engine();

  readonly nodeStat$ = this.engine.changed$.pipe(debounceTime(0), map(() => this.engine.nodeToStat(this.engine.root)));

  setColorCanvasBg = rxNext_(this.colorCanvasBg$);

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

    this.engine.addNode(enFillCanvasColor(this.colorCanvasBg$, 'bg'));

    const nodeUi = this.engine.addNode(enEmpty('ui'));
    nodeUi.addNode(enImageUrl(this.engine.images, { url: 'assets/sprites/abuse-exp1.png', offsetY: 30, dw: 56, dh: 48 }, 'image'));
    nodeUi.addNode(enText({ color: '#ff0000', text: 'Hello world!', font: '30px Consolas' }, 'header'));
  }
}
