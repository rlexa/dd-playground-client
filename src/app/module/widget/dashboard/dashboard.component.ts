import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {DoneSubject, RxCleanup} from 'dd-rxjs';
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
  ROUTE_GAME_SNAKE,
  ROUTE_GRAPH,
  ROUTE_OVERVIEW,
  ROUTE_PLAYGROUND,
  ROUTE_RENDER_CANVAS,
  ROUTE_SETTINGS,
  ROUTE_WALKER,
  ROUTE_GAME_MINESWEEPER,
} from 'src/app/routing';
import {RxStateService} from 'src/app/rx-state';

interface RouteDef {
  icon: string;
  label: string;
  route: string;
  subs: RouteDef[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnDestroy {
  constructor(private rxState: RxStateService) {}

  @RxCleanup() private readonly done$ = new DoneSubject();

  readonly GRID_CONTENT = 'cont';
  readonly GRID_FOOTER = 'foot';
  readonly GRID_HEAD = 'head';
  readonly GRID_SIDE = 'side';
  readonly GRID = [
    [this.GRID_HEAD, this.GRID_HEAD],
    [this.GRID_SIDE, this.GRID_CONTENT],
    [this.GRID_FOOTER, this.GRID_FOOTER],
  ]
    .map(line => '"' + line.join(' ') + '"')
    .join(' ');

  readonly ROUTE_ROOT = ROUTE_DASHBOARD;

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

  readonly isVisibleFooter$ = this.rxState.watch(state => state.ui.dashboard.isVisibleFooter, this.done$);
  readonly isVisibleHeader$ = this.rxState.watch(state => state.ui.dashboard.isVisibleHeader, this.done$);
  readonly isVisibleSide$ = this.rxState.watch(state => state.ui.dashboard.isVisibleSide, this.done$);

  readonly subRoute$ = this.rxState
    .watch(state => state.globalValues.route, this.done$)
    .pipe(
      map(url => {
        const paths = url.split('/');
        const indexMe = paths.indexOf(ROUTE_DASHBOARD);
        return indexMe >= 0 && paths.length > indexMe + 1 ? paths[indexMe + 1] : null;
      }),
    );

  readonly subRoutes$ = this.subRoute$.pipe(
    map(subRoute => {
      const route = this.ROUTES.find(ii => ii.route === subRoute);
      return route ? route.subs : [];
    }),
  );

  ngOnDestroy() {}
}
