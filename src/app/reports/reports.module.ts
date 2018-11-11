import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './report-sales/sales/sales.component';
import {RouterModule} from '@angular/router';
import {repRoutes} from './reports.routing';
import { RegionwiseComponent } from './report-sales/regionwise/regionwise.component';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import {SalesService} from './sales-service.service';
import { ReportNewcustomersComponent } from './report-newcustomers/report-newcustomers.component';
import { NewCustomersComponent } from './report-newcustomers/new-customers/new-customers.component';
import {RegionwiseNewCustomersComponent} from './report-newcustomers/regionwise/regionwise.component';

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(repRoutes),
  ],
    providers: [SalesService],
  declarations: [
      SalesComponent,
      RegionwiseComponent,
      ReportSalesComponent,
      ReportNewcustomersComponent,
      NewCustomersComponent,
      RegionwiseNewCustomersComponent]
})
export class ReportsModule { }
