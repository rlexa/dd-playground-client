import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { IconPipeModule } from 'app/module/pipe/icon';
import { RoutedContentModule } from 'app/module/widget/routed-content';
import { VersionModule } from 'app/module/widget/version';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [
  CommonModule, RouterModule,
  MatButtonModule, MatToolbarModule, MatTooltipModule, FlexboxModule,
  IconPipeModule, RoutedContentModule, VersionModule,
];
