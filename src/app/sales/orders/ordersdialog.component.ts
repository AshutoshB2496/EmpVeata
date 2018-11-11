import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2';

@Component({
    selector: 'app-order-dialog',
    template: `<h1 mat-dialog-title style="display:flex;justify-content:center;font-size:28px;">
    <b>{{data.message}}</b></h1>
    <div mat-dialog-content>
      <mat-form-field *ngIf="data.visible">
        <input matInput [(ngModel)]="comment" placeholder="Type your comment here...">
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="display:flex;justify-content:center">
      <button class="btn btn-success" (click)="onOk()">Ok</button><pre> </pre>
      <button class="btn btn-rose" (click)="onClose()">Cancel</button>
    </div>`
})

export class OrdersDialogComponent implements OnInit {
    comment = '';
    constructor(public dialogRef: MatDialogRef<OrdersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { }
    // [(ngModel)]="data.animal"
    // [mat-dialog-close]="data.animal"
    onOk() {
        this.dialogRef.close({
            message: this.comment,
            ok: 'yes'
        });
    }
    onClose(): void {
        this.dialogRef.close({
            message: this.comment,
            ok: 'no'
        });
    }
}
