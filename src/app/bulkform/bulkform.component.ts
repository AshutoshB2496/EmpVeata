import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BulkformService} from './bulkform.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
    selector: 'app-bulkform-cmp',
    templateUrl: 'bulkform.component.html',
    styleUrls: ['bulkform.component.css']
})

export class BulkformComponent implements OnInit {
    file: File;
    fileDetails: FormGroup;
    public fileup: any;
    public uploadData: any = FormData;

    constructor(private fb: FormBuilder, private service: BulkformService) {

    }

    onFileChange(event) {
        console.log(event);
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
            this.fileup = fileList[0];

            this.uploadData = new FormData();
            this.uploadData.append('file', this.file, this.file.name);
            this.uploadData.append('entity', 'Employee');

        }
    }

    onSubmit() {
        this.uploadData.append('action', this.fileDetails.value.action);
        console.log(this.fileDetails.value);
        this.service.uploadBulk(this.uploadData).subscribe(res => {
            swal({
                type: 'success',
                text: res,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
            }).catch(swal.noop);


        }, err => {
            swal({
                type: 'error',
                text: err.error.message,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'
            }).catch(swal.noop);
        });
    }

    ngOnInit() {
        this.fileDetails = this.fb.group({
            action: [null, [Validators.required]],
            image: [null, [Validators.required]]
        })
    }
}
