import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-task-dialog',
    template: `<h1 mat-dialog-title style="display:flex;justify-content:center;font-size:28px;">
        <b>{{data.message}}</b></h1>
    <div mat-dialog-content>
        <mat-form-field>
            <input matInput [min]="minDate" [(ngModel)]="date" [matDatepicker]="picker"
                   placeholder="Choose a date" (click)="picker.open()">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error>Due Date is Required</mat-error>
        </mat-form-field>
    </div>
    <div mat-dialog-actions style="display:flex;justify-content:center">
        <button class="btn btn-success" (click)="onOk()">Ok</button>
        <pre> </pre>
        <button class="btn btn-rose" (click)="onClose()">Cancel</button>
    </div>`
})

export class TaskDatePickerDialogComponent implements OnInit {
    date = '';
    minDate = new Date();

    constructor(public dialogRef: MatDialogRef<TaskDatePickerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onOk() {
        this.dialogRef.close({
            message: this.date,
            ok: 'yes'
        });
    }

    onClose(): void {
        this.dialogRef.close({
            message: this.date,
            ok: 'no'
        });
    }
}
