import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SalesService} from '../../sales-service.service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

    zoneData: any;
    month: string;
    previousMonth: string;
    year: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: SalesService) { }

  ngOnInit() {
      this.route.queryParams
          .subscribe(params => {
              this.month = params['month'];
              this.year = params['year'];
              const t1 = this.month + ' ' + this.year;
              const temp = new Date(t1);
              const t2 = new Date(+this.year, temp.getMonth() - 1);
              this.previousMonth = t2.toString().substr(4, 3);
              this.service.getZoneData(this.month, this.year)
                  .subscribe(value => {
                      this.zoneData = value.data;
                      console.log(this.zoneData);
                  });
          });

  }
  regionReport (zone: string) {
      this.router.navigate(['reports', 'regionreport'], {queryParams: {
            zone: zone,
            month: this.month,
            year: this.year
          }});
  }

}
