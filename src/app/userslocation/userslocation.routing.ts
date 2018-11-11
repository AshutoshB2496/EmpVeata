import { Routes } from '@angular/router';

import { DaywiseComponent } from './daywise/daywise.component';
import {DaywiseListComponent} from './daywise-list/daywise-list.component';


export const UserslocationRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'daywise-map',
        component: DaywiseComponent
    }, {
        path: 'daywise-list',
        component: DaywiseListComponent
    }, {
          path: 'daywise-list/:date',
          component: DaywiseListComponent
      }
      ]}
];
