import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SimpleViewModule} from 'src/app/module/widget/simple-view';
import {FlexboxModule} from 'src/app/module/directive/flexbox';

export const imports = [CommonModule, RouterModule, FlexboxModule, SimpleViewModule];
