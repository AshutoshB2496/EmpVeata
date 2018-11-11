import {OrdersDialogComponent} from './orders/ordersdialog.component';
import {SalesService} from './sales.service';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {NouisliderModule} from 'ng2-nouislider';
import {SchemesComponent} from './schemes/schemes.component';
import {OrdersComponent} from './orders/orders.component';
import {SalesRoutes} from './sales.routing';
import {SchemesService} from './schemes/schemes.service';
import {MonthlytargetComponent} from './monthlytarget/monthlytarget.component';
import {QuarterlytargetComponent} from './quarterlytarget/quarterlytarget.component';
import {LeadsComponent} from './leads/leads.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {LeadService} from './lead.service';
import {LeadDialogComponent} from './leads/leaddialog.component';
import {MonthlytargetService} from './monthlytarget/monthlytarget.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SalesRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        SchemesComponent,
        OrdersComponent,
        OrdersDialogComponent,
        MonthlytargetComponent,
        QuarterlytargetComponent,
        LeadsComponent,
        LeadDialogComponent
    ],
    providers: [SalesService, SchemesService, LeadService, MonthlytargetService],
    entryComponents: [LeadDialogComponent, OrdersDialogComponent]
})

export class SalesModule {
}
