import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-overview',
  template: `<mat-card appearance="outlined">
    <mat-card-title>Empty?</mat-card-title>
    <mat-card-content>
      <mat-list>
        <h4 mat-header>Empty</h4>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
})
export class OverviewComponent {}
