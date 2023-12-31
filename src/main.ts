import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {AppComponent} from './app/app.component';
import {DiGlobalRouterParamsProvider} from './app/di-global';
import {FlexboxDirective} from './app/module/directive/flexbox';
import {RouteDashboard, RouteRoot, RouteWild} from './app/routing';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([MatNativeDateModule, NativeDateModule, FlexboxDirective]),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    DiGlobalRouterParamsProvider,
    provideRouter(
      [
        {path: RouteDashboard, loadChildren: () => import('src/app/module/widget/dashboard/routes')},
        {path: RouteRoot, redirectTo: RouteDashboard, pathMatch: 'full'},
        {path: RouteWild, redirectTo: RouteDashboard},
      ],
      withComponentInputBinding(),
    ),
  ],
}).catch((err) => console.log(err));
