import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DiagramPolynomModule } from 'app/module/widget/diagram-polynom';
import { SimpleViewModule } from 'app/module/widget/simple-view';
import { FlexboxModule } from 'dd-flexbox';

export const imports = [CommonModule, RouterModule, MatButtonModule, MatCardModule, FlexboxModule, DiagramPolynomModule, SimpleViewModule];
