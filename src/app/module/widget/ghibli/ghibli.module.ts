import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_ROOT, ROUTE_WILDCARD } from 'app/routing';
import { GhibliComponent } from './ghibli.component';
import { imports } from './imports';

const ROUTING = <Routes>[
  { path: ROUTE_ROOT, component: GhibliComponent },
  { path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full' },
];

@NgModule({ imports: [...imports, RouterModule.forChild(ROUTING)], exports: [GhibliComponent], declarations: [GhibliComponent] })
export class GhibliModule { }
