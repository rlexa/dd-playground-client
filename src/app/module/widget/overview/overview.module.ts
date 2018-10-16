import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutedContentComponent } from 'app/module/widget/routed-content';
import { ROUTE_CURRENT, ROUTE_ROOT, ROUTE_WILDCARD } from 'app/routing';
import { imports } from './imports';
import { OverviewComponent } from './overview.component';

const ROUTING = [
  {
    path: ROUTE_ROOT, component: RoutedContentComponent, children: [
      { path: ROUTE_CURRENT, component: OverviewComponent },
      { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
      { path: ROUTE_WILDCARD, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
    ]
  },
  { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
  { path: ROUTE_WILDCARD, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)], exports: [OverviewComponent], declarations: [OverviewComponent]
})
export class OverviewModule { }
