import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {SimpleViewModule} from 'src/app/module/widget/simple-view';

export const imports = [CommonModule, RouterModule, MatCardModule, SimpleViewModule];
