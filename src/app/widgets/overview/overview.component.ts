import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeToAiApproxPolynom } from 'app/routing';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  constructor(private readonly router: Router) { }
  gotoAiApproxPolynom = () => routeToAiApproxPolynom(this.router);
}
