import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_CURRENT, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';
import {OverviewComponent} from '../overview/overview.module';

const data: NavigationContentComponentRouteData = {
  navs: [{icon: 'current', route: ROUTE_CURRENT, label: 'Current'}],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {path: ROUTE_CURRENT, component: OverviewComponent},
      {path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_CURRENT},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteOverviewModule {}

export {RouteOverviewModule};