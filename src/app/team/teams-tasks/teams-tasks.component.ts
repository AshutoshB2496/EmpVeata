import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../taskdialog.component';
import {TaskDatePickerDialogComponent} from '../task-date-picker-dialog.component';
import {TaskService} from 'app/shared/tasks.service';

declare var $: any;

@Component({
    selector: 'app-teams-tasks',
    templateUrl: './teams-tasks.component.html',
    styleUrls: ['./teams-tasks.component.scss']
})
export class TeamsTasksComponent implements OnInit {
    public tasks_open = [];
    public tasks_marked_done = [];
    public tasks_completed = [];
    public tasks_due_today = [];
    public labels: any[];
    tasks: FormGroup;
    history: any[];
    minDate = new Date();
    team: any[];
    day;
    employeeId = '';

    constructor(private service: TaskService,
                private dialog: MatDialog,
                private fb: FormBuilder) {
        this.tasks = this.fb.group({
            task: [null, [Validators.required]],
            label: [null, [Validators.required]],
            assignee: [null, [Validators.required]],
            priority: ['Low', [Validators.required]],
            duedate: [null]
        });
    }

    filter() {
        this.refreshCompleted();
        this.refreshDue();
        this.refreshMarked();
        this.refreshOpen();
    }

    updateHistory(id) {
        this.service.getUpdates(id).subscribe(value => {
            this.history = value;
        })
    }

    openDialogForSchedule(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDatePickerDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Set Target Date'}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                const date = this.getDates(result.message);
                this.service.PatchActionSchedule(uniqueid, date, 'Schedule').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForSetReminder(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDatePickerDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Set Reminder'}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                const date = this.getDates(result.message);
                this.service.PatchActionReminder(uniqueid, date, 'SetReminder').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForReOpen(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Reopen', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'ReOpen').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForComment(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Post Comment', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Comment').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForMarkDone(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Done/Close', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'MarkDone').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);

                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForMarkComplete(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Archive', visible: false}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'MarkComplete').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);

                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForDelete(uniqueid): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Delete This Task', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Delete').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);
                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    getDates(d) {
        if (d.getMonth() < 9) {
            if (d.getDate() < 10) {
                return this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-0' + d.getDate();
            } else {
                return this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        } else {
            if (d.getDate() < 10) {
                return this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-0' + d.getDate();
            } else {
                return this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        }
    }

    addTask() {
        console.log(this.tasks.value);
        if (this.tasks.value.duedate != null) {
            this.day = this.getDates(this.tasks.value.duedate);
        } else {
            this.day = null;
        }
        this.service.AddTeamsTask(this.tasks.value, this.day).subscribe(res => {
            this.refreshOpen();
            this.refreshDue();
            this.tasks = this.fb.group({
                task: [null, [Validators.required]],
                label: [null, [Validators.required]],
                assignee: [null, [Validators.required]],
                priority: ['Low', [Validators.required]],
                duedate: [null]
            });
            swal({
                type: 'success',
                text: res,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop);
        }, err => {
            swal({
                type: 'error',
                text: err.error.msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'
            }).catch(swal.noop);
        });
    }

    refreshOpen() {
        if (this.employeeId === '') {
            this.service.getOpenTeamsTasks().subscribe(value => {
                this.tasks_open = value;
                console.log(value);
            });
        } else {
            this.service.getOpenTasksFiltered(this.employeeId).subscribe(value => {
                this.tasks_open = value;
                console.log(value);
            });
        }
    }

    refreshMarked() {
        if (this.employeeId === '') {
            this.service.getMarkedTeamsTasks().subscribe(value => {
                this.tasks_marked_done = value;
                console.log(value);
            });
        } else {
            this.service.getMarkedTasksFiltered(this.employeeId).subscribe(value => {
                this.tasks_marked_done = value;
                console.log(value);
            });
        }
    }

    refreshCompleted() {
        if (this.employeeId === '') {
            this.service.getCompletedTeamsTasks().subscribe(value => {
                this.tasks_completed = value;
                console.log(value);
            });
        } else {
            this.service.getCompletedTasksFiltered(this.employeeId).subscribe(value => {
                this.tasks_completed = value;
                console.log(value);
            });
        }
    }

    refreshDue() {
        if (this.employeeId === '') {
            this.service.getdueTodayTeamsTasks().subscribe(value => {
                this.tasks_due_today = value;
                console.log(value);
            });
        } else {
            this.service.getdueTodayTasksFiltered(this.employeeId).subscribe(value => {
                this.tasks_due_today = value;
                console.log(value);
            });
        }
    }

    refresh() {
        this.refreshDue();
        this.refreshMarked();
        this.refreshOpen();
    }

    ngOnInit() {
        this.refreshDue();
        this.refreshMarked();
        this.refreshOpen();
        this.refreshCompleted()
        this.service.getLabels().subscribe(value => {
            this.labels = value;
        });
        this.service.getTeamList().subscribe(value => {
            this.team = value;
        })
    }
}
