import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {map} from 'rxjs/operators';

export interface NavigationContentComponentData extends Data {
  navigationContentScrollable?: boolean;
}

@Component({
  selector: 'app-navigation-content',
  templateUrl: './navigation-content.component.html',
  styleUrls: ['./navigation-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContentComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  public readonly scrollable$ = this.activatedRoute.data.pipe(
    map(
      (data: NavigationContentComponentData) =>
        typeof data?.navigationContentScrollable === 'undefined' || data.navigationContentScrollable,
    ),
  );
}
