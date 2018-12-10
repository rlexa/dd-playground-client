import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { D3numberPipeModule } from 'app/module/pipe/d3number';
import { DiagramPolynomModule } from 'app/module/widget/diagram-polynom';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [
  CommonModule, RouterModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, FlexboxModule,
  D3numberPipeModule, DiagramPolynomModule, SimpleViewModule,
];
