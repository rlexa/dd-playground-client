import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DiGlobalRouterParamsProvider} from './di-global';
import {FlexboxDirective} from './module/directive/flexbox';
import {RouteDashboard, RouteRoot, RouteWild} from './routing';

const appRoutes: Routes = [
  {
    path: RouteDashboard,
    loadChildren: () => import('src/app/module/widget/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path: RouteRoot, redirectTo: RouteDashboard, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteDashboard},
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
    FlexboxDirective,
    // routing
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
  ],
  /* EXPORTS: Export declared classes that components in other modules are able to reference in their templates */
  exports: [],
  /* PROVIDERS: all providers in any module imported in root have application scope */
  providers: [DiGlobalRouterParamsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
