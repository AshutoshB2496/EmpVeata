import { Routes } from '@angular/router';

import {MyTasksComponent} from './my-tasks/my-tasks.component';
import {TeamsTasksComponent} from '../team/teams-tasks/teams-tasks.component';

export const TasksRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'my-tasks',
        component: MyTasksComponent
    }]
}
];
