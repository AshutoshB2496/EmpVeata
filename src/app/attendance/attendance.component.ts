import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TableData} from '../md/md-table/md-table.component';
import {AttendanceService} from './attendance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeServices} from '../shared/employee-services.service';

declare let $: any;
declare interface Task {
    title: string;
    checked: boolean;
}

@Component({
    selector: 'app-teams-tasks',
    templateUrl: './attendance.component.html',
    styleUrls: []
})
export class AttendanceComponent implements OnInit {
    public tableData1: TableData;
    public tasks1: Task[];
    public tasks2: Task[];
    public tasks3: Task[];
    employeeid: string;
    empName = '';
    frmId = false;
    employees: any;
    currentEmployee = '';
    locations: any;
    selectedDate = 0;
    dateFilters = ['This+Last Month', 'This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months'];
    statusFilters = ['On-Time', 'Late'];
    selectedStatus = '';

    constructor(private service: AttendanceService,
                private route: ActivatedRoute,
                private empService: EmployeeServices,
                private router: Router) {}
    ngOnInit() {
        this.empService.sendEmployeeName
            .subscribe(name => {
                this.empName = name;
                console.log('name received');
            });
        this.route.params.
            subscribe(params => {
                /*if (params['id'] !== undefined) {
                    this.employeeid = params['id'];
                    this.frmId = true;
                } else {
                    this.frmId = false;
                    this.employeeid = JSON.parse(localStorage.getItem('user')).id;
                }*/
            this.employeeid = params['id'];
                this.tableData1 = {
                    headerRow: [ 'Date', 'Time', 'Status', 'Day End Time', 'Day Start Location', 'Day End Location'],
                    dataRows: []
                };
                this.getLocations();
            });
    }
    getToday(): string {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        let dd = '' + day;
        let mm = '' + month;

        const yyyy = today.getFullYear();
        if (day < 10) {
            dd = '0' + day;
        }
        if (month < 10) {
            mm = '0' + month;
        }
        const tod = yyyy + '-' + mm + '-' + dd;
        return tod  ;
    }
    showLocations(date) {
        this.router.navigate(['locations'], {relativeTo: this.route, queryParams: {
                date: date,
                id: this.employeeid
            }})
    }
    filterByDate(i: number) {
        this.tableData1.dataRows.length = 0;
        let formDate1 = this.getToday();
        let formDate2: string;
        let formMonth: string;
        /*let date = this.locations[i].recorded_at_date;*/
        const month = formDate1.substr(5, 2);
        switch (i) {
            case 0 :
                formMonth = '';
                if (month.charAt(0) === '0') {
                    const temp = +month.charAt(1) - 1;
                    let y;
                    if (temp === 0) {
                        formMonth = '12';
                        y = '' + (+formDate1.substr(0, 4) - 1);
                    } else {
                        y = '' + (+formDate1.substr(0, 4));
                        formMonth = formMonth + '0' + temp;
                    }
                    formDate2 = y + '-' + formMonth + '-01';
                } else {
                    const temp = (+month) - 1;
                    formMonth = formMonth + temp;
                    formDate2 = +formDate1.substr(0, 5) + formMonth + '-01'
                }
                console.log(formDate1, formDate2);
                this.service.filterByDate(this.employeeid, formDate1, formDate2)
                    .subscribe(data => {
                        this.locations = data;
                        console.log(this.tableData1.dataRows);
                        for (const location of data) {
                            const temp = [];
                            temp.push(location.recorded_at_date);
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            if (location.attendance === 0) {
                                temp.push('Late');
                            } else {
                                temp.push('On-Time');
                            }
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            temp.push('960');
                            temp.push(location.dvfga_formatted_address);
                            temp.push(location.dvfga_formatted_address);
                            this.tableData1.dataRows.push(temp);
                        }
                    });
                break;
            case 1 :
                formDate2 = formDate1.substr(0, 7) + '-01';
                console.log(formDate1, formDate2);
                this.service.filterByDate(this.employeeid, formDate1, formDate2)
                    .subscribe(data => {
                        this.locations = data;
                        console.log(this.tableData1.dataRows);
                        for (const location of data) {
                            const temp = [];
                            temp.push(location.recorded_at_date);
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            if (location.attendance === 0) {
                                temp.push('Late');
                            } else {
                                temp.push('On-Time');
                            }
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            temp.push('960');
                            temp.push(location.dvfga_formatted_address);
                            temp.push(location.dvfga_formatted_address);
                            this.tableData1.dataRows.push(temp);
                        }
                    });
                break;
            case 2 :
                formMonth = '';
                let days;
                if (month.charAt(0) === '0') {
                    const temp = +month.charAt(1) - 1;
                    days = new Date(+formDate1.substr(0, 4), temp, 0);
                    console.log(days.getDate());
                    let y;
                    if (temp === 0) {
                        formMonth = '12';
                        days = new Date(+formDate1.substr(0, 4) - 1, 12, 0);
                        y = '' + (+formDate1.substr(0, 4) - 1);
                        formDate2 = y + '-' + formMonth + '-01';
                    } else {
                        formMonth = formMonth + '0' + temp;
                        days = new Date(+formDate1.substr(0, 4), temp, 0);
                        formDate2 = formDate1.substr(0, 5) + formMonth + '-01';
                    }
                } else {
                    const temp = (+month) - 1;
                    days = new Date(+formDate1.substr(0, 4), temp, 0);
                    formMonth = formMonth + temp;
                    formDate2 = formDate1.substr(0, 4) + '-' + formMonth + '-01';
                }
                formDate1 = formDate1.substr(0, 4) + '-' + formMonth + '-' + (days.getDate() > 10 ? days.getDate() : '0' + days.getDate());
                console.log(formDate1, formDate2);
                this.service.filterByDate(this.employeeid, formDate1, formDate2)
                    .subscribe(data => {
                        this.locations = data;
                        console.log(this.tableData1.dataRows);
                        for (const location of data) {
                            const temp = [];
                            temp.push(location.recorded_at_date);
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            if (location.attendance === 0) {
                                temp.push('Late');
                            } else {
                                temp.push('On-Time');
                            }
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            temp.push('960');
                            temp.push(location.dvfga_formatted_address);
                            temp.push(location.dvfga_formatted_address);
                            this.tableData1.dataRows.push(temp);
                        }
                    });
                break;
            case 3 :
                formMonth = '';
                let y = '';
                let temp = '' + (+month - 3 <= 0 ? 12 - (+month - 3) : '0' + (+month - 3));
                if (+month - 3 < 0) {
                    y = y + (+formDate1.substr(0, 4) - 1);
                } else {
                    y = y + (+formDate1.substr(0, 4));
                }
                formDate2 = '' + y + '-' + temp + formDate1.substr(7);
                console.log(formDate1, formDate2);
                this.service.filterByDate(this.employeeid, formDate1, formDate2)
                    .subscribe(data => {
                        this.locations = data;
                        console.log(this.tableData1.dataRows);
                        for (const location of data) {
                            const t = [];
                            t.push(location.recorded_at_date);
                            t.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            if (location.attendance === 0) {
                                t.push('Late');
                            } else {
                                t.push('On-Time');
                            }
                            t.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            t.push('960');
                            t.push(location.dvfga_formatted_address);
                            t.push(location.dvfga_formatted_address);
                            this.tableData1.dataRows.push(t);
                        }
                    });
                break;
            case 4 :
                formMonth = '';
                y = '';
                temp = '' + (+month - 6 <= 0 ? 12 - (+month - 6) : '0' + (+month - 6));
                if (+month - 6 <= 0) {
                    y = y + (+formDate1.substr(0, 4) - 1);
                } else {
                    y = y + (+formDate1.substr(0, 4));
                }
                formDate2 = '' + y + '-' + temp + formDate1.substr(7);
                console.log(formDate1, formDate2);
                this.service.filterByDate(this.currentEmployee, formDate1, formDate2)
                    .subscribe(data => {
                        this.locations = data;
                        console.log(this.tableData1.dataRows);
                        for (const location of data) {
                            const temp = [];
                            temp.push(location.recorded_at_date);
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            if (location.attendance === 0) {
                                temp.push('Late');
                            } else {
                                temp.push('On-Time');
                            }
                            temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                            temp.push('960');
                            temp.push(location.dvfga_formatted_address);
                            temp.push(location.dvfga_formatted_address);
                            this.tableData1.dataRows.push(temp);
                        }
                    });
                break;
        }
    }
    getLocations() {
        /*this.disableDateFilter = false;
        this.disableStatusFilter = false;
        this.currentEmployee = this.employees[id].id;*/
        console.log(this.employeeid);
        /*this.service.getLocations(this.employeeid)
            .subscribe(data => {
                this.locations = data;
                console.log(this.locations);
                for (const location of data) {
                    const temp = [];
                    temp.push(location.recorded_at_date);
                    temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                    temp.push('on-time');
                    temp.push((location.recorded_at).substr((location.recorded_at).indexOf(' ')));
                    this.tableData1.dataRows.push(temp);
                }
            });*/
        this.filterByDate(0);
    }
}
