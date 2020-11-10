import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent {}
