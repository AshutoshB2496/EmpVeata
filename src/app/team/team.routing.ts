import {Routes} from '@angular/router';

import {HierarchyComponent} from './hierarchy/hierarchy.component';
import {MapComponent} from '../shared/map/map.component';
import {EmployeeTableComponent} from '../shared/employee-table/employee-table.component';
import {AttendanceComponent} from '../attendance/attendance.component';
import {CalendarComponent} from '../calendar/calendar.component';
import {TeamsTasksComponent} from './teams-tasks/teams-tasks.component';
import {BeatPlanComponent} from './beat-plan/beat-plan.component';
import {PerformanceComponent} from './performance/performance.component';
import {JobPlanComponent} from './weelky-plan/job-plan.component';
import {DaywisePlanComponent} from './daywise-plan/daywise-plan.component';
import {Map2Component} from '../shared/map/map2.component';
import {TeamsLocationComponent} from './teams-location/teams-location.component';
import {MeetPlanComponent} from './meet-plan/meet-plan.component';


export const TeamRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'teams-location',
            component: TeamsLocationComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'teams-tasks',
            component: TeamsTasksComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'performance',
            component: PerformanceComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'beatplanning',
            component: MeetPlanComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'jobplanning',
            component: JobPlanComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'daywiseplanning',
            component: DaywisePlanComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'hierarchy',
            component: HierarchyComponent,
            children: [
                {
                    path: 'locations',
                    component: Map2Component
                },
                {
                    path: 'details',
                    component: EmployeeTableComponent
                },
                {
                    path: 'calendar',
                    component: CalendarComponent
                },
                {
                    path: 'attendance/:id',
                    component: AttendanceComponent,
                    children: [{
                        path: 'locations',
                        component: MapComponent
                    }]
                }]
        }]
    }
];
