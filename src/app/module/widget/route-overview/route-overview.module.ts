import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent} from '../navigation-content';
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
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: OverviewRoute.Current, component: OverviewComponent},
      {path: RouteRoot, redirectTo: OverviewRoute.Current, pathMatch: 'full'},
      {path: RouteWild, redirectTo: OverviewRoute.Current},
    ],
  },
];

@NgModule({imports: [NavigationContentComponent, RouterModule.forChild(ROUTING)]})
class RouteOverviewModule {}

export {RouteOverviewModule};
