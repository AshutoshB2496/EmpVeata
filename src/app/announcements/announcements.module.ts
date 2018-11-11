import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { TagInputModule } from 'ngx-chips';
import {AnnouncementsComponent} from "./announcements.component";
import { AnnouncementsRoutes } from './announcements.routing';

@NgModule({
    imports: [
        RouterModule.forChild(AnnouncementsRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [AnnouncementsComponent]
})

export class AnnouncementsModule {}
