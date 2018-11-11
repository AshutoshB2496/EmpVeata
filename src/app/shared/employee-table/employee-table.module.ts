import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../app.module';
import {EmployeeTableComponent} from './employee-table.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule],
    exports: [EmployeeTableComponent],
    declarations: [EmployeeTableComponent]
})
export class EmployeeTableModule {
}