import {NgModule} from '@angular/core';
import {ItemToIdPipe, ItemToTitlePipe} from './ghibli-item-getters.pipe';
import {ItemsSortByPipe} from './ghibli-items-sort-by.pipe';

@NgModule({
  declarations: [ItemsSortByPipe, ItemToIdPipe, ItemToTitlePipe],
  exports: [ItemsSortByPipe, ItemToIdPipe, ItemToTitlePipe],
})
class ApiPipesModule {}

export {ApiPipesModule};
