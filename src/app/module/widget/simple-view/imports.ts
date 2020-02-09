import { CommonModule } from '@angular/common';
import { MatButtonModule, MatListModule } from '@angular/material';
import { IconPipeModule } from 'app/module/pipe/icon';
import { RipupperPipeModule } from 'app/module/pipe/ripupper';
import { StartuppercasePipeModule } from 'app/module/pipe/startuppercase';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  MatButtonModule,
  MatListModule,
  FlexboxModule,
  IconPipeModule,
  RipupperPipeModule,
  StartuppercasePipeModule,
];
