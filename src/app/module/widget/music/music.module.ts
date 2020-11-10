import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {MusicComponent} from './music.component';
import {TrackModule} from './track';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: MusicComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
];

@NgModule({
  declarations: [MusicComponent],
  imports: [CommonModule, TrackModule],
  exports: [MusicComponent],
})
class MusicModule {}

@NgModule({
  imports: [MusicModule, RouterModule.forChild(ROUTING)],
})
class RoutedMusicModule {}

export {MusicModule, MusicComponent, RoutedMusicModule};
