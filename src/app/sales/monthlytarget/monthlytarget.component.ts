import {Component, OnInit} from '@angular/core';
import {MonthlytargetService} from './monthlytarget.service';

declare const $: any;

@Component({
    selector: 'app-monthlytarget',
    templateUrl: './monthlytarget.component.html',
    styleUrls: ['./monthlytarget.component.scss']
})
export class MonthlytargetComponent implements OnInit {
    username = '';
    CurrentMonthData = [];
    PreviousMonthData = [];
    PreToPreMonthData = [];

    constructor(private service: MonthlytargetService) {

    }

    ngOnInit() {
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.service.getMonthlyDataOfcurrent(this.username).subscribe(value => {
            this.CurrentMonthData = value;
        });
        this.service.getMonthlyDataOfpre(this.username).subscribe(value => {
            this.PreviousMonthData = value;
        });
        this.service.getMonthlyDataOfpreTopre(this.username).subscribe(value => {
            this.PreToPreMonthData = value;
        })
    }

}
