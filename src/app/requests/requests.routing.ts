import { Routes } from '@angular/router';

import { RequestsComponent } from './requests.component';

export const RequestsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: RequestsComponent
    }]
}
];
