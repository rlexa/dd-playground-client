import {ChangeDetectionStrategy, Component, Inject, TrackByFunction} from '@angular/core';
import {Observable} from 'rxjs';
import {DiRemoteCurrentItemToId} from '../di-api-common';
import {DiRemoteCurrentList} from './di-ghibli-list';

@Component({
  selector: 'app-ghibli-list-detail',
  templateUrl: './ghibli-list-detail.component.html',
  styleUrls: ['./ghibli-list-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhibliListDetailComponent<T> {
  constructor(
    @Inject(DiRemoteCurrentList) public readonly items$: Observable<T[]>,
    @Inject(DiRemoteCurrentItemToId) public readonly trackById: TrackByFunction<T>,
  ) {}
}
