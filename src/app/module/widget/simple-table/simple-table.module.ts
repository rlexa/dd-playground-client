import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {FlexboxDirective} from '../../directive/flexbox';
import {RipupperPipe} from '../../pipe/ripupper';
import {StartuppercasePipe} from '../../pipe/startuppercase';
import {SimpleTableComponent} from './simple-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FlexboxDirective,
    RipupperPipe,
    StartuppercasePipe,
  ],
  exports: [SimpleTableComponent],
  declarations: [SimpleTableComponent],
})
class SimpleTableModule {}

export {SimpleTableComponent, SimpleTableModule};
