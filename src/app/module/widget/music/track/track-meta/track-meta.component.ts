import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';
import {Meta, TRACK_META_TITLE} from '../../data/track';

@Component({
  selector: 'app-track-meta',
  templateUrl: './track-meta.component.html',
  styleUrls: ['./track-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackMetaComponent {
  @Input() meta: Meta;

  readonly TRACK_META_TITLE = TRACK_META_TITLE;
  readonly trackByIndex = trackByIndex;
}
