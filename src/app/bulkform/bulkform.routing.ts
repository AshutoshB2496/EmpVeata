import { Routes } from '@angular/router';
import {BulkformComponent} from './bulkform.component';

export const BulkRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: BulkformComponent
    }]
}
];
