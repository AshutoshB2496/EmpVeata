import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeServices} from '../../../shared/employee-services.service';
import {Employee} from '../../../Models/employee.model';

@Component({
    encapsulation: ViewEncapsulation.None,
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input('items') items: any;
  constructor(private http: HttpClient,
              private router: Router,
              private empService: EmployeeServices,
              private route: ActivatedRoute) { }
  ngOnInit() {
  }
    showLocations(id: string, name: string) {
      this.empService.sendEmployeeName.next(name);
        this.router.navigate(['locations'], {relativeTo: this.route, queryParams: {
            id: id
            }});
    }
    showDetails(name: string) {
        this.empService.sendEmployeeName.next(name);
        this.router.navigate(['details'], {relativeTo: this.route});
    }
    showAttendance(id: string, name: string) {
        this.empService.sendEmployeeName.next(name);
        this.router.navigate(['attendance', id], {relativeTo: this.route});
    }
    showCalendar(id: string, name: string) {
        this.empService.sendEmployeeName.next(name);
        this.router.navigate(['calendar'], {relativeTo: this.route, queryParams: {
            id: id
        }});
    }
    makeRoot(emp: Employee) {
      if (emp.hasOwnProperty('reportees')) {
          this.empService.rootTree.next(emp);
      }
    }

}
