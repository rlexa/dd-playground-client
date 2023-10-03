import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {IconPipe} from 'src/app/module/pipe/icon';
import {ApiPipesModule} from '../api-pipes/api-pipes.module';
import {GhiblLinkComponent} from './ghibli-link.component';

@NgModule({
  declarations: [GhiblLinkComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatTooltipModule, IconPipe, ApiPipesModule],
  exports: [GhiblLinkComponent],
})
class GhiblLinkModule {}

export {GhiblLinkComponent, GhiblLinkModule};
