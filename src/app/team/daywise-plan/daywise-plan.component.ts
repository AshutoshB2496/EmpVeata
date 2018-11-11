import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {DaywiseplanningService} from './daywiseplanning.service';

interface Beat {
    id: string,
    username: string,
    name: string,
    beatplan: any[],
    week: string[]
}

interface Jobs {
    id: string,
    unique_code: string,
    selected: boolean,
    start_time: string,
    end_time: string,
    start_time_value: number,
    end_time_value: number,
    locality: number,
    description: string,
    type: string,
    task: string,
    label: string
}

declare const $: any;

@Component({
    selector: 'app-daywise-plan',
    templateUrl: './daywise-plan.component.html',
    styleUrls: ['./daywise-plan.component.scss']
})
export class DaywisePlanComponent implements OnInit {

    public assignedJobs = [];
    week: any[] = [];
    dates: any[] = [];
    day: string;
    beatplan: Beat[];
    emp_name;
    clickedDate = '';
    jobs: Jobs[];
    selected: any[] = [];
    arr: string[];
    labels: any[];
    addJobs = [];
    history = [];
    emp_id;
    comment;
    flag = false;
    card_unique_code;
    minDate = new Date();
    sampleJobs = [];
    total_epmloyees;
    total_pages = Math.floor(this.total_epmloyees / 4);
    current_page;
    ifremainder = false;
    total_pages2;
    dayDate;
    selectedDate;

    constructor(private dialog: MatDialog, private service: DaywiseplanningService) {

    }

    prevPage() {
        this.current_page = this.current_page - 1;
        this.ifremainder = false;
        this.service.getTeamJobs(this.dayDate, this.current_page).subscribe(value => {
            this.sampleJobs = value.data;
        });
    }

    nextPage() {
        console.log(this.current_page, this.total_pages2);
        this.current_page = this.current_page + 1;
        if (this.current_page === (this.total_pages2)) {
            if (this.total_epmloyees % 4 !== 0) {
                this.total_pages2 = this.total_pages + 1;
                this.ifremainder = true;
            }
        }
        this.service.getTeamJobs(this.dayDate, this.current_page).subscribe(value => {
            this.sampleJobs = value.data;
        });
    }

    onFreeSlotClick(time1, time2, id, name) {
        console.log('clicked card');
        this.emp_name = name;
        this.emp_id = id;
        this.service.getJobsOfFreeSlot(this.clickedDate, time1, time2).subscribe(value => {
            this.jobs = value;
            for (let i = 0; i < this.jobs.length; i++) {
                this.jobs[i].selected = false;
            }
        })
    }

// Show Task Code.............................................................................................

    jobShow(empid, date, name) {
        this.assignedJobs = [];
        this.emp_name = name;
        this.clickedDate = date;
        this.emp_id = empid;
        this.service.getAssignedJobs(empid, date).subscribe(value => {
            this.assignedJobs = value;
        })
    }

// Add task code..............................................................................................
    plusshow(empid, name, empuser, date) {
        this.emp_name = name;
        this.clickedDate = date;
        this.emp_id = empid;
        this.service.getJobs(date).subscribe(value => {
            this.jobs = value;
            for (let i = 0; i < this.jobs.length; i++) {
                this.jobs[i].selected = false;
            }
        })
    }

    AddJobs() {
        this.addJobs = [];
        for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].selected === true) {
                this.addJobs.push(this.jobs[i].unique_code);
            }
        }
        this.service.assignJobMany(this.addJobs, this.emp_id).subscribe(value => {
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

    AddJob(unique_code) {
        this.service.assignJobMany(unique_code, this.emp_id).subscribe(value => {
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
        for (let i = 0; i < this.jobs.length; i++) {
            if (this.jobs[i].selected === true) {
                this.flag = true;
            }
        }
    }

    preday() {
        const d = new Date(this.dayDate);
        d.setDate(d.getDate() - 1);
        this.dayDate = this.getDayDate(d);
        this.service.getTeamJobs(this.dayDate, 1).subscribe(value => {
            this.sampleJobs = value.data;
            this.total_epmloyees = value.pagination.total;
            this.total_pages = Math.floor(this.total_epmloyees / 4);
            this.current_page = 1;
            this.ifremainder = false;
            this.total_pages2 = this.total_pages;
            if (this.total_epmloyees % 4 !== 0) {
                this.total_pages2 = this.total_pages + 1;
            }
        });
    }

    nextday() {
        const d = new Date(this.dayDate);
        d.setDate(d.getDate() + 1);
        this.dayDate = this.getDayDate(d);
        this.service.getTeamJobs(this.dayDate, 1).subscribe(value => {
            this.sampleJobs = value.data;
            this.total_epmloyees = value.pagination.total;
            this.total_pages = Math.floor(this.total_epmloyees / 4);
            this.current_page = 1;
            this.ifremainder = false;
            this.total_pages2 = this.total_pages;
            if (this.total_epmloyees % 4 !== 0) {
                this.total_pages2 = this.total_pages + 1;
            }
        });
    }

    curday() {
        const d = new Date();
        d.setDate(d.getDate());
        this.dayDate = this.getDayDate(d);
    }
    selectDate() {
        console.log(this.selectedDate);
        const d = new Date(this.selectedDate);
        d.setDate(d.getDate());
        this.dayDate = this.getDayDate(d);
    }
// Set Week Dates Code.........................................................................................
    getDayDate(d) {
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

// Refreshing and calling data code............................................................................
    refreshData() {
    }

    ngOnInit() {
        this.curday();
        // this.service.getJobsStatic('', '', '').subscribe(value => {
        //     this.sampleJobs = value;
        // });
        this.service.getTeamJobs(this.dayDate, 1).subscribe(value => {
            this.sampleJobs = value.data;
            this.total_epmloyees = value.pagination.total;
            this.total_pages = Math.floor(this.total_epmloyees / 4);
            this.current_page = 1;
            this.ifremainder = false;
            this.total_pages2 = this.total_pages;
            if (this.total_epmloyees % 4 !== 0) {
                this.total_pages2 = this.total_pages + 1;
            }
        });

    }

}
