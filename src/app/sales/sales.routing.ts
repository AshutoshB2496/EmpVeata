import { Routes } from '@angular/router';

import { SchemesComponent } from './schemes/schemes.component';
import { OrdersComponent } from './orders/orders.component';
import {QuarterlytargetComponent} from './quarterlytarget/quarterlytarget.component';
import {MonthlytargetComponent} from './monthlytarget/monthlytarget.component';
import {LeadsComponent} from './leads/leads.component';


export const SalesRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'schemes',
            component: SchemesComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'orders',
            component: OrdersComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'monthlytarget',
            component: MonthlytargetComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'quarterlytarget',
            component: QuarterlytargetComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'leads',
            component: LeadsComponent
        }]
    }
];
