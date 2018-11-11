import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdModule} from '../md/md.module';
import {MaterialModule} from '../app.module';
import {AmChartsModule} from '@amcharts/amcharts3-angular';

import {DashboardMobileRoutes} from './dashboardMobile.routing';
import {DashboardMobileService} from './dashboardMobile.service';
import {DashboardMobileComponent} from './dashboardMobile.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardMobileRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        AmChartsModule
    ], providers: [DashboardMobileService],
    declarations: [DashboardMobileComponent]
})

export class DashboardMobileModule {
}
