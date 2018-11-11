import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesService} from '../../sales-service.service';

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.scss']
})
export class NewCustomersComponent implements OnInit {

    zoneData: any;
    month: string;
    monthStr: string;
    previousMonth: string;
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    befPreviousMonth: string;
    year: any;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private service: SalesService) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.year = params['year'];
                this.month = params['month'];
                const d = new Date();
                if (d.getMonth() + +this.month >= 0) {
                    this.monthStr = this.months[(d.getMonth() + +this.month) % 12] + ' ' +
                        (d.getFullYear() + Math.floor((d.getMonth() + +this.month) / 12));
                    console.log(this.months[d.getMonth() + +this.month]);
                } else {
                    this.monthStr = '' + this.months[12 + (d.getMonth() + +this.month)] + ' ' + (d.getFullYear() - 1);
                    console.log(d.getFullYear() - 1, this.months[12 + (d.getMonth() + +this.month)]);
                }


                const monthAr = [];
                const t1 = this.month + ' ' + this.year;
                const temp = new Date(t1);
                const t2 = new Date(+this.year, temp.getMonth() - 1);
                const t3 = new Date(+this.year, temp.getMonth() - 2);
                this.previousMonth = t2.toString().substr(4, 3);
                monthAr.push(this.month);
                monthAr.push(this.previousMonth);
                this.befPreviousMonth = t3.toString().substr(4, 3);
                monthAr.push(this.befPreviousMonth);
                this.service.getZoneData(this.month, this.year)
                    .subscribe(value => {
                        this.zoneData = value.data;
                        console.log(this.zoneData);
                    });
            });

    }
    regionReport (zone: string) {
        this.router.navigate(['reports', 'regioncustomerareport'], {queryParams: {
                zone: zone,
                month: this.month,
                year: this.year
            }});
    }
}
