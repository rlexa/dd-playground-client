import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_BLOCKCHAIN, ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';

const data: NavigationContentComponentRouteData = {
  navs: [{icon: 'items1', route: ROUTE_BLOCKCHAIN, label: 'Blockchain'}],
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {path: ROUTE_BLOCKCHAIN, loadChildren: () => import('src/app/module/widget/crypto/crypto.module').then((m) => m.CryptoModule)},
      {path: ROUTE_ROOT, redirectTo: ROUTE_BLOCKCHAIN},
      {path: ROUTE_WILDCARD, redirectTo: ROUTE_BLOCKCHAIN, pathMatch: 'full'},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteCryptoModule {}

export {RouteCryptoModule};
