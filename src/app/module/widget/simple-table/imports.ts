import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {RipupperPipeModule} from 'src/app/module/pipe/ripupper';
import {StartuppercasePipeModule} from 'src/app/module/pipe/startuppercase';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

export const imports = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  FlexboxModule,
  RipupperPipeModule,
  StartuppercasePipeModule,
];
