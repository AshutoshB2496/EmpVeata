import {Component, OnInit} from '@angular/core';
import {BeatplanningService} from './beatplanning.service';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material';

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
  selector: 'app-beat-plan',
  templateUrl: './beat-plan.component.html',
  styleUrls: ['./beat-plan.component.scss']
})
export class BeatPlanComponent implements OnInit {

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
    emp_id;
    emp_date;
    comment;
    action_date;
    flag = false;
    card_unique_code;
    minDate = new Date();
    beatComment = 'Customer Visit (Beat). ';


    constructor(private dialog: MatDialog, private service: BeatplanningService) {

    }

// Show Task Code.............................................................................................
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

    AddTasks() {
        this.addTasks = [];
        for (let i = 0; i < this.distributors.length; i++) {
            if (this.distributors[i].selected === true) {
                const comm = this.beatComment.concat(this.distributors[i].task);
                this.addTasks.push({
                    task: comm,
                    selftask: 0,
                    customer_id: this.distributors[i].id,
                    assignee: this.emp_id,
                    priority: 'High',
                    due_date: this.clickedDate,
                    type: this.distributors[i].label
                })
            }
        }
        console.log(this.addTasks);
        this.service.addTeamsTask(this.addTasks).subscribe(value => {
            this.refreshData();
            this.flag = false;
            swal({
                type: 'success',
                text: value,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop);
        }, error1 => {
            this.flag = false;
            swal({
                type: 'error',
                text: error1.error.msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'
            }).catch(swal.noop);
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
        })
    }

}
