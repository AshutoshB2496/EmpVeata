import { Routes } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import {TableComponent} from '../shared/table/table.component';

export const InventoryRoutes: Routes = [
    {
        path: '',
        component: InventoryComponent,
        children: [{
            path: 'table/:type',
            component: TableComponent
        }]
    }
];
