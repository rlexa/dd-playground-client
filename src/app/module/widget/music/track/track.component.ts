import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {trackByIndex} from 'src/app/util';
import {Track} from '../data/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackComponent {
  @Input() track: Track;
}
