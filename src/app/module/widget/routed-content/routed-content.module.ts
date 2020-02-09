import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RoutedContentComponent} from './routed-content.component';

@NgModule({imports: [RouterModule], exports: [RoutedContentComponent], declarations: [RoutedContentComponent]})
class RoutedContentModule {}

export {RoutedContentModule, RoutedContentComponent};
