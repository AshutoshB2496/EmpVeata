import { RequestsService } from '../team/requests.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { TagInputModule } from 'ngx-chips';
import { RequestsComponent } from './requests.component';
import { RequestsRoutes } from './requests.routing';
import {RequestsDialogComponent} from '../team/requests/requestsdialog.component';

@NgModule({
    imports: [
        RouterModule.forChild(RequestsRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [RequestsComponent],
    entryComponents: [RequestsDialogComponent],
    providers: [RequestsService]
})

export class RequestsModule { }
