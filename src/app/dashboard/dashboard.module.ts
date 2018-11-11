import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdModule} from '../md/md.module';
import {MaterialModule} from '../app.module';
import {AmChartsModule} from '@amcharts/amcharts3-angular';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutes} from './dashboard.routing';
import {DashboardService} from './dashboard.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        AmChartsModule
    ], providers: [DashboardService],
    declarations: [DashboardComponent]
})

export class DashboardModule {
}
