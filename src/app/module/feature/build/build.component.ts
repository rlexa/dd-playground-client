import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {DiGlobalFlags} from 'src/app/di-global';
import {SimpleViewComponent} from '../../widget/simple-view';

@Component({
  selector: 'app-build',
  template: `<mat-card appearance="outlined" *ngIf="globalFlags$ | async as data">
    <mat-card-title>Build Settings</mat-card-title>
    <mat-card-content>
      <app-simple-view [data]="data" [isWidthConstrained]="false" />
    </mat-card-content>
  </mat-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatCardModule, SimpleViewComponent],
})
export class BuildComponent {
  readonly globalFlags$ = inject(DiGlobalFlags);
}
