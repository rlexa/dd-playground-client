import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../navigation-bar';
import {NavigationContentComponent} from '../navigation-content';
import {CryptoRoute} from './crypto-route';

const routeNavs: Record<CryptoRoute, NavigationBarItem> = {
  [CryptoRoute.Blockchain]: {icon: 'items1', route: CryptoRoute.Blockchain, label: 'Blockchain'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(CryptoRoute).map((ii) => routeNavs[ii]),
};

const ROUTING: Routes = [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: CryptoRoute.Blockchain, loadChildren: () => import('src/app/module/widget/crypto/crypto.module').then((m) => m.CryptoModule)},
      {path: RouteRoot, redirectTo: CryptoRoute.Blockchain, pathMatch: 'full'},
      {path: RouteWild, redirectTo: CryptoRoute.Blockchain},
    ],
  },
];

@NgModule({imports: [NavigationContentComponent, RouterModule.forChild(ROUTING)]})
class RouteCryptoModule {}

export {RouteCryptoModule};
