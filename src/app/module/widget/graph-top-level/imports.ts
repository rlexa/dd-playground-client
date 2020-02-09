import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RoutedContentModule} from 'src/app/module/widget/routed-content';

export const imports = [CommonModule, HttpClientModule, RouterModule, RoutedContentModule];
