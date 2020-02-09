import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
  FlexboxModule,
  SimpleViewModule,
];
