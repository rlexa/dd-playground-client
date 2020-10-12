import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {OverviewComponent} from './overview.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: OverviewComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule, FlexboxModule, RouterModule.forChild(ROUTING)],
  exports: [OverviewComponent],
  declarations: [OverviewComponent],
})
class OverviewModule {}

export {OverviewModule, OverviewComponent};
