import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {CrmRoutes} from './lead.routing';
import {LeadComponent} from './lead.component';
import {NouisliderModule} from 'ng2-nouislider';
import {LeadService} from '../sales/lead.service';
import {LeadDialogComponent} from '../sales/leads/leaddialog.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
    imports: [
        RouterModule.forChild(CrmRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        NouisliderModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    providers: [LeadService],
    entryComponents: [LeadDialogComponent],
    declarations: [LeadComponent]
})

export class LeadModule {
}
