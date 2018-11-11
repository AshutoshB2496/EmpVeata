import {Routes} from '@angular/router';
import {DashboardMobileComponent} from './dashboardMobile.component';

export const DashboardMobileRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'reports',
            component: DashboardMobileComponent
        }]
    }
];
