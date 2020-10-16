import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentModule} from '../navigation-content';
import {SchoolRoute} from './school-route';

const routeNavs: Record<SchoolRoute, NavigationBarItem> = {
  [SchoolRoute.Math]: {icon: 'items1', route: SchoolRoute.Math, label: 'Math'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(SchoolRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: SchoolRoute.Math,
        loadChildren: () => import('src/app/module/widget/school-math/school-math.module').then((m) => m.RoutedSchoolMathModule),
      },
      {path: ROUTE_ROOT, redirectTo: SchoolRoute.Math, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: SchoolRoute.Math},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteSchoolModule {}

export {RouteSchoolModule};
