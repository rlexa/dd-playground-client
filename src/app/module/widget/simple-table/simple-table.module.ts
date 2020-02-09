import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {FlexboxModule} from '../../directive/flexbox';
import {RipupperPipeModule} from '../../pipe/ripupper';
import {StartuppercasePipeModule} from '../../pipe/startuppercase';
import {SimpleTableComponent} from './simple-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FlexboxModule,
    RipupperPipeModule,
    StartuppercasePipeModule,
  ],
  exports: [SimpleTableComponent],
  declarations: [SimpleTableComponent],
})
class SimpleTableModule {}

export {SimpleTableModule, SimpleTableComponent};
