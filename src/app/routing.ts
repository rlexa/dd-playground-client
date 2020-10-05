import {Router} from '@angular/router';

/* ROUTE PARTS */

export const ROUTE_BLOCKCHAIN = 'blockchain';
export const ROUTE_BUILDCONFIG = 'buildconfig';
export const ROUTE_CONFIGURATION = 'configuration';
export const ROUTE_CURRENT = 'current';
export const ROUTE_CRYPTO = 'crypto';
export const ROUTE_DASHBOARD = 'dashboard';
export const ROUTE_DEMO_GHIBLI = 'demoghibli';
export const ROUTE_DEMO_MISC = 'demomisc';
export const ROUTE_DEMO_STATE = 'demostate';
export const ROUTE_GAME = 'game';
export const ROUTE_GAME_DOWN = 'game_down';
export const ROUTE_GAME_MINESWEEPER = 'game_minesweeper';
export const ROUTE_GAME_SNAKE = 'game_snake';
export const ROUTE_GRAPH = 'graph';
export const ROUTE_MATH = 'math';
export const ROUTE_OVERVIEW = 'overview';
export const ROUTE_PLAYGROUND = 'playground';
export const ROUTE_RENDER_CANVAS = 'rendercanvas';
export const ROUTE_ROOT = '';
export const ROUTE_SCHOOL = 'school';
export const ROUTE_SETTINGS = 'settings';
export const ROUTE_WALKER = 'walker';
export const ROUTE_WILDCARD = '**';

/* ROUTE URL QUERY PARAMS */

/* ROUTE NAVIGATION */

export const routeToSettings = (router: Router) => router.navigate([ROUTE_DASHBOARD, ROUTE_SETTINGS, ROUTE_BUILDCONFIG]);
