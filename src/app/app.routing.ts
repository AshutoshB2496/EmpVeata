import {Authguard} from './gaurds/authguard';
import {Anonguard} from './gaurds/anonguard';
import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {RegisterComponent} from './pages/register/register.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'masters/employees',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent, canActivate: [Authguard],
        children: [
            // {
            //     path: '',
            //     loadChildren: './dashboard/dashboard.module#DashboardModule'
            // },
            {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'masters',
                loadChildren: './masters/masters.module#MastersModule',
            }, {
                path: 'team',
                loadChildren: './team/team.module#TeamModule'
            }, {
                path: 'userslocation',
                loadChildren: './userslocation/userslocation.module#UserslocationModule'
            }, {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            }, {
                path: 'announcements',
                loadChildren: './announcements/announcements.module#AnnouncementsModule'
            }, {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            }, {
                path: 'targets',
                loadChildren: './targets/targets.module#TargetsModule'
            }, {
                path: 'sales',
                loadChildren: './sales/sales.module#SalesModule'
            }, {
                path: 'performance',
                loadChildren: './performance/performance.module#PerformanceModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }, {
                path: 'bulkform',
                loadChildren: './bulkform/bulkform.module#BulkformModule'
            }, {
                path: 'myprofile',
                loadChildren: './myprofile/myProfile.module#MyProfileModule'
            },
            {
                path: 'attendance',
                loadChildren: './attendance/attendance.module#AttendanceModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'tasks',
                loadChildren: './tasks/tasks.module#TasksModule'
            }, {
                path: 'inventory',
                loadChildren: './inventory/inventory.module#InventoryModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }, {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            }
        ]
    },
    {
        path: 'mobile',
        loadChildren: './dashboardMobile/dashboardMobile.module#DashboardMobileModule'
    },
    {
        path: '',
        component: AuthLayoutComponent, canActivate: [Anonguard],
        children: [{
            path: 'login',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }

];
