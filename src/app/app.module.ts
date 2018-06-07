import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatNativeDateModule, NativeDateModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { AppStore, createAppStore, GlobalFlags, ReduxService } from 'app/redux';
import { BuildComponent, ConfigComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, GraphTopLevelComponent, GraphWalkerComponent, MlPolynomialComponent, OverviewComponent, RoutedContentComponent, WidgetsModule } from 'app/widgets/widgets.module';
import { AppComponent } from './app.component';
import { ROUTE_AI, ROUTE_APPROXPOLYNOM, ROUTE_BUILDCONFIG, ROUTE_CONFIGURATION, ROUTE_CURRENT, ROUTE_DASHBOARD, ROUTE_DEMO_MISC, ROUTE_DEMO_STATE, ROUTE_GRAPH, ROUTE_OVERVIEW, ROUTE_PLAYGROUND, ROUTE_ROOT, ROUTE_SETTINGS, ROUTE_WALKER, ROUTE_WILDCARD } from './routing';

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
    path: ROUTE_DASHBOARD,
    component: DashboardComponent,
    children: [
      { path: ROUTE_ROOT, redirectTo: ROUTE_OVERVIEW, pathMatch: 'full' },
      {
        path: ROUTE_OVERVIEW,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_CURRENT, pathMatch: 'full' },
          { path: ROUTE_CURRENT, children: [{ path: ROUTE_ROOT, component: OverviewComponent }] }
        ]
      },
      {
        path: ROUTE_GRAPH,
        component: GraphTopLevelComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_WALKER, pathMatch: 'full' },
          { path: ROUTE_WALKER, children: [{ path: ROUTE_ROOT, component: GraphWalkerComponent }] }
        ]
      },
      {
        path: ROUTE_AI,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_APPROXPOLYNOM, pathMatch: 'full' },
          { path: ROUTE_APPROXPOLYNOM, children: [{ path: ROUTE_ROOT, component: MlPolynomialComponent }] }
        ]
      },
      {
        path: ROUTE_PLAYGROUND,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_DEMO_MISC, pathMatch: 'full' },
          { path: ROUTE_DEMO_MISC, children: [{ path: ROUTE_ROOT, component: DemoMiscComponent }] },
          { path: ROUTE_DEMO_STATE, children: [{ path: ROUTE_ROOT, component: DemoStateComponent }] }
        ]
      },
      {
        path: ROUTE_SETTINGS,
        component: RoutedContentComponent,
        children: [
          { path: ROUTE_ROOT, redirectTo: ROUTE_CONFIGURATION, pathMatch: 'full' },
          { path: ROUTE_CONFIGURATION, children: [{ path: ROUTE_ROOT, component: ConfigComponent }] },
          { path: ROUTE_BUILDCONFIG, children: [{ path: ROUTE_ROOT, component: BuildComponent }] }
        ]
      }
    ]
  },
  { path: ROUTE_ROOT, redirectTo: ROUTE_DASHBOARD, pathMatch: 'full' },
  { path: ROUTE_WILDCARD, redirectTo: ROUTE_DASHBOARD, pathMatch: 'full' }
];

@NgModule({
  /* DECLARATIONS: components, directives, and pipes belonging to that module (declare only once in app) */
  declarations: [
    AppComponent,
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
