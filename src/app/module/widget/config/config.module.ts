import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {ConfigComponent} from './config.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: ConfigComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, RouterModule.forChild(ROUTING)],
  exports: [ConfigComponent],
  declarations: [ConfigComponent],
})
class ConfigModule {}

export {ConfigModule, ConfigComponent};
