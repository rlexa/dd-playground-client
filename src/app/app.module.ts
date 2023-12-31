import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {RouterModule, provideRouter, withComponentInputBinding} from '@angular/router';
import {AppComponent} from './app.component';
import {DiGlobalRouterParamsProvider} from './di-global';
import {FlexboxDirective} from './module/directive/flexbox';
import {RouteDashboard, RouteRoot, RouteWild} from './routing';

@NgModule({
  /* DECLARATIONS: components, directives, and pipes belonging to that module (declare only once in app) */
  declarations: [AppComponent],
  /* IMPORTS: Import modules with exported declarable classes referenced in this module's component templates */
  imports: [BrowserModule, MatNativeDateModule, NativeDateModule, FlexboxDirective, RouterModule],
  /* EXPORTS: Export declared classes that components in other modules are able to reference in their templates */
  exports: [],
  /* PROVIDERS: all providers in any module imported in root have application scope */
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    DiGlobalRouterParamsProvider,
    provideRouter(
      [
        {
          path: RouteDashboard,
          loadChildren: () => import('src/app/module/widget/dashboard/dashboard.module').then((m) => m.DashboardModule),
        },
        {path: RouteRoot, redirectTo: RouteDashboard, pathMatch: 'full'},
        {path: RouteWild, redirectTo: RouteDashboard},
      ],
      withComponentInputBinding(),
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
