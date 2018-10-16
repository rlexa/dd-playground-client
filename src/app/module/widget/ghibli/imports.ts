import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GhibliApiModule } from 'app/module/service/ghibli-api';
import { LoadingBarModule } from 'app/module/widget/loading-bar';
import { SimpleTableModule } from 'app/module/widget/simple-table';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [
  CommonModule, RouterModule,
  MatButtonModule, MatCardModule, MatListModule, FlexboxModule,
  GhibliApiModule, LoadingBarModule, SimpleTableModule, SimpleViewModule,
];
