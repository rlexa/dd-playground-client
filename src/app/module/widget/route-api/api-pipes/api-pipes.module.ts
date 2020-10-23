import {NgModule} from '@angular/core';
import {ItemToIdPipe, ItemToTitlePipe} from './ghibli-item-getters.pipe';
import {ItemsSortByPipe} from './ghibli-items-sort-by.pipe';
import {GhibliRouteLinkPipe} from './ghibli-router-link.pipe';

@NgModule({
  declarations: [GhibliRouteLinkPipe, ItemsSortByPipe, ItemToIdPipe, ItemToTitlePipe],
  exports: [GhibliRouteLinkPipe, ItemsSortByPipe, ItemToIdPipe, ItemToTitlePipe],
})
class ApiPipesModule {}

export {ApiPipesModule};
