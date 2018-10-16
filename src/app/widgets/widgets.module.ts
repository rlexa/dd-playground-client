import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { FlexboxModule } from 'dd-flexbox';
import { BuildComponent, ConfigComponent, CryptoComponent, DemoMiscComponent, DemoStateComponent, DiagramPolynomComponent, EmptyComponent, GameDownComponent, GameDownConfigComponent, GameDownFieldComponent, GameDownSceneComponent, GhibliComponent, GraphTopLevelComponent, GraphWalkerComponent, LoadingBarComponent, MlPolynomialComponent, OverviewComponent, RenderSimpleFieldComponent, RoutedContentComponent, SimpleTableComponent, SimpleViewComponent } from '.';

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

    GeneralModule,
  ],
  declarations: [
    BuildComponent,
    ConfigComponent,
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
    RoutedContentComponent,
    SimpleTableComponent,
    SimpleViewComponent,
  ],
  exports: [
    BuildComponent,
    ConfigComponent,
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
    RoutedContentComponent,
  ]
})
export class WidgetsModule { }
