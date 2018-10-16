import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_ROOT, ROUTE_WILDCARD } from 'app/routing';
import { ConfigComponent } from './config.component';
import { imports } from './imports';

const ROUTING = [
  { path: ROUTE_ROOT, component: ConfigComponent },
  { path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full' },
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)], exports: [ConfigComponent], declarations: [ConfigComponent]
})
export class ConfigModule { }
