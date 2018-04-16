import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { DoneSubject, Subject } from 'app/rx';
import { arrayFrom } from 'app/util';
import * as d3 from 'd3';

interface Chart {
  x: d3.ScaleLinear<number, number>;
  y: d3.ScaleLinear<number, number>;
  g: d3.Selection<any, any, any, any>;
  svg: d3.Selection<any, any, any, any>;
  height: number;
  width: number;
}

@Component({
  selector: 'app-diagram-polynom',
  templateUrl: './diagram-polynom.component.html'
})
export class DiagramPolynomComponent implements OnDestroy, AfterViewInit {

  private readonly cssContent = '.content';
  private readonly cssPoint = '.point';
  private readonly cssPath = '.path';
  private readonly cssAxisX = '.axis-x';
  private readonly cssAxisY = '.axis-y';
  private readonly defMinX = 0;
  private readonly defMaxX = 100;
  private readonly defMinY = 0;
  private readonly defMaxY = 100;
  private readonly minMaxBuffer = 10;
  private readonly plotResolution = 1000;
  private readonly defHslPrefix = 'hsl(';
  private readonly defHslSuffix = ', 100%, 70%)';
  private readonly defPointColor = this.defHslPrefix + '0' + this.defHslSuffix;
  private readonly defPolynomColors = [this.defPointColor];

  private readonly done = new DoneSubject();
  private readonly triggerResized = new Subject();
  private readonly triggerRender = new Subject();

  private chart: Chart = null;
  private xyPoints: number[][] = [];
  private clrPoint = this.defPointColor;
  private polynomWeights: number[][] = [];
  private polynomColors: string[] = this.defPolynomColors;

  @Input() set points(val: number[]) {
    val = (val || []);
    const len = Math.floor(val.length / 2);
    this.xyPoints = [];
    for (let ii = 0; ii < val.length; ii += 2) {
      this.xyPoints.push([val[ii], val[ii + 1]]);
    }
    this.triggerRender.next();
  }

  @Input() set pointColor(val: string) {
    this.clrPoint = val || this.defPointColor;
    this.triggerRender.next();
  }

  @Input() set polynomials(val: number[][]) {
    this.polynomWeights = val || [];
    this.triggerRender.next();
  }

  @Input() set polynomialColors(val: string[]) {
    this.polynomColors = val || this.defPolynomColors;
    this.triggerRender.next();
  }

  @Output() hoveredPoint = new EventEmitter<number[]>();

  @HostListener('window:resize') onWindowResize = () => this.triggerResized.next();

  constructor() {
    this.triggerResized.takeUntil(this.done).debounceTime(100).subscribe(() => this.rechart());
    this.triggerRender.takeUntil(this.done).debounceTime(1).subscribe(() => this.render());
  }

  ngAfterViewInit() { this.rechart(); }
  ngOnDestroy() { this.done.done(); }

  private rechart() {
    if (this.chart) {
      this.chart.g.remove();
    }

    const rect = (d3.select('.svg-container').node() as HTMLElement).getBoundingClientRect();

    const margin = { top: 5, right: 20, bottom: 20, left: 35 };
    const width = Math.floor(rect.width);
    const height = 350;
    const svg = d3
      .select('#svgChart')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));
    this.chart = {
      svg, height, width,
      x: d3.scaleLinear().domain([this.defMinX, this.defMaxX]).range([0, width]),
      y: d3.scaleLinear().domain([this.defMinY, this.defMaxY]).range([height, 0]),
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
      .classed(this.cssContent.substr(1), true);

    this.chart.g
      .append('g')
      .classed(this.cssAxisX.substr(1), true)
      .attr('transform', 'translate(0,' + this.chart.height + ')');
    this.chart.g
      .append('g')
      .classed(this.cssAxisY.substr(1), true);

    // LISTENER

    this.chart.g.on('pointermove', (ii, index, elements) => {
      const sel = elements[index];
      const xy = d3.mouse(sel as any);
      const [xx, yy] = [this.chart.x.invert(xy[0]), this.chart.y.invert(xy[1])];
      this.hoveredPoint.emit([xx, yy]);
    });

    this.triggerRender.next();
  }

  private getHslColor = (index: number, len: number) => this.defHslPrefix + Math.floor(index * 360 / (len || 1)) + this.defHslSuffix;

  private render() {
    if (!this.chart) {
      return;
    }

    const [xMin, xMax, yMin, yMax] = [
      this.xyPoints.reduce((acc, ii) => Math.min(acc, ii[0] - this.minMaxBuffer), this.defMinX),
      this.xyPoints.reduce((acc, ii) => Math.max(acc, ii[0] + this.minMaxBuffer), this.defMaxX),
      this.xyPoints.reduce((acc, ii) => Math.min(acc, ii[1] - this.minMaxBuffer), this.defMinX),
      this.xyPoints.reduce((acc, ii) => Math.max(acc, ii[1] + this.minMaxBuffer), this.defMaxY),
    ];

    // ADJUST AND RENDER AXIS

    this.chart.x.domain([xMin, xMax]);
    this.chart.y.domain([yMin, yMax]);

    this.chart.g
      .select(this.cssAxisX)
      .call(d3.axisBottom(this.chart.x));
    this.chart.g
      .select(this.cssAxisY)
      .call(d3.axisLeft(this.chart.y));

    this.chart.g
      .selectAll(this.cssAxisX + ' .domain, ' + this.cssAxisY + ' .domain')
      .attr('stroke-width', 1);
    this.chart.g
      .selectAll(this.cssAxisY + ' .tick line')
      .attr('stroke-width', 1);

    // RENDER POINTS

    {
      const point = this.chart.g.select(this.cssContent).selectAll(this.cssPoint).data(this.xyPoints);
      const item = point.enter()
        .append('circle')
        .attr('r', 3)
        .style('stroke', this.clrPoint)
        .style('stroke-width', 1)
        .style('fill', 'none')
        .style('transition', 'cx 500ms, cy 500ms')
        .classed(this.cssPoint.substr(1), true);
      item.merge(point)
        .attr('cx', ii => this.chart.x(ii[0]))
        .attr('cy', ii => this.chart.y(ii[1]));
      point.exit().remove();
    }

    // RENDER POLYNOMS

    {
      const stride = (xMax - xMin) / this.plotResolution;
      const plotteds = this.polynomWeights.map((weights, weightsIndex) => {
        const getY = (factors: number[], xx: number) => weights ? factors.reduce((acc, val, index) => acc + val * xx ** (weights.length - 1 - index), 0) : 0;
        return arrayFrom(this.plotResolution).map((ii, index) => [xMin + stride * index, getY(weights, xMin + stride * index)]);
      });

      const line = d3.line()
        .x(ii => this.chart.x(ii[0]))
        .y(ii => this.chart.y(ii[1]));

      const path = this.chart.g.select(this.cssContent).selectAll(this.cssPath).data(plotteds);
      const item = path.enter()
        .append('path')
        .style('stroke', (ii, index) => this.polynomColors === this.defPolynomColors ?
          this.getHslColor(index, this.polynomWeights.length) : this.polynomColors[index % this.polynomColors.length])
        .style('stroke-width', 1.5)
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('fill', 'none')
        .style('transition', 'd 500ms')
        .classed(this.cssPath.substr(1), true);
      item.merge(path)
        .attr('d', line);
      path.exit().remove();
    }

  }

}
