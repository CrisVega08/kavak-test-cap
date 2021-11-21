import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '../../directives/directives.module';
import { TabGroupComponent } from '../../components/tab-group/tab-group.component';
import { CardCarComponent } from '../../components/card-car/card-car.component';
import { DetailsCarComponent } from '../../components/details-car/details-car.component';

import { HomeComponent } from './home.component';
@NgModule({
  declarations: [
    TabGroupComponent,
    CardCarComponent,
    DetailsCarComponent,
    HomeComponent,
  ],
  imports: [CommonModule, DirectivesModule],
  exports: [HomeComponent],
})
export class HomeModule {}
