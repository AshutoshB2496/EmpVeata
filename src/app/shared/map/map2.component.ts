import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {LocationService} from './locationService.service';
import {ActivatedRoute} from '@angular/router';
import {EmployeeServices} from '../employee-services.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-map2',
    templateUrl: './map2.component.html',
    styles: [``]
})

export class Map2Component implements OnInit {

    employeeId = '';
    token;

    constructor(private locationService: LocationService,
                private empService: EmployeeServices,
                private route: ActivatedRoute, private sanitizer: DomSanitizer,
                private loaderService: Ng4LoadingSpinnerService) {
    }

    getFrameUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('http://mapview.dashboard.simplifii.xyz/#/list-view?view=map&startFromAttendance=0&id='
            + this.employeeId + '&token=' + this.token + '&url=http://sfa.demoplatform.simplifii.com/api/v1/');
    }

    ngOnInit() {
        this.token = localStorage.getItem('my_login_token');
        this.route.queryParams
            .subscribe(params => {
                if (params['id'] === undefined) {
                    this.employeeId = JSON.parse(localStorage.getItem('user')).id;
                } else {
                    this.employeeId = params['id'];
                }
            });
    }
}
