import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {RouteRoot, RouteWild} from 'src/app/routing';
import {FlexboxDirective} from '../../directive/flexbox';
import {SimpleViewComponent} from '../simple-view';
import {CryptoComponent} from './crypto.component';

const ROUTING: Routes = [
  {path: RouteRoot, component: CryptoComponent, pathMatch: 'full'},
  {path: RouteWild, redirectTo: RouteRoot},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FlexboxDirective,
    SimpleViewComponent,
    RouterModule.forChild(ROUTING),
  ],
  exports: [CryptoComponent],
  declarations: [CryptoComponent],
})
class CryptoModule {}

export {CryptoComponent, CryptoModule};
