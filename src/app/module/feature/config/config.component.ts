import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-config',
  template: `<mat-card appearance="outlined">
    <mat-card-title>Configuration</mat-card-title>
    <mat-card-content>
      <mat-list class="mat-list-auto-height">
        <h3 mat-subheader>Nothing to configure yet.</h3>
      </mat-list>
    </mat-card-content>
  </mat-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
})
export class ConfigComponent {}
