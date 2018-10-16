import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { RipupperPipeModule } from 'app/module/pipe/ripupper';
import { StartuppercasePipeModule } from 'app/module/pipe/startuppercase';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [
  CommonModule,
  MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, FlexboxModule,
  RipupperPipeModule, StartuppercasePipeModule,
];
