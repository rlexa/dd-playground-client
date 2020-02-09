import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
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
