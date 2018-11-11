import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonthlytargetComponent} from '../sales/monthlytarget/monthlytarget.component';
import {QuarterlytargetComponent} from '../sales/quarterlytarget/quarterlytarget.component';

const routes: Routes = [
    {
        path: '',
        children: [ {
            path: 'monthlytarget',
            component: MonthlytargetComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'quarterlytarget',
            component: QuarterlytargetComponent
        }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRouting { }
