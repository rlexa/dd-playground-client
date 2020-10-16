import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentModule} from '../navigation-content';
import {OverviewComponent} from '../overview/overview.module';
import {OverviewRoute} from './overview-route';

const routeNavs: Record<OverviewRoute, NavigationBarItem> = {
  [OverviewRoute.Current]: {icon: 'current', route: OverviewRoute.Current, label: 'Current'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(OverviewRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {path: OverviewRoute.Current, component: OverviewComponent},
      {path: ROUTE_ROOT, redirectTo: OverviewRoute.Current, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: OverviewRoute.Current},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteOverviewModule {}

export {RouteOverviewModule};
