import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MatNativeDateModule, NativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {FlexboxModule} from './module/directive/flexbox';
import {ROUTE_DASHBOARD, ROUTE_ROOT, ROUTE_WILDCARD} from './routing';
import {AppRxStore, createAppRxStore, RxStateSetGlobalService} from './rx-state';

async function loadHttp(path: string, http: HttpClient, handler: (data: any) => void, parseAs: 'json' | 'text' = 'json') {
  try {
    handler(
      parseAs === 'text'
        ? await http
            .get(path, {
              responseType: 'text',
              headers: {'content-type': 'text/plain;charset=utf-8'},
            })
            .toPromise()
        : await http.get(path, {responseType: 'json'}).toPromise(),
    );
  } catch (ex) {
    console.error('While loading "' + path + '"', ex);
  }
}

export function beforeInit(http: HttpClient, rxMutateGlobal: RxStateSetGlobalService) {
  return () =>
    Promise.all([
      loadHttp('/assets/flags.json', http, (data) =>
        rxMutateGlobal.mergeFlags({
          ...data,
          ...{
            isProduction: data && data.buildVariant && data.buildVariant.toLowerCase() === 'prod',
          },
        }),
      ),
    ]);
}

const appRoutes: Routes = [
  {
    path: ROUTE_DASHBOARD,
    loadChildren: () => import('src/app/module/widget/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {path: ROUTE_ROOT, redirectTo: ROUTE_DASHBOARD, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_DASHBOARD, pathMatch: 'full'},
];

@NgModule({
  /* DECLARATIONS: components, directives, and pipes belonging to that module (declare only once in app) */
  declarations: [AppComponent],
  /* ENTRYCOMPONENTS: components that can't be resolved only by their selector e.g. when router targeted */
  entryComponents: [],
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
  ],
  /* EXPORTS: Export declared classes that components in other modules are able to reference in their templates */
  exports: [],
  /* PROVIDERS: all providers in any module imported in root have application scope */
  providers: [
    {provide: AppRxStore, useFactory: createAppRxStore},
    {
      provide: APP_INITIALIZER,
      deps: [HttpClient, RxStateSetGlobalService],
      multi: true,
      useFactory: beforeInit,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
