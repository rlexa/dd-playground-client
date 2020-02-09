import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {IconPipeModule} from 'src/app/module/pipe/icon';
import {RoutedContentModule} from 'src/app/module/widget/routed-content';
import {VersionModule} from 'src/app/module/widget/version';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

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
