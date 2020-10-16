import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {NavigationBarItem} from '../navigation-bar';
import {NavigationContentComponent, NavigationContentComponentRouteData, NavigationContentModule} from '../navigation-content';
import {CryptoRoute} from './crypto-route';

const routeNavs: Record<CryptoRoute, NavigationBarItem> = {
  [CryptoRoute.Blockchain]: {icon: 'items1', route: CryptoRoute.Blockchain, label: 'Blockchain'},
};

const data: NavigationContentComponentRouteData = {
  navs: Object.values(CryptoRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: ROUTE_ROOT,
    component: NavigationContentComponent,
    data,
    children: [
      {path: CryptoRoute.Blockchain, loadChildren: () => import('src/app/module/widget/crypto/crypto.module').then((m) => m.CryptoModule)},
      {path: ROUTE_ROOT, redirectTo: CryptoRoute.Blockchain, pathMatch: 'full'},
      {path: ROUTE_WILDCARD, redirectTo: CryptoRoute.Blockchain},
    ],
  },
];

@NgModule({imports: [NavigationContentModule, RouterModule.forChild(ROUTING)]})
class RouteCryptoModule {}

export {RouteCryptoModule};
