import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { FlexboxModule } from 'dd-flexbox';
import 'hammerjs';
import { BuildComponent, ConfigComponent, CryptoComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, DiagramPolynomComponent, EmptyComponent, GameDownComponent, GameDownConfigComponent, GameDownFieldComponent, GameDownSceneComponent, GhibliComponent, GraphTopLevelComponent, GraphWalkerComponent, LoadingBarComponent, MlPolynomialComponent, OverviewComponent, RenderSimpleFieldComponent, RoutedContentComponent, SimpleTableComponent, SimpleViewComponent, VersionComponent } from '.';

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
    DashboardComponent,
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
    VersionComponent,
  ],
  exports: [
    BuildComponent,
    ConfigComponent,
    CryptoComponent,
    DashboardComponent,
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

export { BuildComponent, ConfigComponent, CryptoComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, GameDownComponent, GhibliComponent, GraphTopLevelComponent, GraphWalkerComponent, EmptyComponent, MlPolynomialComponent, OverviewComponent, RoutedContentComponent, };

