import {OrdersDialogComponent} from './ordersdialog.component';
import {MatDialog} from '@angular/material';
import swal from 'sweetalert2';
import {SalesService} from './../sales.service';
import {Component, OnInit} from '@angular/core';
import {TableData} from '../../md/md-table/md-table.component';

declare var $: any;

declare interface Task {
    title: string;
    checked: boolean;
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['orders.component.css']
})

export class OrdersComponent implements OnInit {

    public tableData: TableData;
    public orders_open: any[];
    public orders_accepted: any[];
    public orders_invoiced: any[];
    public orders_rejected: any[];
    public plants;
    public customers;
    public employees;
    placedids = [
        {value: '0', viewValue: 'Today'},
        {value: '1', viewValue: 'Yesterday'},
        {value: '7', viewValue: 'Last 7 Days'},
        {value: '30', viewValue: 'Last 30 Days'}
    ];
    customername: string;
    duration;
    customer;
    order_id;
    creator;
    depot;
    day: string;
    searchparam: string = '';
    doubleSlider1 = [0, 500000];
    orders: any[];
    paras = new Object();
    switchFlag: boolean[] = [];
    buttonFlag: boolean[] = [];

    constructor(private dialog: MatDialog, private service: SalesService) {

    }

    getDates(n) {
        const d = new Date();
        d.setDate(d.getDate() - n);
        if (d.getMonth() < 9) {
            if (d.getDate() < 10) {
                return this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-0' + d.getDate();
            } else {
                return this.day = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        } else {
            if (d.getDate() < 10) {
                return this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-0' + d.getDate();
            } else {
                return this.day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        }
    }

    changeOrders(name: string, orders: any[]) {
        this.customername = name;
        this.orders = orders;
        this.switchFlag.length = 0;
        for (let i = 0; i < this.orders.length; i++) {
            this.switchFlag.push(false);
        }
        this.buttonFlag.length = 0;
        for (let i = 0; i < this.orders.length; i++) {
            this.buttonFlag.push(false);
        }
    }

    refresh() {
        this.service.getOpenOrders(this.searchparam).subscribe(value => {
            this.orders_open = value
        });
        this.service.getAccptedOrders(this.searchparam).subscribe(value => {
            this.orders_accepted = value
        });
        this.service.getInvoicedOrders(this.searchparam).subscribe(value => {
            this.orders_invoiced = value
        });
        this.service.getRejectedOrders(this.searchparam).subscribe(value => {
            this.orders_rejected = value
        });
    }

    ngOnInit() {

        this.refresh();
        this.service.getCustomers().subscribe(value => {
            this.customers = value;
        });
        this.service.getEmployees().subscribe(value => {
            this.employees = value;
        });
        this.service.getPlant().subscribe(value => {
            this.plants = value;
        });

        $('#showFilter').click(function () {
            $('#filterContainer').slideToggle();
        });
    }

    showBulk() {
        $('#bulkAction_drop').show();
    }

    openDialogForApprove(uniqueid): void {
        const dialogRef = this.dialog.open(OrdersDialogComponent, {
            width: '500px',
            height: '160px',
            data: {id: uniqueid, message: 'Approve this Order', visible: false}
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
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForReject(uniqueid): void {
        const dialogRef = this.dialog.open(OrdersDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Reject This Order', visible: true}
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
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    openDialogForDispatch(uniqueid): void {
        const dialogRef = this.dialog.open(OrdersDialogComponent, {
            width: '500px',
            height: '220px',
            data: {id: uniqueid, message: 'Dispatch the Order', visible: true}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result.ok === 'yes') {
                this.service.PatchAction(uniqueid, result.message, 'Dispatch').subscribe(res => {
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
                        text: err.error.msg,
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-rose'
                    }).catch(swal.noop);
                })
            }
        });
    }

    availSwitch(i: number, button: string) {
        this.switchFlag[i] = true;
        if (button === 't') {
            this.buttonFlag[i] = true;
        } else {
            this.buttonFlag[i] = false;
        }
    }

    changeCreatedAt() {
        if (this.duration === '0') {
            this.paras['&lessthanequalto___created_at'] = this.getDates(0) + ' 23:59:59';
            this.paras['&greaterthanequalto___created_at'] = this.getDates(0) + ' 00:00:00';
        } else if (this.duration === '1') {
            this.paras['&lessthanequalto___created_at'] = this.getDates(1) + ' 23:59:59';
            this.paras['&greaterthanequalto___created_at'] = this.getDates(1) + ' 00:00:00';
        } else {
            this.paras['&lessthanequalto___created_at'] = this.getDates(0) + ' 23:59:59';
            this.paras['&greaterthanequalto___created_at'] = this.getDates(this.duration) + ' 00:00:00';
        }
    }

    changeCustomer() {
        this.paras['&equalto___customer_sap_id'] = this.customer;
    }

    changeCreator() {
        this.paras['&creator'] = this.creator;
    }

    changeDepot() {
        this.paras['&equalto___plant'] = this.depot;
    }

    changeOrderId() {
        this.paras['&unique_codes'] = this.order_id;
    }

    applyFilter() {
        this.searchparam = '';
        for (const key in this.paras) {
            if (this.paras.hasOwnProperty(key)) {
                const value = this.paras[key];
                console.log(key, '=', value);
                const param = key + '=' + value
                this.searchparam = this.searchparam.concat(param);
            }
        }
        console.log(this.searchparam);
        this.refresh();
    }

    reset() {
        this.searchparam = '';
        this.doubleSlider1 = [0, 500000];
        this.depot = '';
        this.duration = '';
        this.customer = '';
        this.creator = '';
        this.order_id = '';
        this.paras = new Object();
        this.refresh();
    }

    changeAmount() {
        this.paras['&lessthanequalto___total'] = this.doubleSlider1[1];
        this.paras['&greaterthanequalto___total'] = this.doubleSlider1[0];
    }
}
