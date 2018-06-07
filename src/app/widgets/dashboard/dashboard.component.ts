import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReduxService } from 'app/redux';
import { ROUTE_AI, ROUTE_APPROXPOLYNOM, ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_CURRENT, ROUTE_DASHBOARD, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_GRAPH, ROUTE_OVERVIEW, ROUTE_PLAYGROUND, ROUTE_SETTINGS, ROUTE_WALKER } from 'app/routing';
import { map } from 'rxjs/operators';

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
export class DashboardComponent {

  readonly GRID_CONTENT = 'cont';
  readonly GRID_FOOTER = 'foot';
  readonly GRID_HEAD = 'head';
  readonly GRID_SIDE = 'side';
  readonly GRID = [
    [this.GRID_HEAD, this.GRID_HEAD],
    [this.GRID_SIDE, this.GRID_CONTENT],
    [this.GRID_FOOTER, this.GRID_FOOTER],
  ].map(line => '"' + line.join(' ') + '"').join(' ');

  readonly ROUTE_ROOT = ROUTE_DASHBOARD;

  readonly routes = <RouteDef[]>[
    {
      icon: 'overview', route: ROUTE_OVERVIEW, label: 'Overview', subs: [
        { icon: 'current', route: ROUTE_CURRENT, label: 'Current', subs: [] }
      ]
    },
    {
      icon: 'graph', route: ROUTE_GRAPH, label: 'Graph', subs: [
        { icon: 'walker', route: ROUTE_WALKER, label: 'Walker', subs: [] }
      ]
    },
    {
      icon: 'ai', route: ROUTE_AI, label: 'AI', subs: [
        { icon: 'polynom', route: ROUTE_APPROXPOLYNOM, label: 'ML Polynomial', subs: [] }
      ]
    },
    {
      icon: 'playground', route: ROUTE_PLAYGROUND, label: 'Demo', subs: [
        { icon: 'items1', route: ROUTE_DEMO_MISC, label: 'Misc.', subs: [] },
        { icon: 'items2', route: ROUTE_DEMO_STATE, label: 'State', subs: [] }
      ]
    },
    {
      icon: 'settings', route: ROUTE_SETTINGS, label: 'Settings', subs: [
        { icon: 'configuration', route: ROUTE_CONFIGURATION, label: 'Configuration', subs: [] },
        { icon: 'build_config', route: ROUTE_BUILDCONFIG, label: 'Build Settings', subs: [] }
      ]
    }
  ];

  constructor(private redux: ReduxService) { }

  isVisibleFooter$ = this.redux.watch(state => state.ui.dashboard.isVisibleFooter);
  isVisibleHeader$ = this.redux.watch(state => state.ui.dashboard.isVisibleHeader);
  isVisibleSide$ = this.redux.watch(state => state.ui.dashboard.isVisibleSide);

  subRoute$ = this.redux.watch(state => state.globalValues.route)
    .pipe(map(url => {
      const paths = url.split('/');
      const indexMe = paths.indexOf(ROUTE_DASHBOARD);
      return indexMe >= 0 && paths.length > indexMe + 1 ? paths[indexMe + 1] : null;
    }));
  subRoutes$ = this.subRoute$
    .pipe(map(subRoute => {
      const route = this.routes.find(ii => ii.route === subRoute);
      return route ? route.subs : [];
    }));

}
