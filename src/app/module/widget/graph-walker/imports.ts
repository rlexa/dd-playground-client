import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { IconPipeModule } from 'app/module/pipe/icon';
import { GraphskyApiModule } from 'app/module/service/graphsky-api';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'app/module/directive/flexbox';

export const imports = [
  CommonModule,
  RouterModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FlexboxModule,
  GraphskyApiModule,
  IconPipeModule,
  SimpleViewModule,
];
