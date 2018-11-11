import {Routes} from '@angular/router';

import {CustomersComponent} from './customers/customers.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {WarehousesComponent} from './warehouses/warehouses.component';
// import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import {RatelistComponent} from './ratelist/ratelist.component';
import {RegionsComponent} from './regions/regions.component';
import {TableComponent} from '../shared/table/table.component';
import {EmployeesComponent} from './employees/employees.component';

export const MastersRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'customers',
            component: CustomersComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'catalogue',
            component: CatalogueComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'offices',
            component: WarehousesComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'ratelist',
            component: RatelistComponent,
            children: [{
                path: 'table/:type',
                component: TableComponent
            }]
        }]
    },
    {
        path: '',
        children: [{
            path: 'regions',
            component: RegionsComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'employees',
            component: EmployeesComponent
        }]
    }
];
