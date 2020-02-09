import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

export const imports = [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatListModule, FlexboxModule];
