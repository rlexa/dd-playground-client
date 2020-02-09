import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GraphskyApiModule } from 'app/module/service/graphsky-api';
import { DiagramPolynomModule } from 'app/module/widget/diagram-polynom';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  FlexboxModule,
  DiagramPolynomModule,
  GraphskyApiModule,
  SimpleViewModule,
];
