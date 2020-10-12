import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DiGlobalModule} from './di-global.module';
import {FlexboxModule} from './module/directive/flexbox';
import {ROUTE_DASHBOARD, ROUTE_ROOT, ROUTE_WILDCARD} from './routing';
import {AppRxStore, createAppRxStore} from './rx-state';

const appRoutes: Routes = [
  {
    path: ROUTE_DASHBOARD,
    loadChildren: () => import('src/app/module/widget/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path: ROUTE_ROOT, redirectTo: ROUTE_DASHBOARD, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_DASHBOARD},
];

@NgModule({
  /* DECLARATIONS: components, directives, and pipes belonging to that module (declare only once in app) */
  declarations: [AppComponent],
  /* IMPORTS: Import modules with exported declarable classes referenced in this module's component templates */
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    // 3rd party
    MatNativeDateModule,
    NativeDateModule,
    FlexboxModule,
    // routing
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    // local
    DiGlobalModule,
  ],
  /* EXPORTS: Export declared classes that components in other modules are able to reference in their templates */
  exports: [],
  /* PROVIDERS: all providers in any module imported in root have application scope */
  providers: [{provide: AppRxStore, useFactory: createAppRxStore}],
  bootstrap: [AppComponent],
})
export class AppModule {}
