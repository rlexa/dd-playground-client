import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {ConfigComponent} from './config.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: ConfigComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, RouterModule.forChild(ROUTING)],
  exports: [ConfigComponent],
  declarations: [ConfigComponent],
})
class ConfigModule {}

export {ConfigComponent, ConfigModule};
