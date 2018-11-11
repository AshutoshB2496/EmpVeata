import { Routes } from '@angular/router';

import { LeadComponent } from './lead.component';

export const CrmRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: LeadComponent
    }]
}
];
