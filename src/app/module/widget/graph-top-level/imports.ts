import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GraphskyApiModule } from 'app/module/service/graphsky-api';
import { RoutedContentModule } from 'app/module/widget/routed-content';

export const imports = [CommonModule, HttpClientModule, RouterModule, GraphskyApiModule, RoutedContentModule];
