import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {JobplanningService} from './jobplanning.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BeatplanningService} from '../beat-plan/beatplanning.service';

interface Beat {
    id: string,
    username: string,
    name: string,
    beatplan: any[],
    week: string[]
}

interface Distributor {
    id: string,
    name: string,
    selected: boolean,
    task: string,
    label: string,
    cdata: {
        c_lat: string,
        c_lng: string
    }
}

declare const $: any;

@Component({
    selector: 'app-job-plan',
    templateUrl: './job-plan.component.html',
    styleUrls: ['./job-plan.component.scss']
})
export class JobPlanComponent implements OnInit {

    public tasks1 = [];
    public tasks2 = [];
    public tasks3 = [];
    week: any[] = [];
    dates: any[] = [];
    day: string;
    beatplan: Beat[];
    emp_name;
    clickedDate = '';
    distributors: Distributor[];
    selected: any[] = [];
    arr: string[];
    labels: any[];
    addTasks = [];
    history = [];
    userName;
    tasks: FormGroup;
    tasksform2: FormGroup;
    emp_id;
    emp_date;
    comment;
    action_date;
    flag = false;
    card_unique_code;
    minDate = new Date();
    beatComment = 'Customer Visit (Beat). ';


    constructor(private dialog: MatDialog, private service: JobplanningService,
                private fb: FormBuilder) {
        this.tasks = this.fb.group({
            task: [null, [Validators.required]],
            label: [null, [Validators.required]],
            priority: ['Low', [Validators.required]]
        });
        this.tasksform2 = this.fb.group({
            task: [null, [Validators.required]],
            label: [null, [Validators.required]],
            assignee: [null, [Validators.required]],
            priority: ['Low', [Validators.required]],
            duedate: [null]
        });
    }

// Show Task Code.............................................................................................
    addTask() {
        this.service.AddTeamsTask(this.tasks.value, this.clickedDate, this.emp_id).subscribe(res => {
            this.tasks = this.fb.group({
                task: [null, [Validators.required]],
                label: [null, [Validators.required]],
                priority: ['Low', [Validators.required]],
            });
            this.refreshData();
            this.flag = false;
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
    addTaskAll() {
        console.log(this.tasksform2.value);
        if (this.tasksform2.value.duedate != null) {
            this.day = this.getDates2(this.tasksform2.value.duedate);
        } else {
            this.day = null;
        }
        this.service.AddTeamsTaskAll(this.tasksform2.value, this.day).subscribe(res => {
            this.refreshData();
            this.tasksform2 = this.fb.group({
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

    showAction(uniqueid) {
        this.card_unique_code = uniqueid;
        this.comment = '';
        this.action_date = '';
    }

    taskShow(empid, date) {
        this.tasks1 = [];
        this.tasks2 = [];
        this.tasks3 = [];
        this.emp_id = empid;
        this.emp_date = date;
        this.service.getPersonsTask(empid, date).subscribe(value => {
            console.log(value);
            for (let i = 0; i < value.length; i++) {
                if (value[i].state === 'Assigned') {
                    this.tasks1.push(value[i]);
                } else {
                    this.tasks2.push(value[i]);
                }
            }
        })
    }

    updateHistory(id) {
        this.service.getUpdates(id).subscribe(value => {
            this.history = value;
        })
    }

    getDates2(d) {
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

    // Actions code...........................................................................................
    onOk(action) {
        this.service.PatchAction(this.card_unique_code, this.comment, action).subscribe(res => {
            this.taskShow(this.emp_id, this.emp_date);
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

    onTarget(): void {
        const date = this.getDates2(this.action_date);
        this.service.PatchActionSchedule(this.card_unique_code, date, 'Schedule').subscribe(res => {
            this.taskShow(this.emp_id, this.emp_date);
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

    onReminder(): void {
        const date = this.getDates2(this.action_date);
        this.service.PatchActionReminder(this.card_unique_code, date, 'SetReminder').subscribe(res => {
            this.taskShow(this.emp_id, this.emp_date);
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

// Add task code..............................................................................................
    plusshow(empid, name, empuser, date) {
        this.emp_name = name;
        this.clickedDate = date;
        this.emp_id = empid;
        this.service.getDistributers(empuser).subscribe(value => {
            this.distributors = value;
            for (let i = 0; i < this.distributors.length; i++) {
                this.distributors[i].selected = false;
                this.distributors[i].task = '';
                this.distributors[i].label = '';
            }
        })
    }

    checkChanged(id, index) {
        this.flag = false;
        for (let i = 0; i < this.distributors.length; i++) {
            if (this.distributors[i].selected === true) {
                this.flag = true;
            }
        }
    }

    // commentChanged(e, id, index) {
    //     for (let i = 0; i < this.distributors.length; i++) {
    //         if (this.distributors[i].id === id) {
    //             if (this.distributors[i].task === '') {
    //                 this.distributors[i].selected = false;
    //             } else {
    //                 this.distributors[i].selected = true;
    //             }
    //         }
    //     }
    // }

// Set Week Dates Code.........................................................................................
    preweek() {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        this.week = this.getWeekString(d);
        this.getDates();
    }

    nextweek() {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        this.week = this.getWeekString(d);
        this.getDates();
    }

    curweek() {
        this.week = this.getWeekString(new Date());
        this.getDates();
    }

    getDates() {
        this.dates.length = 0;
        for (let i = 0; i < this.week.length; i++) {
            const d = new Date(this.week[i]);
            if (d.getMonth() < 9) {
                if (d.getDate() < 10) {
                    this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-0' + d.getDate();
                } else {
                    this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-' + d.getDate();
                }
            } else {
                if (d.getDate() < 10) {
                    this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-0' + d.getDate();
                } else {
                    this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }
            }
            this.dates.push(this.day);
        }
        this.refreshData();
    }

    getWeekString(fromDate) {
        const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay() + 1))
        const result = [new Date(sunday).toDateString()];
        while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 1) {
            result.push(new Date(sunday).toDateString());
        }
        return result;
    }

// Refreshing and calling data code............................................................................
    refreshData() {
        this.service.getBeatPlan(this.dates[0], this.dates[6]).subscribe(value => {
            this.beatplan = value;
            for (let i = 0; i < this.beatplan.length; i++) {
                this.beatplan[i].week = this.dates;
            }
        })
    }

    ngOnInit() {

        this.week = this.getWeekString(new Date());
        this.getDates();
        this.service.getLabels().subscribe(value => {
            this.labels = value;
        });

    }


}
