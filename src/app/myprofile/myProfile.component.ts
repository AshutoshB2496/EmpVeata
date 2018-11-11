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

    constructor(private fb: FormBuilder, private service: MyProfileService) {

    }

    ngOnInit() {

    }
}
