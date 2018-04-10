import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatListModule, MatSelectModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'app/general/general.module';
import { FlexboxModule } from 'dd-flexbox';
import { BuildComponent, ConfigComponent, DashboardComponent, DemoMiscComponent, DemoStateComponent, EmptyComponent, OverviewComponent, RoutedContentComponent, SimpleViewComponent, VersionComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
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
    EmptyComponent,
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
    OverviewComponent,
    RoutedContentComponent,
  ]
})
export class WidgetsModule { }

export {
  BuildComponent,
  ConfigComponent,
  DashboardComponent,
  DemoMiscComponent,
  DemoStateComponent,
  EmptyComponent,
  OverviewComponent,
  RoutedContentComponent,
};
