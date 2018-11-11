import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { TagInputModule } from 'ngx-chips';
import { InventoryRoutes } from './inventory.routing';
import {InventoryComponent} from './inventory.component';
import { NouisliderModule } from 'ng2-nouislider';
import {TableModule} from '../shared/table/table.module';
@NgModule({
    imports: [
        RouterModule.forChild(InventoryRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        NouisliderModule,
        MaterialModule,
        TableModule
    ],
    declarations: [InventoryComponent],
    providers: []
})

export class InventoryModule {}
