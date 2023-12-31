import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DoneSubject, RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, filter, map, takeUntil} from 'rxjs/operators';
import {SimpleViewComponent} from '../../widget/simple-view';
import {Engine, enEmpty, enFillCanvasColor, enImageUrl, enText, enTransform} from './engine';

@Component({
  selector: 'app-render-canvas',
  templateUrl: './render-canvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SimpleViewComponent],
})
export class RenderCanvasComponent implements OnDestroy, OnInit {
  @RxCleanup() private readonly done$ = new DoneSubject();

  @RxCleanup() readonly height$ = new BehaviorSubject(400);
  @RxCleanup() readonly width$ = new BehaviorSubject(400);
  @RxCleanup() readonly colorCanvasBg$ = new BehaviorSubject('#ff4afb');
  readonly engine = new Engine();

  readonly stats$ = combineLatest([
    this.engine.changed$.pipe(
      debounceTime(0),
      map(() => this.engine.nodeToStat(this.engine.root)),
    ),
    this.engine.images.images$,
  ]).pipe(map(([nodes, images]) => ({nodes, images})));

  setColorCanvasBg = rxNext_(this.colorCanvasBg$);

  destroy() {}
  ngOnDestroy() {
    this.destroy();
    this.engine.destroy();
  }

  ngOnInit() {
    combineLatest([this.height$, this.width$])
      .pipe(
        debounceTime(0),
        filter((params) => params.every((_) => !!_)),
        takeUntil(this.done$),
      )
      .subscribe(() => this.engine.setCanvasId('render-canvas'));

    this.engine.addNode(enFillCanvasColor(this.colorCanvasBg$, 'bg'));

    const nodeUi = this.engine.addNode(enEmpty('ui'));
    const nodeUiTrafo = nodeUi.addNode(
      enTransform({moveX: 10, moveY: 30, scaleX: 2, scaleY: 2, degrees: 45, anchorX: 56 / 2, anchorY: 48 / 2}),
    );
    nodeUiTrafo.addNode(enImageUrl(this.engine.images, {url: 'assets/sprites/abuse-exp1.png', dw: 56, dh: 48}, 'image'));
    nodeUi.addNode(enText({color: '#ff0000', text: 'Hello world!', font: '30px Consolas'}, 'header'));
  }
}
