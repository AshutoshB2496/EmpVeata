import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {PerformanceRoutes} from './performance.routing';
import {PerformanceComponent} from './performance.component';
import {NouisliderModule} from 'ng2-nouislider';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
    imports: [
        RouterModule.forChild(PerformanceRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        NouisliderModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    declarations: [PerformanceComponent]
})

export class PerformanceModule {
}
