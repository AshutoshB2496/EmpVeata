import {TaskDialogComponent} from '../team/taskdialog.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {TasksRoutes} from './tasks.routing';
import {TaskService} from '../shared/tasks.service';
import {MyTasksComponent} from './my-tasks/my-tasks.component';
import {TeamsTasksComponent} from '../team/teams-tasks/teams-tasks.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TaskDatePickerDialogComponent} from '../team/task-date-picker-dialog.component';
@NgModule({
    imports: [
        RouterModule.forChild(TasksRoutes),
        CommonModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        TaskDialogComponent,
        TaskDatePickerDialogComponent,
        MyTasksComponent,
        TeamsTasksComponent],
    entryComponents: [TaskDialogComponent, TaskDatePickerDialogComponent],
    providers: [TaskService]
})

export class TasksModule {
}
