import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_MATH, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';

const data: NavigationContentComponentRouteData = {
  navs: [{icon: 'items1', route: ROUTE_MATH, label: 'Math'}],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {
        path: ROUTE_MATH,
        loadChildren: () => import('src/app/module/widget/school-math/school-math.module').then((m) => m.SchoolMathModule),
      },
      {path: ROUTE_ROOT, redirectTo: ROUTE_MATH},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_MATH, pathMatch: 'full'},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteSchoolModule {}

export {RouteSchoolModule};
