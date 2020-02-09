import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  FlexboxModule,
];
