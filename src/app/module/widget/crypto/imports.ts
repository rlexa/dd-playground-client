import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CryptoApiModule } from 'app/module/service/crypto-api';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  FormsModule,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  FlexboxModule,
  CryptoApiModule,
  SimpleViewModule,
];
