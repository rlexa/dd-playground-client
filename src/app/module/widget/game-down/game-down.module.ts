import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'app/routing';
import {GameDownAiInitiativeComponent} from './game-down-ai-initiative.component';
import {GameDownConfigComponent} from './game-down-config.component';
import {GameDownFieldComponent} from './game-down-field.component';
import {GameDownSceneComponent} from './game-down-scene.component';
import {GameDownComponent} from './game-down.component';
import {imports} from './imports';
import {RenderSimpleFieldComponent} from './renderer';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: GameDownComponent},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT, pathMatch: 'full'},
];

@NgModule({
  imports: [...imports, RouterModule.forChild(ROUTING)],
  exports: [GameDownComponent],
  declarations: [
    GameDownAiInitiativeComponent,
    GameDownComponent,
    GameDownConfigComponent,
    GameDownFieldComponent,
    GameDownSceneComponent,
    RenderSimpleFieldComponent,
  ],
})
export class GameDownModule {}
