import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';

import {HierarchyComponent} from './hierarchy/hierarchy.component';
import {AdminsComponent} from './admins/admins.component';
import {TeamRoutes} from './team.routing';
import {MapModule} from '../shared/map/map.module';
import {EmployeeTableModule} from '../shared/employee-table/employee-table.module';
import {TreeComponent} from './hierarchy/tree/tree.component';
import {TasksModule} from '../tasks/tasks.module';
import {AttendanceModule} from '../attendance/attendance.module';
import {CalendarModule} from '../calendar/calendar.module';
import {BeatPlanComponent} from './beat-plan/beat-plan.component';
import {TruncatePipe} from './truncate.pipe';
import {BeatplanningService} from './beat-plan/beatplanning.service';
import {RequestsComponent} from './requests/requests.component';
import {RequestsDialogComponent} from './requests/requestsdialog.component';
import {RequestsService} from './requests.service';
import {PerformanceComponent} from './performance/performance.component';
import {JobplanningService} from './weelky-plan/jobplanning.service';
import {JobPlanComponent} from './weelky-plan/job-plan.component';
import {DaywisePlanComponent} from './daywise-plan/daywise-plan.component';
import {DaywiseplanningService} from './daywise-plan/daywiseplanning.service';
import {TeamsLocationComponent} from './teams-location/teams-location.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TeamRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MapModule,
        TasksModule,
        EmployeeTableModule,
        AttendanceModule,
        CalendarModule
    ],
    declarations: [
        HierarchyComponent,
        AdminsComponent,
        TreeComponent,
        BeatPlanComponent,
        TruncatePipe,
        RequestsComponent,
        RequestsDialogComponent,
        PerformanceComponent,
        JobPlanComponent,
        DaywisePlanComponent,
        TeamsLocationComponent
    ],
    providers: [BeatplanningService, RequestsService, JobplanningService, DaywiseplanningService],
    entryComponents: [RequestsDialogComponent]
})

export class TeamModule {
}
