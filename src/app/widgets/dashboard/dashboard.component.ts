import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReduxService } from 'app/redux';
import * as routing from 'app/routing';
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

  readonly ROUTE_ROOT = routing.DASHBOARD;

  readonly routes = <RouteDef[]>[
    {
      icon: 'overview', route: routing.OVERVIEW, label: 'Overview', subs: [
        { icon: 'current', route: routing.CURRENT, label: 'Current', subs: [] }
      ]
    },
    {
      icon: 'ai', route: routing.AI, label: 'AI', subs: [
        { icon: 'polynom', route: routing.APPROXPOLYNOM, label: 'ML Polynomial', subs: [] }
      ]
    },
    {
      icon: 'playground', route: routing.PLAYGROUND, label: 'Demo', subs: [
        { icon: 'items1', route: routing.DEMO_MISC, label: 'Misc.', subs: [] },
        { icon: 'items2', route: routing.DEMO_STATE, label: 'State', subs: [] }
      ]
    },
    {
      icon: 'settings', route: routing.SETTINGS, label: 'Settings', subs: [
        { icon: 'configuration', route: routing.CONFIGURATION, label: 'Configuration', subs: [] },
        { icon: 'build_config', route: routing.BUILDCONFIG, label: 'Build Settings', subs: [] }
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
      const indexMe = paths.indexOf(routing.DASHBOARD);
      return indexMe >= 0 && paths.length > indexMe + 1 ? paths[indexMe + 1] : null;
    }));
  subRoutes$ = this.subRoute$
    .pipe(map(subRoute => {
      const route = this.routes.find(ii => ii.route === subRoute);
      return route ? route.subs : [];
    }));

}
