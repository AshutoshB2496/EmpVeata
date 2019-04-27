import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {MyProfileService} from './myProfile.service';

declare const $: any;

@Component({
    selector: 'app-myprofile-cmp',
    templateUrl: 'myProfile.component.html',
    styleUrls: ['myProfile.component.css']
})

export class MyProfileComponent implements OnInit {
    geolocationPosition: any;
    user: any = {
        cdata: {}
    };
    employee_code;

    constructor(private fb: FormBuilder, private service: MyProfileService) {

    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        this.employee_code = this.user.cdata.employee_code
    }

    markAttendence() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.geolocationPosition = position;
                    console.log(this.geolocationPosition.coords.latitude)
                    this.service.markAttendence(this.employee_code, this.geolocationPosition.coords.latitude, this.geolocationPosition.coords.longitude).subscribe(value => {
                        console.log(value)
                        swal({
                            type: 'success',
                            text: 'You have successfully marked your attendance',
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-success'
                        }).catch(swal.noop);
                    }, err => {
                        swal({
                            type: 'error',
                            text: 'You have already marked your attendance once',
                            buttonsStyling: false,
                            confirmButtonClass: 'btn btn-rose'
                        }).catch(swal.noop);
                    });
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
        }
    }
}
