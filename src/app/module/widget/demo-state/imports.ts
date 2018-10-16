import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [CommonModule, RouterModule, MatCardModule, FlexboxModule, SimpleViewModule];
