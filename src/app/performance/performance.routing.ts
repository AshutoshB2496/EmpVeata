import { Routes } from '@angular/router';

import { PerformanceComponent } from './performance.component';

export const PerformanceRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: PerformanceComponent
    }]
}
];
