import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { DaywiseComponent } from './daywise/daywise.component';
import { UserslocationRoutes } from './userslocation.routing';
import {LocationService} from '../shared/map/locationService.service';
import {MapModule} from '../shared/map/map.module';
import { DaywiseListComponent } from './daywise-list/daywise-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserslocationRoutes),
    FormsModule,
    MaterialModule,
      MapModule
  ],
  declarations: [
      DaywiseComponent,
      DaywiseListComponent
  ],
    providers: [LocationService]
})

export class UserslocationModule {}

