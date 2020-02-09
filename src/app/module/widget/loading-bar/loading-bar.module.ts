import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LoadingBarComponent} from './loading-bar.component';

@NgModule({imports: [CommonModule, MatProgressBarModule], exports: [LoadingBarComponent], declarations: [LoadingBarComponent]})
class LoadingBarModule {}

export {LoadingBarModule, LoadingBarComponent};
