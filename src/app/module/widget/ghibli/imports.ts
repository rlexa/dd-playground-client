import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {GhibliApiModule} from 'src/app/module/service/ghibli-api';
import {LoadingBarModule} from 'src/app/module/widget/loading-bar';
import {SimpleTableModule} from 'src/app/module/widget/simple-table';
import {SimpleViewModule} from 'src/app/module/widget/simple-view';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

export const imports = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  FlexboxModule,
  GhibliApiModule,
  LoadingBarModule,
  SimpleTableModule,
  SimpleViewModule,
];
