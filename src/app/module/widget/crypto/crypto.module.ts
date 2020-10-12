import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RouterModule, Routes} from '@angular/router';
import {ROUTE_ROOT, ROUTE_WILDCARD} from 'src/app/routing';
import {FlexboxModule} from '../../directive/flexbox';
import {SimpleViewModule} from '../simple-view';
import {CryptoComponent} from './crypto.component';

const ROUTING: Routes = [
  {path: ROUTE_ROOT, component: CryptoComponent, pathMatch: 'full'},
  {path: ROUTE_WILDCARD, redirectTo: ROUTE_ROOT},
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
    FlexboxModule,
    SimpleViewModule,
    RouterModule.forChild(ROUTING),
  ],
  exports: [CryptoComponent],
  declarations: [CryptoComponent],
})
class CryptoModule {}

export {CryptoModule, CryptoComponent};
