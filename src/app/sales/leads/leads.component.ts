import {Component, OnInit} from '@angular/core';
import {LeadService} from '../lead.service';
import swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {LeadDialogComponent} from './leaddialog.component';

declare const $: any;

declare interface Info {
    name: string,
    address: string,
    town: string,
    district: string,
    province: string,
    pincode: string,
    note: string,
    image: string
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

    public lead_01 = [];
    public lead_02 = [];
    public lead_03 = [];
    public lead_04 = [];
    history = [];
    informations = [];
    type='';

    constructor(private service: LeadService, private dialog: MatDialog) {

    }

    openDialogForComment(uniqueid): void {
        const dialogRef = this.dialog.open(LeadDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Post Comment', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Comment').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);


                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForApprove(uniqueid): void {
        const dialogRef = this.dialog.open(LeadDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Approve', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Approve').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);

                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForReject(uniqueid): void {
        const dialogRef = this.dialog.open(LeadDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Reject', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Reject').subscribe(res => {
                    this.refresh();
                    swal({
                        type: 'success',
                        text: res,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-success'
                    }).catch(swal.noop);

                }, err => {
                    swal({
                        type: 'error',
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    updateInformation(info) {
        this.informations.length = 0
        this.informations.push(info);
    }

    updateHistory(id) {
        this.service.getUpdates(id).subscribe(value => {
            this.history = value;
        })
    }

    refreshLead1() {
        this.service.getStage1Leads().subscribe(value => {
            this.lead_01 = value;
        });
    }

    refreshLead2() {
        this.service.getStage2Leads().subscribe(value => {
            this.lead_02 = value;
        });
    }

    refreshLead3() {
        this.service.getApprovedLeads().subscribe(value => {
            this.lead_03 = value;
        });
    }

    refreshLead4() {
        this.service.getRejectedLeads().subscribe(value => {
            this.lead_04 = value;
        });
    }

    refresh() {
        this.refreshLead1();
        this.refreshLead2();
        this.refreshLead3();
        this.refreshLead4();
    }

    ngOnInit() {
        this.refresh();
    }

}

