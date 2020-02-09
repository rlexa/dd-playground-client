import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {SimpleViewModule} from 'src/app/module/widget/simple-view';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

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
  SimpleViewModule,
];
