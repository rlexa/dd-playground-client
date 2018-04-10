import { Router } from '@angular/router';

/* ROUTE PARTS */

export const BUILDCONFIG = 'buildconfig';
export const CONFIGURATION = 'configuration';
export const CURRENT = 'current';
export const DASHBOARD = 'dashboard';
export const DEMO_MISC = 'demomisc';
export const DEMO_STATE = 'demostate';
export const OVERVIEW = 'overview';
export const PLAYGROUND = 'playground';
export const ROOT = '';
export const SETTINGS = 'settings';
export const WILDCARD = '**';

/* ROUTE URL QUERY PARAMS */

/* ROUTE NAVIGATION */

export const gotoSettings = (router: Router) => router.navigate([DASHBOARD, SETTINGS, BUILDCONFIG]);
