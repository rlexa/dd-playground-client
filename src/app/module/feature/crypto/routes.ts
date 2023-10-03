import {Route} from '@angular/router';
import {RouteBlockchain, RouteRoot, RouteWild} from 'src/app/routing';
import {NavigationBarItem, NavigationBarItemsData} from '../../widget/navigation-bar';
import {NavigationContentComponent} from '../../widget/navigation-content';

const routeNavs: Record<string, NavigationBarItem> = {
  [RouteBlockchain]: {icon: 'items1', route: RouteBlockchain, label: 'Blockchain'},
};

const data: NavigationBarItemsData = {
  navigationBarItems: Object.values(routeNavs),
};

export default [
  {
    path: RouteRoot,
    component: NavigationContentComponent,
    data,
    children: [
      {path: RouteBlockchain, loadComponent: () => import('./crypto.component').then((m) => m.CryptoComponent)},
      {path: RouteRoot, redirectTo: RouteBlockchain, pathMatch: 'full'},
      {path: RouteWild, redirectTo: RouteBlockchain},
    ],
  },
] as Route[];
