import { Routes } from '@angular/router';

import {AttendanceComponent} from './attendance.component';
import {MapComponent} from '../shared/map/map.component';
import {EmployeeTableComponent} from '../shared/employee-table/employee-table.component';
import {HierarchyComponent} from '../team/hierarchy/hierarchy.component';

export const atdRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: AttendanceComponent
        }]
    }
];
