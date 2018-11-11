import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';
import {CalendarService} from './calendar-service.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule
    ],
    providers: [CalendarService],
    declarations: [CalendarComponent]
})

export class CalendarModule {}
