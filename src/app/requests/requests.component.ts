import { RequestsDialogComponent } from '../team/requests/requestsdialog.component';
import { MatDialog } from '@angular/material';
import { RequestsService } from '../team/requests.service';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import swal from 'sweetalert2';

declare var $: any;
// style="display: inline-block"
@Component({
    selector: 'app-requests-cmp',
    templateUrl: 'requests.component.html',
    styleUrls: ['requests.component.css']
})

export class RequestsComponent implements OnInit {
    public tableData: TableData;
    public requests_01: any[];
    public requests_02: any[];
    public requests_03: any[];
    public requests_04: any[];
    customername: string;
    items: any[]
    constructor(private service: RequestsService, private dialog: MatDialog) {

    }


    changeItems(name: string, items: any[]) {
        this.customername = name;
        this.items = items;
    }
    openDialogForApprove(uniqueid): void {
        const dialogRef = this.dialog.open(RequestsDialogComponent, {
            width: '500px',
            height: '160px',
            data: { id: uniqueid, message: 'Approve this Request', visible: false }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchApprove(uniqueid).subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        title: 'Task Completed!',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        title: 'Task Incomplete!',
                        text: 'Request cannot be approved',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForReject(uniqueid): void {
        const dialogRef = this.dialog.open(RequestsDialogComponent, {
            width: '500px',
            height: '220px',
            data: { id: uniqueid, message: 'Reject This Request', visible: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Reject').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        title: 'Task Completed!',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        title: 'Task Incomplete!',
                        text: 'Request cannot be rejected',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }
    openDialogForComment(uniqueid): void {
        const dialogRef = this.dialog.open(RequestsDialogComponent, {
            width: '500px',
            height: '220px',
            data: { id: uniqueid, message: 'Add the Comment', visible: true }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Comment').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        title: 'Task Completed!',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        title: 'Task Incomplete!',
                        text: 'Comment cannot be added',
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }
    refresh() {
        this.service.getSalesReturn().subscribe(value => {
            this.requests_01 = value
        });
        this.service.getExcessDiscount().subscribe(value => {
            this.requests_02 = value
        });
        this.service.getCreditLimit().subscribe(value => {
            this.requests_04 = value
        })
    }
    ngOnInit() {
        this.refresh();
        this.requests_03 = [
            {
                title: `Flooded: One year later, assessing what was lost and
                 what was found when a ravaging rain swept through metro Detroit`, checked: true
            },

            { title: 'Sign contract for \'What are conference organizers afraid of?\'', checked: false },
        ];
    }
}
