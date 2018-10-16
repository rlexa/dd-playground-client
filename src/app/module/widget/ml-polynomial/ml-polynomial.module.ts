import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_ROOT, ROUTE_WILDCARD } from 'app/routing';
import { imports } from './imports';
import { MlPolynomialComponent } from './ml-polynomial.component';

const ROUTING = [
  { path: ROUTE_ROOT, component: MlPolynomialComponent },
  { path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full' },
];

@NgModule({ imports: [...imports, RouterModule.forChild(ROUTING)], exports: [MlPolynomialComponent], declarations: [MlPolynomialComponent] })
export class MlPolynomialModule { }
