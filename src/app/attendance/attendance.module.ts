import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendanceComponent} from './attendance.component';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {atdRoutes} from './attendance.routing';
import {AttendanceService} from './attendance.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MapModule} from '../shared/map/map.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(atdRoutes),
      TagInputModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      Ng2SearchPipeModule,
      MapModule
  ],
    providers: [AttendanceService],
  declarations: [AttendanceComponent]
})
export class AttendanceModule { }
