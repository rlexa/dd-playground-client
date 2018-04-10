import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatNativeDateModule, NativeDateModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { AppStore, GlobalFlags, ReduxService, createAppStore } from 'app/redux';
import { BuildComponent, ConfigComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, OverviewComponent, RoutedContentComponent, WidgetsModule } from 'app/widgets/widgets.module';
import { AppComponent } from './app.component';
import * as routing from './routing';

async function loadHttp(path: string, http: HttpClient, handler: (data: any) => void, parseAs: 'json' | 'text' = 'json') {
  try {
    handler(parseAs === 'text' ?
      (await http.get(path, { responseType: 'text', headers: { 'content-type': 'text/plain;charset=utf-8' } }).toPromise()) :
      (await http.get(path, { responseType: 'json' }).toPromise()));
  } catch (ex) {
    console.error('While loading "' + path + '"', ex);
  }
}

export function beforeInit(http: HttpClient, redux: ReduxService) {
  return () => Promise.all([
    loadHttp('/assets/flags.json', http, data =>
      redux.mergeGlobalFlags({
        ...data,
        ...<GlobalFlags>{ isProduction: data && data.buildVariant && data.buildVariant.toLowerCase() === 'prod' }
      }))
  ]);
}

const appRoutes: Routes = [
  {
    path: routing.DASHBOARD,
    component: DashboardComponent,
    children: [
      { path: routing.ROOT, redirectTo: routing.OVERVIEW, pathMatch: 'full' },
      {
        path: routing.OVERVIEW,
        component: RoutedContentComponent,
        children: [
          { path: routing.ROOT, redirectTo: routing.CURRENT, pathMatch: 'full' },
          { path: routing.CURRENT, children: [{ path: routing.ROOT, component: OverviewComponent }] }
        ]
      },
      {
        path: routing.PLAYGROUND,
        component: RoutedContentComponent,
        children: [
          { path: routing.ROOT, redirectTo: routing.DEMO_MISC, pathMatch: 'full' },
          { path: routing.DEMO_MISC, children: [{ path: routing.ROOT, component: DemoMiscComponent }] },
          { path: routing.DEMO_STATE, children: [{ path: routing.ROOT, component: DemoStateComponent }] }
        ]
      },
      {
        path: routing.SETTINGS,
        component: RoutedContentComponent,
        children: [
          { path: routing.ROOT, redirectTo: routing.CONFIGURATION, pathMatch: 'full' },
          { path: routing.CONFIGURATION, children: [{ path: routing.ROOT, component: ConfigComponent }] },
          { path: routing.BUILDCONFIG, children: [{ path: routing.ROOT, component: BuildComponent }] }
        ]
      }
    ]
  },
  { path: routing.ROOT, redirectTo: routing.DASHBOARD, pathMatch: 'full' },
  { path: routing.WILDCARD, redirectTo: routing.DASHBOARD, pathMatch: 'full' }
];

@NgModule({
  /* DECLARATIONS: components, directives, and pipes belonging to that module (declare only once in app) */
  declarations: [
    AppComponent
  ],
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
    // own
    GeneralModule,
    WidgetsModule,
    // routing
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  /* EXPORTS: Export declared classes that components in other modules are able to reference in their templates */
  exports: [],
  /* PROVIDERS: all providers in any module imported in root have application scope */
  providers: [
    { provide: AppStore, useFactory: createAppStore },
    ReduxService,
    {
      provide: APP_INITIALIZER,
      deps: [HttpClient, ReduxService],
      multi: true,
      useFactory: beforeInit
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
