import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {watch} from 'dd-rx-state';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  ROUTE_BLOCKCHAIN,
  ROUTE_BUILDCONFIG,
  ROUTE_CONFIGURATION,
  ROUTE_CRYPTO,
  ROUTE_CURRENT,
  ROUTE_DASHBOARD,
  ROUTE_DEMO_GHIBLI,
  ROUTE_DEMO_MISC,
  ROUTE_DEMO_STATE,
  ROUTE_GAME,
  ROUTE_GAME_DOWN,
  ROUTE_GAME_MINESWEEPER,
  ROUTE_GAME_SNAKE,
  ROUTE_GRAPH,
  ROUTE_MATH,
  ROUTE_OVERVIEW,
  ROUTE_PLAYGROUND,
  ROUTE_RENDER_CANVAS,
  ROUTE_SCHOOL,
  ROUTE_SETTINGS,
  ROUTE_WALKER,
} from 'src/app/routing';
import {RxStateService} from 'src/app/rx-state';
import {trackByIndex} from 'src/app/util';
import {NavigationBarItem} from '../navigation-bar';
import {DiDashboardVisibilityFooter, DiDashboardVisibilityHeader, DiDashboardVisibilitySidebar} from './di-dashboard-options';

interface RouteDef {
  icon: string;
  label: string;
  route: string;
  subs: RouteDef[];
}

export interface DashboardComponentRouteData extends Data {
  navs: NavigationBarItem[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private readonly rxState: RxStateService,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(DiDashboardVisibilityHeader) public readonly isVisibleHeader$: Observable<boolean>,
    @Inject(DiDashboardVisibilityFooter) public readonly isVisibleFooter$: Observable<boolean>,
    @Inject(DiDashboardVisibilitySidebar) public readonly isVisibleSide$: Observable<boolean>,
  ) {}

  readonly GRID_CONTENT = 'cont';
  readonly GRID_FOOTER = 'foot';
  readonly GRID_HEAD = 'head';
  readonly GRID_SIDE = 'side';
  readonly GRID = [
    [this.GRID_HEAD, this.GRID_HEAD],
    [this.GRID_SIDE, this.GRID_CONTENT],
    [this.GRID_FOOTER, this.GRID_FOOTER],
  ]
    .map((line) => '"' + line.join(' ') + '"')
    .join(' ');

  readonly navs$ = this.activatedRoute.data.pipe(map((data: DashboardComponentRouteData) => data?.navs ?? null));

  readonly ROUTES: RouteDef[] = [
    {
      icon: 'overview',
      route: ROUTE_OVERVIEW,
      label: 'Overview',
      subs: [{icon: 'current', route: ROUTE_CURRENT, label: 'Current', subs: []}],
    },
    {
      icon: 'graph',
      route: ROUTE_GRAPH,
      label: 'Graph',
      subs: [{icon: 'walker', route: ROUTE_WALKER, label: 'Walker', subs: []}],
    },
    {
      icon: 'cryptocurrency',
      route: ROUTE_CRYPTO,
      label: 'Cryptocurrency',
      subs: [{icon: 'items1', route: ROUTE_BLOCKCHAIN, label: 'Blockchain', subs: []}],
    },
    {
      icon: 'school',
      route: ROUTE_SCHOOL,
      label: 'School',
      subs: [{icon: 'items1', route: ROUTE_MATH, label: 'Math', subs: []}],
    },
    {
      icon: 'game',
      route: ROUTE_GAME,
      label: 'Game',
      subs: [
        {icon: 'items1', route: ROUTE_GAME_MINESWEEPER, label: 'Minesweeper', subs: []},
        {icon: 'items2', route: ROUTE_GAME_SNAKE, label: 'Snake', subs: []},
        {icon: 'items3', route: ROUTE_GAME_DOWN, label: 'Down', subs: []},
        {icon: 'items4', route: ROUTE_RENDER_CANVAS, label: 'Render', subs: []},
      ],
    },
    {
      icon: 'playground',
      route: ROUTE_PLAYGROUND,
      label: 'Demo',
      subs: [
        {icon: 'items1', route: ROUTE_DEMO_MISC, label: 'Misc.', subs: []},
        {icon: 'items2', route: ROUTE_DEMO_STATE, label: 'State', subs: []},
        {icon: 'items3', route: ROUTE_DEMO_GHIBLI, label: 'Ghibli', subs: []},
      ],
    },
    {
      icon: 'settings',
      route: ROUTE_SETTINGS,
      label: 'Settings',
      subs: [
        {icon: 'configuration', route: ROUTE_CONFIGURATION, label: 'Configuration', subs: []},
        {icon: 'build_config', route: ROUTE_BUILDCONFIG, label: 'Build Settings', subs: []},
      ],
    },
  ];

  readonly subRoute$ = this.rxState.state$.pipe(
    watch((state) => state.globalValues.route),
    map((url) => {
      const paths = url.split('/');
      const indexMe = paths.indexOf(ROUTE_DASHBOARD);
      return indexMe >= 0 && paths.length > indexMe + 1 ? paths[indexMe + 1] : null;
    }),
  );

  readonly subRoutes$ = this.subRoute$.pipe(
    map((subRoute) => {
      const route = this.ROUTES.find((ii) => ii.route === subRoute);
      return route ? route.subs : [];
    }),
  );

  trackByIndex = trackByIndex;
}
