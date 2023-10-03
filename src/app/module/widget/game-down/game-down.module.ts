import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {GameDownAiInitiativeComponent} from './game-down-ai-initiative.component';
import {GameDownConfigComponent} from './game-down-config.component';
import {GameDownFieldComponent} from './game-down-field.component';
import {GameDownSceneComponent} from './game-down-scene.component';
import {GameDownComponent} from './game-down.component';
import {RenderSimpleFieldComponent} from './renderer';

const ROUTING: Routes = [
  {path: RouteRoot, component: GameDownComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    FlexboxDirective,
    SimpleViewComponent,
    RouterModule.forChild(ROUTING),
  ],
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
class GameDownModule {}

export {GameDownComponent, GameDownModule};
