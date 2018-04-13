import { Component, OnDestroy } from '@angular/core';
import { ReduxService } from 'app/redux';
import * as routing from 'app/routing';
import { DoneSubject } from 'app/rx';

interface RouteDef {
  icon: string;
  label: string;
  route: string;
  subs: RouteDef[];
}

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnDestroy {

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

  readonly routes: RouteDef[] = [
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
  subRoute: string = null;
  subRoutes: RouteDef[] = [];

  private readonly done = new DoneSubject();

  constructor(private redux: ReduxService) {
    redux.watch(state => state.globalValues.route).takeUntil(this.done).subscribe(url => this.updateSubRoutes(url));
  }

  isVisibleFooter$ = this.redux.watch(state => state.ui.dashboard.isVisibleFooter);
  isVisibleHeader$ = this.redux.watch(state => state.ui.dashboard.isVisibleHeader);
  isVisibleSide$ = this.redux.watch(state => state.ui.dashboard.isVisibleSide);

  ngOnDestroy() { this.done.done(); }

  private updateSubRoutes(url: string) {
    const paths = url.split('/');
    const indexMe = paths.indexOf(routing.DASHBOARD);
    this.subRoute = indexMe >= 0 && paths.length > indexMe + 1 ? paths[indexMe + 1] : null;
    const route = this.routes.find(ii => ii.route === this.subRoute);
    this.subRoutes = route ? route.subs : [];
  }

}
