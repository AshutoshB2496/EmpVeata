import { Routes } from '@angular/router';
import {MyProfileComponent} from './myProfile.component';

export const myProfileRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: '',
        component: MyProfileComponent
    }]
}
];
