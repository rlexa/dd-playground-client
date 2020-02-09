import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IconPipeModule } from 'app/module/pipe/icon';
import { RoutedContentModule } from 'app/module/widget/routed-content';
import { VersionModule } from 'app/module/widget/version';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatToolbarModule,
  MatTooltipModule,
  FlexboxModule,
  IconPipeModule,
  RoutedContentModule,
  VersionModule,
];
