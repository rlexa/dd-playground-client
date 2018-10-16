import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { D3numberPipeModule } from 'app/module/pipe/d3number';
import { IconPipeModule } from 'app/module/pipe/icon';
import { RipupperPipeModule } from 'app/module/pipe/ripupper';
import { StartuppercasePipeModule } from 'app/module/pipe/startuppercase';
import { RoutedContentModule } from 'app/module/widget/routed-content';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';
import { CryptoComponent, DemoMiscComponent, DemoStateComponent, DiagramPolynomComponent, EmptyComponent, GameDownComponent, GameDownConfigComponent, GameDownFieldComponent, GameDownSceneComponent, GhibliComponent, GraphTopLevelComponent, GraphWalkerComponent, LoadingBarComponent, MlPolynomialComponent, OverviewComponent, RenderSimpleFieldComponent, SimpleTableComponent } from '.';

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

    RoutedContentModule,
    SimpleViewModule,
  ],
  declarations: [
    CryptoComponent,
    DemoMiscComponent,
    DemoStateComponent,
    DiagramPolynomComponent,
    EmptyComponent,
    GameDownComponent,
    GameDownConfigComponent,
    GameDownFieldComponent,
    GameDownSceneComponent,
    GhibliComponent,
    GraphTopLevelComponent,
    GraphWalkerComponent,
    LoadingBarComponent,
    MlPolynomialComponent,
    OverviewComponent,
    RenderSimpleFieldComponent,
    SimpleTableComponent,
  ],
  exports: [
    CryptoComponent,
    DemoMiscComponent,
    DemoStateComponent,
    EmptyComponent,
    GameDownComponent,
    GhibliComponent,
    GraphTopLevelComponent,
    GraphWalkerComponent,
    MlPolynomialComponent,
    OverviewComponent,
  ]
})
export class WidgetsModule { }
