import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { IconPipeModule } from 'app/module/pipe/icon';
import { GraphskyApiModule } from 'app/module/service/graphsky-api';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [
  CommonModule, RouterModule,
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, FlexboxModule,
  GraphskyApiModule, IconPipeModule, SimpleViewModule,
];
