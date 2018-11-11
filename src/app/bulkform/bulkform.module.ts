import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {BulkRoutes} from './bulkform.routing';
import {BulkformComponent} from './bulkform.component';
import {BulkformService} from './bulkform.service';

@NgModule({
    imports: [
        RouterModule.forChild(BulkRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ], providers: [BulkformService],
    declarations: [BulkformComponent]
})

export class BulkformModule {
}
