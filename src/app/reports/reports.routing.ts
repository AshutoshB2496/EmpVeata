import {Routes} from '@angular/router';
import {SalesComponent} from './report-sales/sales/sales.component';
import {RegionwiseComponent} from './report-sales/regionwise/regionwise.component';
import {ReportSalesComponent} from './report-sales/report-sales.component';
import {NewCustomersComponent} from './report-newcustomers/new-customers/new-customers.component';
import {RegionwiseNewCustomersComponent} from './report-newcustomers/regionwise/regionwise.component';

export const repRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: ReportSalesComponent
        }, {
            path: 'salesreport',
            component: SalesComponent,
        }, {
            path: 'regionreport',
            component: RegionwiseComponent
        }, {
            path: 'newcustomersreport',
            component: NewCustomersComponent,
        }, {
            path: 'regioncustomerareport',
            component: RegionwiseNewCustomersComponent
        }]
    }
];
