import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrackMetaModule} from './track-meta';
import {TrackTextModule} from './track-text';
import {TrackComponent} from './track.component';

@NgModule({
  declarations: [TrackComponent],
  imports: [CommonModule, TrackMetaModule, TrackTextModule],
  exports: [TrackComponent],
})
class TrackModule {}

export {TrackModule, TrackComponent};
