import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesService} from '../../sales-service.service';

@Component({
  selector: 'app-regionwise',
  templateUrl: './regionwise.component.html',
  styleUrls: ['./regionwise.component.scss']
})
export class RegionwiseNewCustomersComponent implements OnInit {

    zone: string;
    month: string;
    year: string;
    regionData: any;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: SalesService) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.zone = params['zone'];
                this.month = params['month'];
                this.year = params['year'];
                this.service.getRegionData(this.zone, this.month, this.year)
                    .subscribe(value => {
                        this.regionData = value.data;
                    });
            });

    }
    back() {
        this.router.navigate(['reports', 'newcustomersreport'], {queryParams: {
                month: this.month,
                year: this.year
            }});
    }

}
