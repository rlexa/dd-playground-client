import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { rxComplete, rxNext_ } from 'app/rx';
import { arrayFrom } from 'app/util';
import { axisBottom, axisLeft, line, mouse, ScaleLinear, scaleLinear, select, Selection } from 'd3';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface Chart {
  x: ScaleLinear<number, number>;
  y: ScaleLinear<number, number>;
  g: Selection<any, any, any, any>;
  svg: Selection<any, any, any, any>;
  height: number;
  width: number;
}

@Component({
  selector: 'app-diagram-polynom',
  templateUrl: './diagram-polynom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramPolynomComponent implements OnDestroy, OnInit, AfterViewInit {
  private readonly CSS_AXIS_X = '.axis-x';
  private readonly CSS_AXIS_Y = '.axis-y';
  private readonly CSS_CONTENT = '.content';
  private readonly CSS_PATH = '.path';
  private readonly CSS_POINT = '.point';
  private readonly DEF_HSL_PREFIX = 'hsl(';
  private readonly DEF_HSL_SUFFIX = ', 100%, 70%)';
  private readonly DEF_MAX_X = 5;
  private readonly DEF_MAX_Y = 5;
  private readonly DEF_MIN_X = -5;
  private readonly DEF_MIN_Y = -5;
  private readonly DEF_POINT_COLOR = this.DEF_HSL_PREFIX + '0' + this.DEF_HSL_SUFFIX;
  private readonly DEF_POLYNOM_COLORS = [this.DEF_POINT_COLOR];
  private readonly MIN_MAX_BUFFER = 1;
  private readonly PLOT_RESOLUTION = 1000;

  private readonly clrPoint$ = new BehaviorSubject(this.DEF_POINT_COLOR);
  private readonly polynomColors$ = new BehaviorSubject(this.DEF_POLYNOM_COLORS);
  private readonly polynomWeights$ = new BehaviorSubject(<number[][]>[]);
  private readonly xyPoints$ = new BehaviorSubject(<number[][]>[]);

  private readonly triggerResized$ = new Subject();
  private readonly triggerRender$ = new Subject();

  private chart = <Chart>null;

  @Input() set points(val: number[]) {
    val = (val || []);
    const points = [];
    for (let ii = 0; ii < val.length; ii += 2) {
      points.push([val[ii], val[ii + 1]]);
    }
    this.xyPoints$.next(points);
  }

  @Input() set pointColor(val: string) { this.clrPoint$.next(val || this.DEF_POINT_COLOR); }
  @Input() set polynomialColors(val: string[]) { this.polynomColors$.next(val || this.DEF_POLYNOM_COLORS); }
  @Input() set polynomials(val: number[][]) { this.polynomWeights$.next(val || []); }

  @Output() hoveredPoint = new EventEmitter<number[]>();

  @HostListener('window:resize') onWindowResize = () => this.triggerResized$.next();

  ngOnDestroy() {
    rxComplete(this.clrPoint$, this.polynomColors$, this.polynomWeights$, this.triggerRender$, this.triggerResized$, this.xyPoints$);
  }

  ngOnInit() {
    this.triggerResized$.pipe(debounceTime(100)).subscribe(() => this.rechart());
    this.triggerRender$.pipe(debounceTime(1)).subscribe(() => this.render());
    merge(this.clrPoint$, this.polynomColors$, this.polynomWeights$, this.xyPoints$).subscribe(rxNext_(this.triggerRender$));
  }

  ngAfterViewInit() {
    this.rechart();
  }

  private rechart() {
    if (this.chart) {
      this.chart.g.remove();
    }

    const rect = (select('.svg-container').node() as HTMLElement).getBoundingClientRect();

    const margin = { top: 5, right: 20, bottom: 20, left: 35 };
    const width = Math.floor(rect.width);
    const height = 350;
    const svg = select('#svgChart')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));
    this.chart = {
      svg, height, width,
      x: scaleLinear().domain([this.DEF_MIN_X, this.DEF_MAX_X]).range([0, width]),
      y: scaleLinear().domain([this.DEF_MIN_Y, this.DEF_MAX_Y]).range([height, 0]),
      g: svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    };

    this.chart.g
      .append('rect')
      .classed('filler', true)
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'transparent');

    this.chart.g
      .append('g')
      .classed(this.CSS_CONTENT.substr(1), true);

    this.chart.g
      .append('g')
      .classed(this.CSS_AXIS_X.substr(1), true)
      .attr('transform', 'translate(0,' + this.chart.height + ')');
    this.chart.g
      .append('g')
      .classed(this.CSS_AXIS_Y.substr(1), true);

    // LISTENER

    this.chart.g.on('pointermove', (ii, index, elements) => {
      const sel = elements[index];
      const xy = mouse(sel as any);
      const [xx, yy] = [this.chart.x.invert(xy[0]), this.chart.y.invert(xy[1])];
      this.hoveredPoint.emit([xx, yy]);
    });

    this.triggerRender$.next();
  }

  private getHslColor = (index: number, len: number) => this.DEF_HSL_PREFIX + Math.floor(index * 360 / (len || 1)) + this.DEF_HSL_SUFFIX;

  private render() {
    if (!this.chart) {
      return;
    }

    const points = this.xyPoints$.value;
    const [xMin, xMax, yMin, yMax] = [
      points.reduce((acc, ii) => Math.min(acc, ii[0] - this.MIN_MAX_BUFFER), this.DEF_MIN_X),
      points.reduce((acc, ii) => Math.max(acc, ii[0] + this.MIN_MAX_BUFFER), this.DEF_MAX_X),
      points.reduce((acc, ii) => Math.min(acc, ii[1] - this.MIN_MAX_BUFFER), this.DEF_MIN_X),
      points.reduce((acc, ii) => Math.max(acc, ii[1] + this.MIN_MAX_BUFFER), this.DEF_MAX_Y),
    ];

    // ADJUST AND RENDER AXIS

    this.chart.x.domain([xMin, xMax]);
    this.chart.y.domain([yMin, yMax]);

    this.chart.g
      .select(this.CSS_AXIS_X)
      .call(axisBottom(this.chart.x));
    this.chart.g
      .select(this.CSS_AXIS_Y)
      .call(axisLeft(this.chart.y));

    this.chart.g
      .selectAll(this.CSS_AXIS_X + ' .domain, ' + this.CSS_AXIS_Y + ' .domain')
      .attr('stroke-width', 1);
    this.chart.g
      .selectAll(this.CSS_AXIS_Y + ' .tick line')
      .attr('stroke-width', 1);

    // RENDER POINTS

    {
      const point = this.chart.g.select(this.CSS_CONTENT).selectAll(this.CSS_POINT).data(points);
      const item = point.enter()
        .append('circle')
        .attr('r', 3)
        .style('stroke', this.clrPoint$.value)
        .style('stroke-width', 1)
        .style('fill', 'none')
        .style('transition', 'cx 500ms, cy 500ms')
        .classed(this.CSS_POINT.substr(1), true);
      item.merge(point)
        .attr('cx', ii => this.chart.x(ii[0]))
        .attr('cy', ii => this.chart.y(ii[1]));
      point.exit().remove();
    }

    // RENDER POLYNOMS

    {
      const stride = (xMax - xMin) / this.PLOT_RESOLUTION;
      const plotteds = this.polynomWeights$.value.map((weights, weightsIndex) => {
        const getY = (factors: number[], xx: number) => weights ? factors.reduce((acc, val, index) => acc + val * xx ** (weights.length - 1 - index), 0) : 0;
        return arrayFrom(this.PLOT_RESOLUTION).map((ii, index) => [xMin + stride * index, getY(weights, xMin + stride * index)]);
      });

      const doLine = line()
        .x(ii => this.chart.x(ii[0]))
        .y(ii => this.chart.y(ii[1]));

      const path = this.chart.g.select(this.CSS_CONTENT).selectAll(this.CSS_PATH).data(plotteds);
      const item = path.enter()
        .append('path')
        .style('stroke', (ii, index) => this.polynomColors$.value === this.DEF_POLYNOM_COLORS ?
          this.getHslColor(index, this.polynomWeights$.value.length) : this.polynomColors$.value[index % this.polynomColors$.value.length])
        .style('stroke-width', 1.5)
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('fill', 'none')
        .style('transition', 'd 500ms')
        .classed(this.CSS_PATH.substr(1), true);
      item.merge(path)
        .attr('d', doLine);
      path.exit().remove();
    }

  }

}
