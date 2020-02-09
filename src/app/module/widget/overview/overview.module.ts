import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {imports} from './imports';
import {OverviewComponent} from './overview.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: OverviewComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({imports: [...imports, RouterModule.forChild(ROUTING)], exports: [OverviewComponent], declarations: [OverviewComponent]})
export class OverviewModule {}
