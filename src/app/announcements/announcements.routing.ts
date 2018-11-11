import { Routes } from '@angular/router';

import {AnnouncementsComponent} from "./announcements.component";

export const AnnouncementsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: AnnouncementsComponent
    }]
}
];
