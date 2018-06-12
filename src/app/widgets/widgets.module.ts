import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { FlexboxModule } from 'dd-flexbox';
import { BuildComponent, ConfigComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, DiagramPolynomComponent, EmptyComponent, GraphTopLevelComponent, GraphWalkerComponent, MlPolynomialComponent, OverviewComponent, RoutedContentComponent, SimpleViewComponent, VersionComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,

    FlexboxModule,

    GeneralModule,
  ],
  declarations: [
    BuildComponent,
    ConfigComponent,
    DashboardComponent,
    DemoMiscComponent,
    DemoStateComponent,
    DiagramPolynomComponent,
    EmptyComponent,
    GraphTopLevelComponent,
    GraphWalkerComponent,
    MlPolynomialComponent,
    OverviewComponent,
    RoutedContentComponent,
    SimpleViewComponent,
    VersionComponent,
  ],
  exports: [
    BuildComponent,
    ConfigComponent,
    DashboardComponent,
    DemoMiscComponent,
    DemoStateComponent,
    EmptyComponent,
    GraphTopLevelComponent,
    GraphWalkerComponent,
    MlPolynomialComponent,
    OverviewComponent,
    RoutedContentComponent,
  ]
})
export class WidgetsModule { }

export { BuildComponent, ConfigComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, GraphTopLevelComponent, GraphWalkerComponent, EmptyComponent, MlPolynomialComponent, OverviewComponent, RoutedContentComponent, };

