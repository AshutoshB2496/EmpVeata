import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NouisliderModule} from 'ng2-nouislider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';
import {MaterialModule} from '../app.module';

import {CustomersComponent} from './customers/customers.component';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {WarehousesComponent} from './warehouses/warehouses.component';
import {RegionsComponent} from './regions/regions.component';
import {RatelistComponent} from './ratelist/ratelist.component';
import {MastersRoutes} from './masters.routing';
import {CustomerService} from './customers/customer-service.service';
import {TableModule} from '../shared/table/table.module';
import {CatalogueService} from './catalogue/catalogue.service';
import {EmployeesComponent} from './employees/employees.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MastersRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        TableModule
    ],
    declarations: [
        CustomersComponent,
        CatalogueComponent,
        WarehousesComponent,
        RatelistComponent,
        RegionsComponent,
        EmployeesComponent
    ],
    providers: [CustomerService, CatalogueService]
})

export class MastersModule {
}
