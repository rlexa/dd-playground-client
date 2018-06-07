import { Router } from '@angular/router';

/* ROUTE PARTS */

export const ROUTE_AI = 'ai';
export const ROUTE_BUILDCONFIG = 'buildconfig';
export const ROUTE_CONFIGURATION = 'configuration';
export const ROUTE_CURRENT = 'current';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_DEMO_MISC = 'demomisc';
export const ROUTE_DEMO_STATE = 'demostate';
export const ROUTE_OVERVIEW = 'overview';
export const ROUTE_PLAYGROUND = 'playground';
export const ROUTE_APPROXPOLYNOM = 'approxpolynom';
export const ROUTE_ROOT = '';
export const ROUTE_SETTINGS = 'settings';
export const ROUTE_WILDCARD = '**';

/* ROUTE URL QUERY PARAMS */

/* ROUTE NAVIGATION */

export const routeToSettings = (router: Router) => router.navigate([ROUTE_DASHBOARD, ROUTE_SETTINGS, ROUTE_BUILDCONFIG]);
export const routeToAiApproxPolynom = (router: Router) => router.navigate([ROUTE_DASHBOARD, ROUTE_AI, ROUTE_APPROXPOLYNOM]);
