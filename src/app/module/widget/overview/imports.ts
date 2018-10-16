import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RoutedContentModule } from 'app/module/widget/routed-content';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatListModule, FlexboxModule, RoutedContentModule];
