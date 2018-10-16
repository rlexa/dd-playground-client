import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { D3numberPipeModule } from 'app/module/pipe/d3number';
import { IconPipeModule } from 'app/module/pipe/icon';
import { RipupperPipeModule } from 'app/module/pipe/ripupper';
import { StartuppercasePipeModule } from 'app/module/pipe/startuppercase';
import { LoadingBarModule } from 'app/module/widget/loading-bar';
import { RoutedContentModule } from 'app/module/widget/routed-content';
import { SimpleTableModule } from 'app/module/widget/simple-table';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';
import { GameDownComponent, GameDownConfigComponent, GameDownFieldComponent, GameDownSceneComponent, RenderSimpleFieldComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,

    FlexboxModule,

    D3numberPipeModule,
    IconPipeModule,
    RipupperPipeModule,
    StartuppercasePipeModule,

    LoadingBarModule,
    RoutedContentModule,
    SimpleTableModule,
    SimpleViewModule,
  ],
  declarations: [
    GameDownComponent,
    GameDownConfigComponent,
    GameDownFieldComponent,
    GameDownSceneComponent,
    RenderSimpleFieldComponent,
  ],
  exports: [
    GameDownComponent,
  ]
})
export class WidgetsModule { }
