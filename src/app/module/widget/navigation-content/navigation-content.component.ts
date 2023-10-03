import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Data, RouterModule} from '@angular/router';
import {map} from 'rxjs/operators';
import {NavigationBarComponent, NavigationBarItemsFromRouteDirective} from '../navigation-bar';

export interface NavigationContentComponentData extends Data {
  navigationContentScrollable?: boolean;
}

@Component({
  selector: 'app-navigation-content',
  template: `<app-navigation-bar appNavigationBarItemsFromRoute layout="column" />
    <main>
      <div [class.scroll-in-y]="scrollable$ | async">
        <router-outlet />
      </div>
    </main>`,
  styleUrls: ['./navigation-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationBarComponent, NavigationBarItemsFromRouteDirective],
})
export class NavigationContentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly scrollable$ = this.activatedRoute.data.pipe(
    map(
      (data: NavigationContentComponentData) =>
        typeof data?.navigationContentScrollable === 'undefined' || data.navigationContentScrollable,
    ),
  );
}
